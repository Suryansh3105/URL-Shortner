import { generateShortUrl } from "../utils/generateShortUrl.js";

const store = new Map();
const MAX_RETRIES=5;

export function createShortUrl(originalUrl){
    for(let i=0;i<MAX_RETRIES;i++){
        const shortCode=generateShortUrl();
        if(!store.has(shortCode)){
            store.set(shortCode,originalUrl);
            return shortCode;
        }
    }
    throw new Error(`could not generate unique short URL`);
}