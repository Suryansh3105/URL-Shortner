import { deleteLink, getLinks, updateLink } from "../services/linkService.js";

async function getAllLinks(req,res){
    try{
    const limit = Math.min(parseInt(req.query.limit) || 10,50);
    const page = Math.max(parseInt(req.query.page) || 1,1);
    const allLinks= await getLinks(limit,page);
    const response = allLinks.map(link => ({
        originalUrl:link.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${link.shortCode}`
    }));
    res
    .status(200)
    .json({
        page,
        limit,
        data:response});
}
catch(err){
    res.status(500).json({error:"failed to fetch links"});
}
}

async function deleteLinkByID(req,res){
    try{ 
    const {shortCode}= req.params;
    const [data] = await deleteLink(shortCode);
    res.status(200).json({message:`the given url is deleted ${data.longUrl}`})
    }catch(err){
        res.status(500).json({error:`failed to delete the url`});
    }
}

async function updateLinkById(req,res){
    try{
        const {shortCode}=req.params;
        const {newlongurl}=req.body;
        const updatedLink = await updateLink(shortCode,newlongurl);
        res.status(200).json({
            message:`the link is updated`,
            updatedLink:updatedLink
        })
    }catch(err){
        res.status(500).json({error:`failed to update link`});
    }
}

export default {
    getAllLinks,
    deleteLinkByID,
    updateLinkById
}