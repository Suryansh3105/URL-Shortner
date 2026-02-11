import { shortUrlTable } from "../models/shortUrl.model.js";
import generateQRCode from "../utils/generateQR.js";
import db from "../config/db.js";
import {eq} from 'drizzle-orm'

export async function shortUrlToQR(shortUrl,shortCode){
    const qrCode = await generateQRCode(shortUrl);
    const [result] = await db
    .update(shortUrlTable)
    .set({qrCode:qrCode})
    .where(eq(shortUrlTable.shortCode,shortCode))
    .returning({qrCode:shortUrlTable.qrCode});

    if(!result){
        throw new Error(`failed to create qr`);
    }

    return result;
}

