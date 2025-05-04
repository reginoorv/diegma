import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { eq, and } from "drizzle-orm";
import { db } from "@db";
import { 
  projectCategories, 
  projects, 
  services, 
  contacts, 
  stats,
  contactInsertSchema
} from "@shared/schema";
import { z } from "zod";
import { supabase, checkSupabaseConnection } from "../shared/supabase";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  const apiPrefix = '/api';

  // Get projects with optional category filter
  app.get(`${apiPrefix}/projects`, async (req, res) => {
    try {
      const { category, limit } = req.query;
      let query = db.query.projects.findMany({
        with: {
          category: true,
        },
        orderBy: (projects, { desc }) => [desc(projects.createdAt)],
      });

      if (category && category !== 'semua') {
        const projectCategory = await db.query.projectCategories.findFirst({
          where: eq(projectCategories.slug, category as string),
        });

        if (projectCategory) {
          query = db.query.projects.findMany({
            where: eq(projects.categoryId, projectCategory.id),
            with: {
              category: true,
            },
            orderBy: (projects, { desc }) => [desc(projects.createdAt)],
          });
        }
      }

      if (limit) {
        const limitNum = parseInt(limit as string);
        query = db.query.projects.findMany({
          with: {
            category: true,
          },
          orderBy: (projects, { desc }) => [desc(projects.isFeatured), desc(projects.createdAt)],
          limit: limitNum,
        });
      }

      const result = await query;
      
      // Map the result to include category name
      const mappedProjects = result.map(project => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        shortDescription: project.shortDescription,
        category: project.category.name,
        location: project.location,
        imageUrl: project.imageUrl,
        galleryImages: project.galleryImages,
        isFeatured: project.isFeatured === 1,
        createdAt: project.createdAt,
      }));

      return res.json(mappedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  // Get project by slug
  app.get(`${apiPrefix}/projects/:slug`, async (req, res) => {
    try {
      const { slug } = req.params;
      const project = await db.query.projects.findFirst({
        where: eq(projects.slug, slug),
        with: {
          category: true,
        },
      });

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Map to include category name
      const mappedProject = {
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        shortDescription: project.shortDescription,
        category: project.category.name,
        categoryId: project.categoryId,
        location: project.location,
        imageUrl: project.imageUrl,
        galleryImages: project.galleryImages,
        isFeatured: project.isFeatured === 1,
        createdAt: project.createdAt,
      };

      return res.json(mappedProject);
    } catch (error) {
      console.error('Error fetching project:', error);
      return res.status(500).json({ error: 'Failed to fetch project' });
    }
  });

  // Get project categories
  app.get(`${apiPrefix}/project-categories`, async (req, res) => {
    try {
      const categories = await db.query.projectCategories.findMany({
        orderBy: (projectCategories, { asc }) => [asc(projectCategories.name)],
      });
      return res.json(categories);
    } catch (error) {
      console.error('Error fetching project categories:', error);
      return res.status(500).json({ error: 'Failed to fetch project categories' });
    }
  });

  // Get services
  app.get(`${apiPrefix}/services`, async (req, res) => {
    try {
      const allServices = await db.query.services.findMany({
        orderBy: (services, { asc }) => [asc(services.id)],
      });
      return res.json(allServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  // Get service by slug
  app.get(`${apiPrefix}/services/:slug`, async (req, res) => {
    try {
      const { slug } = req.params;
      const service = await db.query.services.findFirst({
        where: eq(services.slug, slug),
      });

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
  app.get(`${apiPrefix}/stats`, async (req, res) => {
    try {
      const allStats = await db.query.stats.findFirst({
        orderBy: (stats, { desc }) => [desc(stats.updatedAt)],
      });

      if (!allStats) {
        return res.status(404).json({ error: 'Stats not found' });
      }

      return res.json({
        completedProjects: allStats.completedProjects,
        turnkeyProjects: allStats.turnkeyProjects,
        yearsOfExperience: allStats.yearsOfExperience,
        residentialDesigns: allStats.residentialDesigns,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  // Submit contact form
  app.post(`${apiPrefix}/contacts`, async (req, res) => {
    try {
      const validatedData = contactInsertSchema.parse(req.body);
      
      const [newContact] = await db.insert(contacts).values(validatedData).returning();
      
      return res.status(201).json({
        message: 'Contact form submitted successfully',
        contact: newContact,
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ error: 'Failed to submit contact form' });
    }
  });

  // Endpoint test untuk Supabase (akan digunakan ketika DATABASE_URL diubah ke Supabase)
  app.get(`${apiPrefix}/test-db-connection`, async (_req, res) => {
    try {
      // Query sederhana untuk memastikan koneksi bekerja
      const allServices = await db.query.services.findMany({ limit: 1 });
      
      return res.json({
        success: true,
        message: 'Koneksi database berhasil!',
        databaseType: process.env.DATABASE_URL?.includes('supabase.co') ? 'Supabase' : 'Neon',
        data: allServices
      });
    } catch (error) {
      console.error('Database connection error:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Koneksi database gagal!', 
        error: error instanceof Error ? error.message : String(error),
        databaseUrl: process.env.DATABASE_URL ? 'Diatur' : 'Tidak diatur'
      });
    }
  });
  
  // Endpoint untuk Supabase
  app.get(`${apiPrefix}/test-supabase`, async (_req, res) => {
    try {
      const result = await checkSupabaseConnection();
      
      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: 'Koneksi Supabase gagal!',
          error: result.error
        });
      }
      
      return res.json({
        success: true,
        message: 'Koneksi Supabase berhasil!',
        data: result.data
      });
    } catch (error) {
      console.error('Supabase connection error:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Koneksi Supabase gagal!', 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Setup Supabase Direct
  app.get(`${apiPrefix}/setup-supabase-direct`, async (_req, res) => {
    try {
      // Import module untuk setup Supabase direct
      const setupModule = await import('../scripts/setup-supabase-direct');
      
      // Panggil fungsi createTables
      await setupModule.default();
      
      return res.json({
        success: true,
        message: 'Setup Supabase Direct berhasil!'
      });
    } catch (error) {
      console.error('Error setup Supabase Direct:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Setup Supabase Direct gagal!', 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Setup Supabase
  app.get(`${apiPrefix}/setup-supabase`, async (_req, res) => {
    try {
      // Import module untuk mengeksekusi commands
      const { execa } = await import('execa');
      
      try {
        // Jalankan script setup dengan execa
        const { stdout, stderr } = await execa('tsx', ['scripts/setup-supabase.ts'], {
          env: process.env,
          timeout: 60000, // 60 detik timeout
        });
        
        console.log('Script output:', stdout);
        
        return res.json({
          success: true,
          message: 'Setup Supabase berhasil!',
          output: stdout
        });
      } catch (execError: any) {
        console.error('Script execution error:', execError);
        
        return res.status(500).json({
          success: false,
          message: 'Setup Supabase gagal!',
          output: execError.stdout || '',
          error: execError.stderr || execError.message
        });
      }
    } catch (error) {
      console.error('Error setup Supabase:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Setup Supabase gagal!', 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
