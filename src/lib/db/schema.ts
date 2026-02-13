import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// BetterAuth User Table
export const user = sqliteTable("user", {
  // IMPORTANT: id must be text, not integer
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull().default(false),
  name: text("name"),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// BetterAuth Session Table
export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  // IMPORTANT: userId must be text to match user.id type
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// BetterAuth Account Table
export const account = sqliteTable("account", {
  // IMPORTANT: id must be text, not integer
  id: text("id").primaryKey(),
  // IMPORTANT: userId must be text to match user.id type
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  password: text("password"),
  // IMPORTANT: these fields must be nullable
  type: text("type"),
  provider: text("provider"),
  providerAccountId: text("providerAccountId"),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at", { mode: "timestamp" }),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// BetterAuth Verification Table
export const verification = sqliteTable("verification", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Project-specific tables for Segre.vip

export const page = sqliteTable("page", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  username: text("username").notNull().unique(), // For username.segre.vip URLs
  slug: text("slug").notNull(), // URL slug
  type: text("type").notNull(), // 'bio' or 'offer'
  title: text("title").notNull(),
  description: text("description"),
  theme: text("theme").notNull().default("luxury"), // 'luxury' or 'neon'
  isPublished: integer("isPublished", { mode: "boolean" }).notNull().default(false),
  coverImage: text("coverImage"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const block = sqliteTable("block", {
  id: text("id").primaryKey(),
  pageId: text("pageId")
    .notNull()
    .references(() => page.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'header', 'link', 'cta', 'social', 'embed', 'text'
  content: text("content").notNull(), // JSON string for flexible content
  style: text("style").notNull(), // JSON string for custom styles
  order: integer("order").notNull(),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  trackingLabel: text("trackingLabel"),
  targetUrl: text("targetUrl"),
  openInNewTab: integer("openInNewTab", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

export const event = sqliteTable("event", {
  id: text("id").primaryKey(),
  pageId: text("pageId")
    .notNull()
    .references(() => page.id, { onDelete: "cascade" }),
  blockId: text("blockId").references(() => block.id, { onDelete: "set null" }),
  eventType: text("eventType").notNull(), // 'view', 'click', 'submit'
  referrer: text("referrer"),
  utm: text("utm"), // JSON string
  device: text("device"), // JSON string
  userAgent: text("userAgent"),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});
