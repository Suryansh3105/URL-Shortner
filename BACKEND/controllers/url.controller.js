import { createShortCode, getOriginalUrl } from "../services/urlService.js";
import { shortUrlToQR } from "../services/qrService.js";
import { dateValidation } from "../middleware/validateDate.js";

async function shortenUrl(req,res){
    const {originalUrl,customAlias,expireAble,expireAt} =req.body;
    const {generateQR}=req.query;

    if (expireAble && isExpired(expireAt)) {
    throw new Error("date should be in future");}
    
    const newExpireAt = new Date(expireAt)

    const shortCode= await createShortCode(originalUrl,customAlias,newExpireAt);
    const baseUrl=process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const shortUrl=`${baseUrl}/${shortCode}`;
    if(generateQR){
        const qrCodeImage = await shortUrlToQR(shortUrl,shortCode);
        return res.send(`<img src="${qrCodeImage.qrCode}" alt="QR Code"/>`);
    }
    res.status(201).json({shortUrl:shortUrl});
}

async function redirectToOriginalUrl(req,res){
    try{
        const {shortID} = req.params;
        const originalUrl = await getOriginalUrl(shortID);
        if(!originalUrl){
            return res.status(404).json({error:`url not found`})
        }
        if(originalUrl.expireAT && Date.now() > new Date(originalUrl.expireAT).getTime()){
        return res.status(410).json({message:`link expired`});
        }

        res.status(301).redirect(originalUrl.longUrl);
    }
    catch(err){
     console.error("Redirect error:", err);
     return res.status(500).json({ error: "Server error" });
 }
}
export default {
    shortenUrl,
    redirectToOriginalUrl
}