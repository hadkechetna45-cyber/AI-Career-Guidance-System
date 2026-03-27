import { sql, relations } from "drizzle-orm";
import { index, integer, jsonb, pgTable, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ── Auth tables (required for Replit Auth) ──────────────────────────────────
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  // Extended profile fields
  fullName: varchar("full_name"),
  mobile: varchar("mobile"),
  age: integer("age"),
  gender: varchar("gender"),
  city: varchar("city"),
  profileCompleted: boolean("profile_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(7, "Enter a valid mobile number").max(15),
  age: z.number().min(10, "Must be at least 10").max(100, "Must be under 100"),
  gender: z.enum(["Male", "Female", "Non-binary", "Prefer not to say"]),
  city: z.string().min(1, "City is required"),
});
export type UpdateProfile = z.infer<typeof updateProfileSchema>;

// ── Quiz results ─────────────────────────────────────────────────────────────
export const quizResults = pgTable("quiz_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  answers: jsonb("answers").notNull(),
  topCareer: text("top_career"),
  matches: jsonb("matches"),
  takenAt: timestamp("taken_at").defaultNow(),
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({ id: true, takenAt: true });
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;

// ── Relations ─────────────────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  quizResults: many(quizResults),
}));

export const quizResultsRelations = relations(quizResults, ({ one }) => ({
  user: one(users, { fields: [quizResults.userId], references: [users.id] }),
}));
