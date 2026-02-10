import { createShortCode, getOriginalUrl } from "../services/urlService.js";

async function shortenUrl(req,res){
    const {originalUrl,customAlias} =req.body;
    const shortCode= await createShortCode(originalUrl,customAlias);
    const baseUrl=process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const shortUrl=`${baseUrl}/${shortCode}`;
    res.status(201).json({shortUrl:shortUrl});
}

async function redirectToOriginalUrl(req,res){
    try{const {shortID} = req.params;
    const originalUrl = await getOriginalUrl(shortID);
    if(!originalUrl){
       return res.status(404).json({error:`url not found`})
    }
    res.status(301).redirect(originalUrl);
 }catch(err){
     onsole.error("Redirect error:", err);
     return res.status(500).json({ error: "Server error" });
 }
}
export default {
    shortenUrl,
    redirectToOriginalUrl
}