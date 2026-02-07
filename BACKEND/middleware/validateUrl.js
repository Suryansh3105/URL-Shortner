function validateUrl (req,res,next){
    const {originalUrl} = req.body;
    if(!originalUrl){
        res.status(400).json({error:`url missing`});
        }
    try{
        new URL(originalUrl);
        next();
    }
    catch(err){
        res.status(400).json({error:`invalid url`});
    }
    }

export default validateUrl;
