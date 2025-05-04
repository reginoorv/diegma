import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

// Import data statis dari shared/data
import { 
  projectCategories, 
  projects, 
  services, 
  stats, 
  getProjectBySlug, 
  getServiceBySlug, 
  getProjectsByCategory, 
  getFeaturedProjects 
} from "../shared/data";

// Schema validasi untuk form kontak
const contactSchema = z.object({
  name: z.string().min(2, "Nama harus memiliki setidaknya 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().optional(),
  message: z.string().min(10, "Pesan harus memiliki setidaknya 10 karakter")
});

type ContactInput = z.infer<typeof contactSchema>;

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiPrefix = '/api';

  // Get projects with optional category filter
  app.get(`${apiPrefix}/projects`, async (req, res) => {
    try {
      const { category, limit } = req.query;
      let result = [...projects]; // Clone array untuk menghindari mutasi

      // Filter berdasarkan kategori jika disediakan
      if (category && category !== 'semua') {
        result = getProjectsByCategory(category as string);
      }

      // Urutkan berdasarkan featured dan tanggal pembuatan (desc)
      result.sort((a, b) => {
        // Prioritaskan proyek featured
        if (a.isFeatured !== b.isFeatured) {
          return b.isFeatured - a.isFeatured;
        }
        // Jika status featured sama, urutkan berdasarkan tanggal
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      // Batasi hasil jika parameter limit disediakan
      if (limit) {
        const limitNum = parseInt(limit as string);
        result = result.slice(0, limitNum);
      }

      return res.json(result);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  // Get project by slug
  app.get(`${apiPrefix}/projects/:slug`, async (req, res) => {
    try {
      const { slug } = req.params;
      
      const project = getProjectBySlug(slug);
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Dapatkan related projects (projects lain dari kategori yang sama)
      const relatedProjects = projects
        .filter(p => p.categoryId === project.categoryId && p.id !== project.id)
        .slice(0, 3)
        .map(p => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          category: p.category,
          location: p.location,
          imageUrl: p.imageUrl
        }));

      return res.json({
        project,
        relatedProjects
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      return res.status(500).json({ error: 'Failed to fetch project' });
    }
  });

  // Get project categories
  app.get(`${apiPrefix}/project-categories`, async (_req, res) => {
    try {
      // Urutkan kategori berdasarkan nama
      const sortedCategories = [...projectCategories].sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      return res.json(sortedCategories);
    } catch (error) {
      console.error('Error fetching project categories:', error);
      return res.status(500).json({ error: 'Failed to fetch project categories' });
    }
  });

  // Get all services
  app.get(`${apiPrefix}/services`, async (_req, res) => {
    try {
      // Urutkan layanan berdasarkan ID
      const sortedServices = [...services].sort((a, b) => a.id - b.id);
      
      return res.json(sortedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  // Get service by slug
  app.get(`${apiPrefix}/services/:slug`, async (req, res) => {
    try {
      const { slug } = req.params;
      
      const service = getServiceBySlug(slug);
      
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      return res.json(service);
    } catch (error) {
      console.error('Error fetching service:', error);
      return res.status(500).json({ error: 'Failed to fetch service' });
    }
  });

  // Get stats
  app.get(`${apiPrefix}/stats`, async (_req, res) => {
    try {
      return res.json({
        completedProjects: stats.completedProjects,
        turnkeyProjects: stats.turnkeyProjects,
        yearsOfExperience: stats.yearsExperience,
        residentialDesigns: stats.residentialDesigns
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  // Submit contact form
  app.post(`${apiPrefix}/contacts`, async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // Untuk landing page tanpa database, kita hanya perlu mengembalikan sukses
      // Dalam aplikasi sebenarnya, email ini bisa dikirim ke alamat email admin
      console.log('Pesan kontak diterima:', validatedData);

      return res.status(201).json({
        message: 'Pesan berhasil dikirim. Kami akan segera menghubungi Anda.',
        contact: { 
          id: Date.now(), // ID dummy
          ...validatedData,
          created_at: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ error: 'Failed to submit contact form' });
    }
  });

  // Healthcheck endpoint
  app.get(`${apiPrefix}/healthcheck`, (_req, res) => {
    return res.json({
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}