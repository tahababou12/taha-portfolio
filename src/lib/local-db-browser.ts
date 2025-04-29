/**
 * This is a browser-compatible version of the local database adapter.
 * It uses IndexedDB (via Dexie.js) for storing the data in the browser.
 */
import Dexie from 'dexie';

// Define types for our project data
interface ProjectData {
  id: string;
  title: string;
  description?: string;
  category?: string;
  image?: string;
  link?: string;
  created_at: string;
  [key: string]: any;  // Allow for additional properties
}

interface ProjectTechnology {
  id: string;
  project_id: string;
  name: string;
  category?: string;
  [key: string]: any;
}

interface ProjectFeature {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  [key: string]: any;
}

interface ProjectTeamMember {
  id: string;
  project_id: string;
  name: string;
  role?: string;
  [key: string]: any;
}

interface ProjectGallery {
  id: string;
  project_id: string;
  image_url: string;
  display_order?: number;
  [key: string]: any;
}

interface ProjectSection {
  id: string;
  project_id: string;
  title: string;
  content?: string;
  display_order?: number;
  [key: string]: any;
}

// Define the database schema
class ProjectDatabase extends Dexie {
  projects: Dexie.Table<ProjectData, string>;
  project_technologies: Dexie.Table<ProjectTechnology, string>;
  project_features: Dexie.Table<ProjectFeature, string>;
  project_team_members: Dexie.Table<ProjectTeamMember, string>;
  project_gallery: Dexie.Table<ProjectGallery, string>;
  project_sections: Dexie.Table<ProjectSection, string>;

  constructor() {
    super('ProjectDatabase');
    
    // Define tables and indexes
    this.version(1).stores({
      projects: 'id, category, title, created_at',
      project_technologies: 'id, project_id, name, category',
      project_features: 'id, project_id, title',
      project_team_members: 'id, project_id, name, role',
      project_gallery: 'id, project_id, display_order',
      project_sections: 'id, project_id, title, display_order'
    });
  }
}

// Create database instance
const db = new ProjectDatabase();

// Load data from exports folder
async function loadDataFromExports() {
  try {
    const tables = [
      'projects',
      'project_technologies',
      'project_features',
      'project_team_members',
      'project_gallery',
      'project_sections'
    ];
    
    // Check if we already have data
    const projectCount = await db.projects.count();
    if (projectCount > 0) {
      console.log('Database already contains data, skipping import');
      return;
    }
    
    console.log('Loading data from exports...');
    
    // Load data for each table
    for (const table of tables) {
      try {
        // Fetch the JSON file from the exports directory
        const response = await fetch(`/db/exports/${table}.json`);
        if (!response.ok) {
          console.warn(`Failed to load ${table}.json: ${response.status} ${response.statusText}`);
          continue;
        }
        
        const data = await response.json();
        if (data && data.length > 0) {
          // Add data to the table
          await db[table as keyof ProjectDatabase].bulkAdd(data);
          console.log(`Loaded ${data.length} rows into ${table}`);
        }
      } catch (err) {
        console.error(`Error loading ${table}:`, err);
      }
    }
    
    console.log('Data import complete!');
  } catch (err) {
    console.error('Error importing data:', err);
  }
}

// Initialize the database
loadDataFromExports();

// Interface for condition objects
interface Condition {
  column: string;
  operator: string;
  value: unknown;
}

/**
 * Query builder class that mimics Supabase's interface
 */
class QueryBuilder {
  private table: string;
  private conditions: Condition[] = [];
  private orderByColumn: string | null = null;
  private orderByDirection: 'asc' | 'desc' = 'asc';
  private limitValue: number | null = null;
  private singleResultMode: boolean = false;
  private selectColumns: string[] | null = null;
  private countMode: boolean = false;
  
  constructor(table: string) {
    this.table = table;
  }
  
  // Select specific columns
  select(columns: string | string[] | '*') {
    if (columns === '*') {
      this.selectColumns = null;
    } else if (typeof columns === 'string') {
      if (columns === 'count') {
        this.countMode = true;
      } else {
        this.selectColumns = columns.split(',').map(c => c.trim());
      }
    } else {
      this.selectColumns = columns;
    }
    return this;
  }
  
  // Equality filter
  eq(column: string, value: unknown) {
    this.conditions.push({ column, operator: '=', value });
    return this;
  }
  
  // Order by
  order(column: string, { ascending = true } = {}) {
    this.orderByColumn = column;
    this.orderByDirection = ascending ? 'asc' : 'desc';
    return this;
  }
  
  // Limit results
  limit(value: number) {
    this.limitValue = value;
    return this;
  }
  
  // Get a single result
  single() {
    this.singleResultMode = true;
    return this;
  }
  
  // For compatibility with APIs expecting .then()
  then(resolve: (value: any) => void, reject: (reason: any) => void) {
    this.execute().then(resolve).catch(reject);
  }
  
  // Execute the query
  async execute() {
    try {
      let query = db[this.table as keyof ProjectDatabase].toCollection();
      
      // Apply filters
      if (this.conditions.length > 0) {
        query = query.filter(item => {
          return this.conditions.every(condition => {
            if (condition.operator === '=') {
              return item[condition.column] === condition.value;
            }
            return true;
          });
        });
      }
      
      // Apply sorting
      if (this.orderByColumn) {
        query = query.sortBy(this.orderByColumn);
        // Reverse if descending
        let items = await query;
        if (this.orderByDirection === 'desc') {
          items = items.reverse();
        }
        
        // Apply limit
        if (this.limitValue !== null && this.limitValue >= 0) {
          items = items.slice(0, this.limitValue);
        }
        
        if (this.countMode) {
          return { data: { count: items.length }, error: null };
        }
        
        if (this.singleResultMode) {
          return { data: items[0] || null, error: null };
        }
        
        return { data: items, error: null };
      }
      
      // Execute query without sorting
      let items = await query.toArray();
      
      // Apply limit
      if (this.limitValue !== null && this.limitValue >= 0) {
        items = items.slice(0, this.limitValue);
      }
      
      if (this.countMode) {
        return { data: { count: items.length }, error: null };
      }
      
      if (this.singleResultMode) {
        return { data: items[0] || null, error: null };
      }
      
      return { data: items, error: null };
    } catch (error) {
      console.error('Query execution error:', error);
      return { data: null, error: { message: (error as Error).message } };
    }
  }
  
  // Insert data
  async insert(data: Record<string, unknown>, { returning = 'minimal' } = {}) {
    try {
      const items = Array.isArray(data) ? data : [data];
      const results = [];
      
      for (const item of items) {
        // Add to table
        await db[this.table as keyof ProjectDatabase].add(item as any);
        
        // Add to results
        if (returning !== 'minimal') {
          results.push({ ...item });
        } else {
          results.push({ id: item.id });
        }
      }
      
      return { data: results, error: null };
    } catch (error) {
      console.error('Insert error:', error);
      return { data: null, error: { message: (error as Error).message } };
    }
  }
  
  // Update data
  async update(data: Record<string, unknown>, { returning = 'minimal' } = {}) {
    try {
      const updates = [];
      
      // Find items matching conditions
      const items = await db[this.table as keyof ProjectDatabase].toArray();
      const matchingItems = items.filter(item => {
        return this.conditions.every(condition => {
          if (condition.operator === '=') {
            return item[condition.column] === condition.value;
          }
          return true;
        });
      });
      
      // Update matching items
      for (const item of matchingItems) {
        const updatedItem = { ...item, ...data };
        await db[this.table as keyof ProjectDatabase].update(item.id, data as any);
        updates.push(updatedItem);
      }
      
      if (returning !== 'minimal') {
        return { data: updates, error: null };
      }
      
      return { data: { count: updates.length }, error: null };
    } catch (error) {
      console.error('Update error:', error);
      return { data: null, error: { message: (error as Error).message } };
    }
  }
  
  // Delete data
  async delete() {
    try {
      const items = await db[this.table as keyof ProjectDatabase].toArray();
      let deleteCount = 0;
      
      // Find items matching conditions
      const matchingItems = items.filter(item => {
        return this.conditions.every(condition => {
          if (condition.operator === '=') {
            return item[condition.column] === condition.value;
          }
          return true;
        });
      });
      
      // Delete matching items
      for (const item of matchingItems) {
        await db[this.table as keyof ProjectDatabase].delete(item.id);
        deleteCount++;
      }
      
      return { data: { count: deleteCount }, error: null };
    } catch (error) {
      console.error('Delete error:', error);
      return { data: null, error: { message: (error as Error).message } };
    }
  }
}

// Supabase-compatible interface
const localDb = {
  from(table: string) {
    return new QueryBuilder(table);
  }
};

export default localDb; 