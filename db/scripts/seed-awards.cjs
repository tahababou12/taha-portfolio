const { createClient } = require('@supabase/supabase-js');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_KEY;

// Initialize local database
const dbPath = path.join(__dirname, '..', 'local.db');
const localDb = new Database(dbPath);

// Enable foreign keys
localDb.pragma('foreign_keys = ON');

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Awards data with placeholder images
const awardsData = [
  {
    id: uuidv4(),
    title: "Best Game Award",
    organization: "HackPrinceton Spring 2025",
    description: "Recognized for creating an innovative game that stood out among competitors for its creativity, technical implementation, and user experience.",
    image: "awards/hackprinceton-main.jpg", // Placeholder, will be replaced
    year: "2025",
    full_description: "At HackPrinceton Spring 2025, my team and I developed an innovative multiplayer game that combined AR elements with strategic gameplay. The game stood out for its creative use of spatial computing and intuitive controls.\n\nThe judging panel, which included industry veterans from major gaming companies, recognized our work with the Best Game Award, highlighting the technical implementation and seamless user experience. This award was particularly meaningful as it was selected from over 50 game projects submitted during the hackathon.\n\nThe experience reinforced my passion for building immersive experiences and pushing the boundaries of interactive technology.",
    link: "https://hackprinceton.com",
    gallery: [
      { id: uuidv4(), image_url: "awards/hackprinceton-team.jpg", display_order: 1 },
      { id: uuidv4(), image_url: "awards/hackprinceton-demo.jpg", display_order: 2 }
    ]
  },
  {
    id: uuidv4(),
    title: "Most Interactive Design Award",
    organization: "Harvard University MakeHarvard Hardware Hackathon",
    description: "Awarded for developing a hardware solution with exceptional user interaction capabilities, demonstrating innovation in human-computer interface design.",
    image: "awards/makeharvard-main.jpg",
    year: "2024",
    full_description: "The MakeHarvard Hardware Hackathon at Harvard University brings together some of the most talented hardware engineers and designers from across the country. Our team created a novel interactive haptic feedback system that allows users to feel digital information through a specialized wearable device.\n\nOur project stood out for its intuitive design and the natural way users could interact with digital information through touch. The judges were particularly impressed by how we combined machine learning with hardware sensors to create a responsive and adaptable user experience.\n\nWinning the Most Interactive Design Award validated our approach to creating more intuitive and accessible human-computer interfaces.",
    link: "https://makeharvard.io",
    gallery: [
      { id: uuidv4(), image_url: "awards/makeharvard-prototype.jpg", display_order: 1 },
      { id: uuidv4(), image_url: "awards/makeharvard-presentation.jpg", display_order: 2 }
    ]
  },
  {
    id: uuidv4(),
    title: "ECE Shark Tank Winner",
    organization: "Boston University",
    description: "Top 20% recognition for pitch, innovation, and project excellence for the PharmaML project, which applied machine learning to pharmaceutical research.",
    image: "awards/bushark-main.jpg",
    year: "2023",
    full_description: "The Boston University ECE Shark Tank competition is a prestigious event where engineering students pitch innovative technical projects to a panel of industry experts and investors. Our PharmaML project applied cutting-edge machine learning techniques to pharmaceutical research, specifically focusing on drug discovery optimization.\n\nThe project used a novel approach to predict drug efficacy and potential side effects based on molecular structure, significantly reducing the time and cost typically associated with early-stage pharmaceutical research.\n\nBeing recognized in the top 20% of all participating teams validated both the technical implementation and the business potential of our solution. The judges particularly noted the project's potential impact on accelerating pharmaceutical innovation.",
    link: "https://www.bu.edu/eng/academics/departments-and-divisions/electrical-and-computer-engineering/",
    gallery: [
      { id: uuidv4(), image_url: "awards/pharmaml-dashboard.jpg", display_order: 1 },
      { id: uuidv4(), image_url: "awards/pharmaml-team.jpg", display_order: 2 }
    ]
  },
  {
    id: uuidv4(),
    title: "MSSP Honors Scholarship Recipient",
    organization: "Boston University",
    description: "Merit-based scholarship awarded for academic excellence during Master's in Statistical Practice program, recognizing outstanding academic achievement.",
    image: "awards/mssp-main.jpg",
    year: "2023",
    full_description: "The MSSP Honors Scholarship at Boston University is a prestigious merit-based award given to only a select few students in the Master's in Statistical Practice program. This scholarship recognizes not only past academic excellence but also potential for future contributions to the field of statistical science.\n\nThe award was based on my academic performance, research interests, and demonstrated ability to apply statistical methods to solve complex real-world problems. Receiving this scholarship was particularly meaningful as it validated my interdisciplinary approach of combining robust statistical methodologies with computer science and machine learning techniques.\n\nThe scholarship has enabled me to focus more intensely on my studies and research, particularly in areas related to statistical modeling for AI systems and retrieval-augmented generation techniques.",
    link: "https://www.bu.edu/stat/academics/mssp/",
    gallery: [
      { id: uuidv4(), image_url: "awards/mssp-certificate.jpg", display_order: 1 }
    ]
  },
  {
    id: uuidv4(),
    title: "Featured in BU GRS Student Success Stories",
    organization: "Boston University Graduate School of Arts & Sciences",
    description: "Recognized by Boston University Graduate School of Arts & Sciences for contributions to applied statistics, innovation, and student leadership.",
    image: "awards/bugrs-main.jpg",
    year: "2023",
    full_description: "Being featured in the Boston University Graduate School of Arts & Sciences Student Success Stories was a significant honor that highlighted my academic journey and professional achievements. The feature recognized my work at the intersection of statistics, data science, and artificial intelligence.\n\nThe profile focused on my applied research in statistical methods for AI systems and how I've leveraged my educational background to create innovative solutions for real-world problems. It also highlighted my leadership roles within student organizations and collaborative projects that have made an impact both on campus and in industry.\n\nThis recognition from BU GRS reinforced the value of pursuing an interdisciplinary approach and using statistical expertise to drive innovation in emerging technological fields. It also provided an opportunity to share my experiences with prospective and current students interested in similar academic and career paths.",
    link: "https://www.bu.edu/cas/student-success-stories-taha-ababou/",
    gallery: [
      { id: uuidv4(), image_url: "awards/bugrs-profile.jpg", display_order: 1 }
    ]
  },
  {
    id: uuidv4(),
    title: "Forbes 30 Under 30 Boston Nominee",
    organization: "Forbes",
    description: "Recognized for contributions to technological innovation through the LOCAL App, which leveraged AI to enhance community safety and engagement.",
    image: "awards/forbes-main.jpg",
    year: "2023",
    full_description: "Being nominated for Forbes 30 Under 30 Boston was a significant recognition of my work with the LOCAL App, a platform that uses artificial intelligence to help communities identify and address safety concerns in real-time.\n\nThe nomination highlighted how our team leveraged machine learning algorithms to analyze various data sources and predict potential safety issues, allowing communities to take preventative measures rather than reactive ones. The LOCAL App stands out for its innovative approach to using technology for social good, particularly in urban environments.\n\nThis recognition from Forbes validated our mission of using advanced technology to create safer, more connected communities, and opened doors to connect with other innovators in the Boston tech ecosystem.",
    link: "https://www.forbes.com/30-under-30/",
    gallery: [
      { id: uuidv4(), image_url: "awards/local-app-demo.jpg", display_order: 1 },
      { id: uuidv4(), image_url: "awards/forbes-nomination.jpg", display_order: 2 }
    ]
  },
  {
    id: uuidv4(),
    title: "Speaker at Rio Web Summit 2023",
    organization: "Web Summit",
    description: "Selected to represent LOCAL App and present innovations to an international audience, showcasing advancements in AI-powered community safety technology.",
    image: "awards/rio-main.jpg",
    year: "2023",
    full_description: "Being invited as a speaker to the prestigious Rio Web Summit 2023 was a significant honor and opportunity to showcase our work with the LOCAL App on an international stage. The Web Summit is one of the largest technology conferences globally, bringing together founders, investors, and thought leaders from around the world.\n\nMy presentation focused on how we're using artificial intelligence and community-driven data to transform urban safety. I discussed our technical approach to predictive safety modeling as well as the ethical considerations of developing such technology.\n\nThe experience provided valuable exposure for our startup and allowed us to connect with potential partners and investors from Latin America and beyond. The positive reception to our presentation validated the global relevance of our approach to community safety through technology.",
    link: "https://websummit.com/",
    gallery: [
      { id: uuidv4(), image_url: "awards/rio-presentation.jpg", display_order: 1 },
      { id: uuidv4(), image_url: "awards/rio-networking.jpg", display_order: 2 }
    ]
  },
  {
    id: uuidv4(),
    title: "GitHub Open-Source Recognition",
    organization: "LangChain & Open-Source AI Community",
    description: "The brag-langchain repository achieved 2.7K+ GitHub stars, recognized by LangChain and the open-source AI community for its contributions to retrieval-augmented generation techniques.",
    image: "awards/github-main.jpg",
    year: "2023",
    full_description: "Creating and maintaining the brag-langchain repository has been one of my most impactful open-source contributions. The project, which focuses on building efficient retrieval-augmented generation (RAG) systems, has resonated strongly with the AI developer community, accumulating over 2,700 GitHub stars.\n\nThe recognition from LangChain and the broader open-source AI community validates the importance of creating accessible frameworks for implementing advanced AI techniques. Our repository provides developers with practical implementations of RAG architectures that can be deployed at both personal and enterprise scales.\n\nWhat makes this recognition particularly meaningful is seeing how developers from around the world have built upon our framework, extended it for their specific use cases, and contributed improvements back to the project. This collaborative ecosystem is exactly what I hoped to foster when releasing the project as open source.",
    link: "https://github.com/bRAGAI/bRAG-langchain",
    gallery: [
      { id: uuidv4(), image_url: "awards/brag-architecture.jpg", display_order: 1 },
      { id: uuidv4(), image_url: "awards/langchain-recognition.jpg", display_order: 2 }
    ]
  }
];

async function seedSupabase() {
  console.log('Seeding Supabase database with awards data...');

  // Clear existing data
  await supabase.from('award_gallery').delete().not('id', 'is', null);
  await supabase.from('awards').delete().not('id', 'is', null);

  for (const award of awardsData) {
    // Extract gallery data and make a copy of the award without it
    const { gallery, ...awardData } = award;
    
    // Insert the award
    const { data: awardResult, error: awardError } = await supabase
      .from('awards')
      .insert(awardData)
      .select('id')
      .single();

    if (awardError) {
      console.error(`Failed to insert award ${award.title}:`, awardError);
      continue;
    }

    console.log(`Inserted award: ${award.title}`);

    // Insert gallery images
    if (gallery && gallery.length > 0) {
      const galleryItems = gallery.map(item => ({
        ...item,
        award_id: awardResult.id
      }));

      const { error: galleryError } = await supabase
        .from('award_gallery')
        .insert(galleryItems);

      if (galleryError) {
        console.error(`Failed to insert gallery for award ${award.title}:`, galleryError);
      } else {
        console.log(`Inserted ${galleryItems.length} gallery images for award: ${award.title}`);
      }
    }
  }

  console.log('Supabase seeding completed!');
}

function seedLocalDb() {
  console.log('Seeding local database with awards data...');

  // Clear existing data
  localDb.prepare('DELETE FROM award_gallery').run();
  localDb.prepare('DELETE FROM awards').run();

  // Begin transaction
  const transaction = localDb.transaction(() => {
    const insertAward = localDb.prepare(
      'INSERT INTO awards (id, title, organization, description, image, year, full_description, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );

    const insertGalleryItem = localDb.prepare(
      'INSERT INTO award_gallery (id, award_id, image_url, display_order) VALUES (?, ?, ?, ?)'
    );

    for (const award of awardsData) {
      // Insert the award
      insertAward.run(
        award.id,
        award.title,
        award.organization,
        award.description,
        award.image,
        award.year,
        award.full_description,
        award.link
      );

      console.log(`Inserted award: ${award.title}`);

      // Insert gallery images
      if (award.gallery && award.gallery.length > 0) {
        for (const item of award.gallery) {
          insertGalleryItem.run(
            item.id,
            award.id,
            item.image_url,
            item.display_order
          );
        }
        console.log(`Inserted ${award.gallery.length} gallery images for award: ${award.title}`);
      }
    }
  });

  // Execute transaction
  transaction();

  console.log('Local database seeding completed!');
}

// Function to run both seed operations
async function seedAll() {
  try {
    // Seed local database
    seedLocalDb();
    
    // Seed Supabase if available
    if (supabaseUrl && supabaseServiceKey) {
      await seedSupabase();
    } else {
      console.log('Skipping Supabase seeding - environment variables not set');
    }
    
    console.log('All seeding operations completed!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    // Close local database
    localDb.close();
  }
}

// Run the seed function
seedAll(); 