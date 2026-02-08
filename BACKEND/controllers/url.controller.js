import { createShortUrl } from "../services/urlService.js";

function shortenUrl(req,res){
    const {originalUrl} =req.body;
    const shortCode=createShortUrl(originalUrl);
    const baseUrl=process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const shortUrl=`${baseUrl}/${shortCode}`;
    res.status(201).json({shortUrl:shortUrl});
}

export default {
    shortenUrl
}