// using nanoid for generating short code
import { nanoid } from 'nanoid'
export function generateShortUrl (){
    return nanoid(7);
}

