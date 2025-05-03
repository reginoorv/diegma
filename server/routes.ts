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

  const httpServer = createServer(app);
  return httpServer;
}
