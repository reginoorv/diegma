import { db } from "./index";
import { 
  projectCategories, 
  projects, 
  services, 
  stats
} from "@shared/schema";

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Check if data already exists to avoid duplicates
    const existingCategories = await db.query.projectCategories.findMany();
    if (existingCategories.length === 0) {
      // Seed project categories
      console.log("Seeding project categories...");
      const categoryData = [
        { name: "Interior & Eksterior", slug: "interior-eksterior" },
        { name: "Komersial", slug: "komersial" },
        { name: "Furniture", slug: "furniture" },
        { name: "Residensial", slug: "residensial" }
      ];
      
      await db.insert(projectCategories).values(categoryData);
      console.log("✅ Project categories seeded successfully");
    } else {
      console.log("Project categories already exist, skipping seed");
    }

    // Get categories to reference in projects
    const categories = await db.query.projectCategories.findMany();
    const categoryMap = categories.reduce((acc, category) => {
      acc[category.slug] = category.id;
      return acc;
    }, {} as Record<string, number>);

    // Check if projects already exist
    const existingProjects = await db.query.projects.findMany();
    if (existingProjects.length === 0) {
      // Seed projects
      console.log("Seeding projects...");
      const projectData = [
        {
          title: "Residence Modern Jakarta",
          slug: "residence-modern-jakarta",
          description: "Rumah modern ini dirancang dengan konsep open space yang memaksimalkan cahaya alami dan ventilasi. Desain minimalis dengan sentuhan material kayu menciptakan kesan hangat dan elegan.",
          shortDescription: "Rumah modern dengan konsep open space di kawasan elit Jakarta Selatan.",
          categoryId: categoryMap["interior-eksterior"],
          location: "Jakarta Selatan",
          imageUrl: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
          galleryImages: ["https://images.unsplash.com/photo-1616137678391-330a9d0ae71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80"],
          isFeatured: 1
        },
        {
          title: "Apartemen Urban BSD",
          slug: "apartemen-urban-bsd",
          description: "Apartemen modern dengan layout efisien yang memaksimalkan ruang terbatas. Kami menggunakan furnitur multifungsi dan palet warna netral untuk menciptakan kesan luas dan nyaman.",
          shortDescription: "Apartemen modern di area BSD City dengan desain fungsional dan estetik.",
          categoryId: categoryMap["interior-eksterior"],
          location: "BSD City, Tangerang",
          imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
          galleryImages: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"],
          isFeatured: 1
        },
        {
          title: "Kantor Startup di Bandung",
          slug: "kantor-startup-bandung",
          description: "Ruang kerja kreatif untuk startup teknologi yang memadukan konsep industrial dan modern. Kami menciptakan area kolaborasi terbuka serta ruang privat untuk keseimbangan produktivitas.",
          shortDescription: "Desain kantor startup dengan konsep industrial modern yang mendorong kreativitas dan kolaborasi.",
          categoryId: categoryMap["komersial"],
          location: "Bandung",
          imageUrl: "https://images.unsplash.com/photo-1497366754035-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
          galleryImages: ["https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"],
          isFeatured: 1
        },
        {
          title: "Set Meja Makan Eksklusif",
          slug: "set-meja-makan-eksklusif",
          description: "Set meja makan custom dari kayu jati solid dengan finishing premium. Desain meja dan kursi yang ergonomis untuk kenyamanan maksimal saat bersantap.",
          shortDescription: "Furniture meja makan premium dengan material kayu jati berkualitas tinggi.",
          categoryId: categoryMap["furniture"],
          location: "Jakarta",
          imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
          galleryImages: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1585128993280-9456c19c159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"],
          isFeatured: 1
        },
        {
          title: "Villa Pantai Bali",
          slug: "villa-pantai-bali",
          description: "Villa pantai yang menggabungkan arsitektur tradisional Bali dengan desain kontemporer. Material alami dan view panorama laut menciptakan pengalaman menginap yang luar biasa.",
          shortDescription: "Villa mewah di tepi pantai Bali dengan perpaduan desain tradisional dan modern.",
          categoryId: categoryMap["residensial"],
          location: "Bali",
          imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
          galleryImages: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"],
          isFeatured: 0
        },
        {
          title: "Restoran Minimalis Menteng",
          slug: "restoran-minimalis-menteng",
          description: "Desain interior restoran dengan konsep minimalis yang elegan. Pencahayaan yang tepat dan layout yang optimal untuk kenyamanan pengunjung dan efisiensi operasional.",
          shortDescription: "Restoran dengan desain interior minimalis yang menciptakan suasana nyaman dan elegan.",
          categoryId: categoryMap["komersial"],
          location: "Menteng, Jakarta",
          imageUrl: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
          galleryImages: ["https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80", "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"],
          isFeatured: 0
        }
      ];
      
      await db.insert(projects).values(projectData);
      console.log("✅ Projects seeded successfully");
    } else {
      console.log("Projects already exist, skipping seed");
    }

    // Check if services already exist
    const existingServices = await db.query.services.findMany();
    if (existingServices.length === 0) {
      // Seed services
      console.log("Seeding services...");
      const serviceData = [
        {
          title: "Desain Interior dan Eksterior",
          slug: "desain-interior-eksterior",
          description: "Transformasi total untuk ruang dalam dan luar bangunan Anda dengan konsep desain yang estetik, fungsional, dan mengesankan.",
          shortDescription: "Desain komprehensif untuk ruang indoor dan outdoor",
          icon: "fas fa-home",
          imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
        },
        {
          title: "Konstruksi",
          slug: "konstruksi",
          description: "Implementasi proyek konstruksi dengan ketelitian tinggi, penggunaan material berkualitas, dan pengawasan profesional untuk hasil yang sempurna.",
          shortDescription: "Eksekusi proyek konstruksi dengan standar kualitas tinggi",
          icon: "fas fa-ruler-combined",
          imageUrl: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
        },
        {
          title: "Furniture",
          slug: "furniture",
          description: "Desain dan produksi furniture kustom sesuai kebutuhan ruang dan gaya Anda, dengan bahan pilihan dan kualitas craftsmanship berkualitas tinggi.",
          shortDescription: "Furniture kustom yang menyesuaikan dengan kebutuhan dan gaya Anda",
          icon: "fas fa-chair",
          imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
        }
      ];
      
      await db.insert(services).values(serviceData);
      console.log("✅ Services seeded successfully");
    } else {
      console.log("Services already exist, skipping seed");
    }

    // Check if stats already exist
    const existingStats = await db.query.stats.findMany();
    if (existingStats.length === 0) {
      // Seed stats
      console.log("Seeding stats...");
      const statsData = {
        completedProjects: 250,
        turnkeyProjects: 57,
        yearsOfExperience: 9,
        residentialDesigns: 115
      };
      
      await db.insert(stats).values(statsData);
      console.log("✅ Stats seeded successfully");
    } else {
      console.log("Stats already exist, skipping seed");
    }

    console.log("✅ Database seeding completed successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seed();
