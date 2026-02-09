import { pgTable, timestamp, text, varchar } from "drizzle-orm/pg-core";

export const shortUrlTable = pgTable("short_urls",{
    shortCode: varchar("short_code",{length:20}).primaryKey(),
    longUrl:text("long_url").notNull(),
    createdAt: timestamp("created_at",{ withTimezone: true}).notNull().defaultNow(),
})