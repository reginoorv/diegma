import { pgTable, text, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Project Categories
export const projectCategories = pgTable("project_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  categoryId: integer("category_id").references(() => projectCategories.id).notNull(),
  location: text("location"),
  imageUrl: text("image_url").notNull(),
  galleryImages: text("gallery_images").array(),
  isFeatured: integer("is_featured").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  icon: text("icon").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contact Submissions
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  project: text("project").notNull(),
  phone: text("phone"),
  message: text("message"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Stats
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  completedProjects: integer("completed_projects").notNull(),
  turnkeyProjects: integer("turnkey_projects").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  residentialDesigns: integer("residential_designs").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const projectCategoriesRelations = relations(projectCategories, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  category: one(projectCategories, {
    fields: [projects.categoryId],
    references: [projectCategories.id],
  }),
}));

// Schemas
export const projectCategoryInsertSchema = createInsertSchema(projectCategories);
export type ProjectCategoryInsert = z.infer<typeof projectCategoryInsertSchema>;

export const projectInsertSchema = createInsertSchema(projects);
export type ProjectInsert = z.infer<typeof projectInsertSchema>;

export const serviceInsertSchema = createInsertSchema(services);
export type ServiceInsert = z.infer<typeof serviceInsertSchema>;

export const contactInsertSchema = createInsertSchema(contacts, {
  name: (schema) => schema.min(2, "Nama harus diisi"),
  email: (schema) => schema.email("Email tidak valid"),
  project: (schema) => schema.min(3, "Deskripsi proyek harus diisi"),
});
export type ContactInsert = z.infer<typeof contactInsertSchema>;

export const statInsertSchema = createInsertSchema(stats);
export type StatInsert = z.infer<typeof statInsertSchema>;
