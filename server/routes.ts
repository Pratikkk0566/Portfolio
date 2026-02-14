import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Seed initial data
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "Neon City Explorer",
      description: "A cyberpunk-themed exploration game built with Three.js and React.",
      imageUrl: "https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&q=80",
      projectUrl: "https://demo.com",
      repoUrl: "https://github.com",
      tags: ["React", "Three.js", "WebGL"],
      isFeatured: true
    });
    
    await storage.createProject({
      title: "Retro Terminal",
      description: "A fully functional terminal emulator for the web using XTerm.js.",
      imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80",
      projectUrl: "https://demo.com",
      repoUrl: "https://github.com",
      tags: ["TypeScript", "XTerm.js", "Node.js"],
      isFeatured: true
    });

    await storage.createProject({
      title: "Pixel Art Maker",
      description: "An online editor for creating 8-bit pixel art and animations.",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
      projectUrl: "https://demo.com",
      repoUrl: "https://github.com",
      tags: ["Canvas API", "React", "Redux"],
      isFeatured: false
    });
  }

  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  return httpServer;
}
