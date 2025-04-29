/**
 * Local SQLite database adapter that mimics the Supabase interface.
 * This allows us to switch between Supabase and local database seamlessly.
 */
const Database = require('better-sqlite3');
const path = require('path');

// Database instance
let db;

try {
  const dbPath = path.join(__dirname, '..', '..', 'db', 'local.db');
  db = new Database(dbPath, { readonly: false });
  db.pragma('foreign_keys = ON');
} catch (error) {
  console.error('Error connecting to local SQLite database:', error.message);
  console.error('Make sure you have run the db setup scripts in db/scripts/');
}

/**
 * A query builder class that mimics Supabase's interface
 */
class QueryBuilder {
  constructor(table) {
    this.table = table;
    this.conditions = [];
    this.orderByColumn = null;
    this.orderByDirection = 'asc';
    this.limitValue = null;
    this.selectColumns = '*';
    this.singleResult = false;
  }

  /**
   * Add an equality condition
   */
  eq(column, value) {
    this.conditions.push({ column, operator: '=', value });
    return this;
  }

  /**
   * Select specific columns
   */
  select(columns) {
    if (columns === '*' || Array.isArray(columns)) {
      this.selectColumns = columns;
    } else {
      this.selectColumns = columns.split(',').map(c => c.trim());
    }
    return this;
  }

  /**
   * Order results
   */
  order(column, { ascending = true } = {}) {
    this.orderByColumn = column;
    this.orderByDirection = ascending ? 'asc' : 'desc';
    return this;
  }

  /**
   * Limit results
   */
  limit(value) {
    this.limitValue = value;
    return this;
  }

  /**
   * Get a single result
   */
  single() {
    this.singleResult = true;
    return this;
  }

  /**
   * Execute the query
   */
  async then(resolve, reject) {
    try {
      const result = this._execute();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  }

  /**
   * Build and execute the SQL query
   */
  _execute() {
    let sql = `SELECT ${this.selectColumns === '*' ? '*' : this.selectColumns.join(', ')} FROM ${this.table}`;
    const params = [];

    // Add WHERE conditions
    if (this.conditions.length > 0) {
      const whereConditions = this.conditions.map((condition) => {
        params.push(condition.value);
        return `${condition.column} ${condition.operator} ?`;
      });
      sql += ` WHERE ${whereConditions.join(' AND ')}`;
    }

    // Add ORDER BY
    if (this.orderByColumn) {
      sql += ` ORDER BY ${this.orderByColumn} ${this.orderByDirection}`;
    }

    // Add LIMIT
    if (this.limitValue) {
      sql += ` LIMIT ${this.limitValue}`;
    }

    try {
      const statement = db.prepare(sql);
      let data;

      if (this.singleResult) {
        data = statement.get(...params) || null;
      } else {
        data = statement.all(...params);
      }

      return { data, error: null };
    } catch (error) {
      console.error('SQL Error:', error.message);
      console.error('Query:', sql);
      console.error('Params:', params);
      return { data: null, error: { message: error.message } };
    }
  }

  /**
   * Insert data
   */
  async insert(data, { returning = 'minimal' } = {}) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return { data: [], error: null };
    }

    try {
      const items = Array.isArray(data) ? data : [data];
      const results = [];

      // Begin transaction
      const insertMany = db.transaction((items) => {
        for (const item of items) {
          const columns = Object.keys(item);
          const placeholders = columns.map(() => '?').join(', ');
          const values = columns.map(col => item[col]);

          const sql = `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${placeholders})`;
          const result = db.prepare(sql).run(values);
          
          if (returning !== 'minimal') {
            results.push({ ...item, id: item.id || result.lastInsertRowid });
          } else {
            results.push({ id: item.id || result.lastInsertRowid });
          }
        }
      });

      // Execute transaction
      insertMany(items);

      return { data: results, error: null };
    } catch (error) {
      console.error('Insert Error:', error.message);
      return { data: null, error: { message: error.message } };
    }
  }

  /**
   * Update data
   */
  async update(data, { returning = 'minimal' } = {}) {
    if (!data) {
      return { data: null, error: { message: 'No data provided for update' } };
    }

    try {
      const columns = Object.keys(data).filter(k => k !== 'id');
      const setClause = columns.map(col => `${col} = ?`).join(', ');
      const values = [...columns.map(col => data[col])];
      
      let sql = `UPDATE ${this.table} SET ${setClause}`;
      
      // Add WHERE conditions
      if (this.conditions.length > 0) {
        const whereConditions = this.conditions.map((condition) => {
          values.push(condition.value);
          return `${condition.column} ${condition.operator} ?`;
        });
        sql += ` WHERE ${whereConditions.join(' AND ')}`;
      }

      const result = db.prepare(sql).run(values);

      if (returning !== 'minimal') {
        // Get the updated row
        const whereClause = this.conditions.length > 0 
          ? `WHERE ${this.conditions.map(c => `${c.column} = ?`).join(' AND ')}`
          : '';
        const selectSql = `SELECT * FROM ${this.table} ${whereClause} LIMIT 1`;
        const updatedRow = db.prepare(selectSql).get(...this.conditions.map(c => c.value));
        return { data: updatedRow, error: null };
      }

      return { 
        data: { count: result.changes }, 
        error: null 
      };
    } catch (error) {
      console.error('Update Error:', error.message);
      return { data: null, error: { message: error.message } };
    }
  }

  /**
   * Upsert data
   */
  async upsert(data, { onConflict = 'id', returning = 'minimal' } = {}) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return { data: [], error: null };
    }

    try {
      const items = Array.isArray(data) ? data : [data];
      const results = [];

      // Begin transaction
      const upsertMany = db.transaction((items) => {
        for (const item of items) {
          const columns = Object.keys(item);
          const placeholders = columns.map(() => '?').join(', ');
          const values = columns.map(col => item[col]);
          
          const updateColumns = columns.filter(c => c !== onConflict);
          const updateClause = updateColumns
            .map(col => `${col} = excluded.${col}`)
            .join(', ');

          const sql = `
            INSERT INTO ${this.table} (${columns.join(', ')})
            VALUES (${placeholders})
            ON CONFLICT(${onConflict}) DO UPDATE SET
            ${updateClause}
          `;
          
          const result = db.prepare(sql).run(values);
          
          if (returning !== 'minimal') {
            results.push({ ...item });
          } else {
            results.push({ id: item.id });
          }
        }
      });

      // Execute transaction
      upsertMany(items);

      return { data: results, error: null };
    } catch (error) {
      console.error('Upsert Error:', error.message);
      return { data: null, error: { message: error.message } };
    }
  }

  /**
   * Delete data
   */
  async delete() {
    try {
      let sql = `DELETE FROM ${this.table}`;
      const params = [];
      
      // Add WHERE conditions
      if (this.conditions.length > 0) {
        const whereConditions = this.conditions.map((condition) => {
          params.push(condition.value);
          return `${condition.column} ${condition.operator} ?`;
        });
        sql += ` WHERE ${whereConditions.join(' AND ')}`;
      }

      const result = db.prepare(sql).run(params);

      return { 
        data: { count: result.changes }, 
        error: null 
      };
    } catch (error) {
      console.error('Delete Error:', error.message);
      return { data: null, error: { message: error.message } };
    }
  }
}

/**
 * Local database client that mimics Supabase's interface
 */
const localDb = {
  from(table) {
    return new QueryBuilder(table);
  },
  
  // Support for additional Supabase methods can be added here
};

module.exports = localDb; 