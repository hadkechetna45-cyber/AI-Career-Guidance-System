import { users, quizResults, type User, type UpsertUser, type QuizResult, type InsertQuizResult } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  saveQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(userId: string): Promise<QuizResult[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: { ...userData, updatedAt: new Date() },
      })
      .returning();
    return user;
  }

  async saveQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const [row] = await db.insert(quizResults).values(result).returning();
    return row;
  }

  async getQuizResults(userId: string): Promise<QuizResult[]> {
    return db
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId))
      .orderBy(desc(quizResults.takenAt));
  }
}

export const storage = new DatabaseStorage();
