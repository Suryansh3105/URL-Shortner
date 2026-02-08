import { generateShortUrl } from "../utils/generateShortUrl.js";

const store = new Map();
const MAX_RETRIES=5;

export function createShortCode(originalUrl,customAlias){
    const normalizedAlias = customAlias?.toLowerCase();
    if(normalizedAlias){
        if(store.has(normalizedAlias)){
            throw new Error(`Alias already exist`)
        }// think about think as res i not avaible in services // service used to return data return null or throw error
        store.set(customAlias,originalUrl);
        return customAlias;
    }

    for(let i=0;i<MAX_RETRIES;i++){
        const shortCode=generateShortUrl();
        if(!store.has(shortCode)){
            store.set(shortCode,originalUrl);
            return shortCode;
        }
    }
    throw new Error(`could not generate unique short URL`);
}

export function getOriginalUrl(shortCode){
    return store.get(shortCode);
}