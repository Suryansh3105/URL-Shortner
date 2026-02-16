import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users",{
    id:uuid('id').primaryKey().defaultRandom(),
    firstName:varchar('first_name').notNull(),
    lastName:varchar('last_name'),
    username: varchar('username',{length:50}).notNull().unique(),
    email: varchar('email').unique().notNull(),
    password: varchar('password',{length:255}).notNull(),
    createdAt: timestamp("created_at",{ withTimezone: true}).notNull().defaultNow(),
})