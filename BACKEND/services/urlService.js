import db from '../config/db.js'
import { shortUrlTable } from "../models/shortUrl.model.js";
import { generateShortUrl } from "../utils/generateShortUrl.js";
import {eq} from 'drizzle-orm'

const store = new Map();
const MAX_RETRIES=5;

export async function createShortCode(originalUrl,customAlias){
    const normalizedAlias = customAlias?.toLowerCase();
    if(normalizedAlias){
        const [existingAlias] = await db
        .select()
        .from(shortUrlTable)
        .where(eq(shortUrlTable.shortCode,normalizedAlias));

        if(existingAlias){
            throw new Error(`Alias already exist`)
        }// service used to return data, null or throw error

        const [result]= await db
        .insert(shortUrlTable)
        .values({shortCode:normalizedAlias,longUrl:originalUrl})
        .returning({shortCode:shortUrlTable.shortCode,});

        return result.shortCode;
    }

    for(let i=0;i<MAX_RETRIES;i++){
        const shortCode=generateShortUrl();
        const [existingCode] = await db.
        select().
        from(shortUrlTable).
        where(eq(shortUrlTable.shortCode,shortCode));

        if(!existingCode){
            const [result] = await db.
            insert(shortUrlTable).
            values({shortCode,longUrl:originalUrl}).
            returning({shortCode:shortUrlTable.shortCode});

            return result.shortCode;
        }
    }
    throw new Error(`could not generate unique short URL`);
}

export async function getOriginalUrl(shortCode){
    const [result] = await db
    .select()
    .from(shortUrlTable)
    .where(eq(shortUrlTable.shortCode,shortCode));
    if(!result){
        return null;
    }
    return result.longUrl;
}