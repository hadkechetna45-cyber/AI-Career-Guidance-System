import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, isAuthenticated, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { insertQuizResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Replit Auth (must be before all other routes)
  await setupAuth(app);
  registerAuthRoutes(app);

  // Save quiz result for logged-in user
  app.post("/api/quiz-results", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const body = insertQuizResultSchema.parse({ ...req.body, userId });
      const result = await storage.saveQuizResult(body);
      res.json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: err.errors });
      }
      console.error("Error saving quiz result:", err);
      res.status(500).json({ message: "Failed to save result" });
    }
  });

  // Get quiz history for logged-in user
  app.get("/api/quiz-results", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const results = await storage.getQuizResults(userId);
      res.json(results);
    } catch (err) {
      console.error("Error fetching quiz results:", err);
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });

  return httpServer;
}
