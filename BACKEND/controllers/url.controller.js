import { createShortCode, getOriginalUrl } from "../services/urlService.js";

function shortenUrl(req,res){
    const {originalUrl,customAlias} =req.body;
    const shortCode=createShortCode(originalUrl,customAlias);
    const baseUrl=process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const shortUrl=`${baseUrl}/${shortCode}`;
    res.status(201).json({shortUrl:shortUrl});
}

function redirectToOriginalUrl(req,res){
    const {shortID} = req.params;
    console.log(shortID)
    const originalUrl = getOriginalUrl(shortID);
    console.log(originalUrl)
    if(!originalUrl){
       return res.status(404).json({error:`url not found`})
    }
    res.status(301).redirect(originalUrl);
}

export default {
    shortenUrl,
    redirectToOriginalUrl
}