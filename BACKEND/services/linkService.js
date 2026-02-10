import { shortUrlTable } from "../models/shortUrl.model.js";
import db from '../config/db.js';
import {eq} from 'drizzle-orm';

export async function getLinks(limit,page){
    const offset = (page-1)*limit;
    const result = await db
    .select({originalUrl:shortUrlTable.longUrl,shortCode:shortUrlTable.shortCode})
    .from(shortUrlTable)
    .limit(limit)
    .offset(offset);

    return result;
}

export async function deleteLink(shortCode){
    const data = await db
    .delete(shortUrlTable)
    .where(eq(shortUrlTable.shortCode,shortCode))
    .returning();

    return data;
}

export async function updateLink(shortCode,newlongUrl){
    const [updated]= await db
    .update(shortUrlTable)
    .set({longUrl:newlongUrl})
    .where(eq(shortUrlTable.shortCode,shortCode))
    .returning();
    if(!updated){
        throw new Error(`wrong input`);
    }

    return updated;
}