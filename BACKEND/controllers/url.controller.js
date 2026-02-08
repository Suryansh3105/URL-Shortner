import { createShortUrl, getOriginalUrl } from "../services/urlService.js";

function shortenUrl(req,res){
    const {originalUrl} =req.body;
    const shortCode=createShortUrl(originalUrl);
    const baseUrl=process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const shortUrl=`${baseUrl}/${shortCode}`;
    res.status(201).json({shortUrl:shortUrl});
}

function redirectToOriginalUrl(req,res){
    const {shortID} = req.params;
    const originalUrl = getOriginalUrl(shortID);
    if(!originalUrl){
       return res.status(404).json({error:`url not found`})
    }
    res.status(301).redirect(originalUrl);
}

export default {
    shortenUrl,
    redirectToOriginalUrl
}