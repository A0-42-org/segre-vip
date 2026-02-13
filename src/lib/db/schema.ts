import { pgTable, text, integer, timestamp, serial, boolean } from "drizzle-orm/pg-core";

// BetterAuth User Table
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

// BetterAuth Session Table
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

// BetterAuth Account Table
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  password: text("password"),
  type: text("type"),
  provider: text("provider"),
  providerAccountId: text("providerAccountId"),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: timestamp("expires_at", { mode: "date" }),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

// BetterAuth Verification Table
export const verification = pgTable("verification", {
  id: serial("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

// Project-specific tables for Segre.vip

export const page = pgTable("page", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  username: text("username").notNull().unique(),
  slug: text("slug").notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  theme: text("theme").notNull().default("luxury"),
  isPublished: boolean("isPublished").notNull().default(false),
  coverImage: text("coverImage"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const block = pgTable("block", {
  id: text("id").primaryKey(),
  pageId: text("pageId")
    .notNull()
    .references(() => page.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  content: text("content").notNull(),
  style: text("style").notNull(),
  order: integer("order").notNull(),
  visible: boolean("visible").notNull().default(true),
  trackingLabel: text("trackingLabel"),
  targetUrl: text("targetUrl"),
  openInNewTab: boolean("openInNewTab").notNull().default(true),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export const event = pgTable("event", {
  id: text("id").primaryKey(),
  pageId: text("pageId")
    .notNull()
    .references(() => page.id, { onDelete: "cascade" }),
  blockId: text("blockId").references(() => block.id, { onDelete: "set null" }),
  eventType: text("eventType").notNull(),
  referrer: text("referrer"),
  utm: text("utm"),
  device: text("device"),
  userAgent: text("userAgent"),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull().defaultNow(),
});
