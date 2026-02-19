import db from "../config/db";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
export async function registerUser(firstName,username,lastName,email,password){
        
    const [existingUser] = await db
        .select({id: usersTable.id})
        .from(usersTable)
        .where(eq(usersTable.email,email));

    if (existingUser) {
        throw new Error("Email already registered");
        }

    const hashedPassword = await bcrypt.hash(password, 12);
        
    const [newUser] = await db.insert(usersTable).values({
      email,
      firstName,
      username,
      lastName,
      password: hashedPassword,
    }).returning({id:usersTable.id});

    return newUser;
}

