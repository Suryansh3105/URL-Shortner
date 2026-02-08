function vaildateAlias(req,req,next){
    const {originalUrl,customAlias} =req.body;
    if(!customAlias){
        return next();
    }
    const length=customAlias.length;
    if(
        typeof customAlias !== 'string' ||
        customAlias.includes(" ") ||
        customAlias.length < 5 ||
        customAlias.length > 20 ||
        !/^[a-zA-Z0-9_-]+$/.test(customAlias)
    ){
        return res.status(400).json({error:`invalid custom alias`})
    }
    next();
}

export default vaildateAlias;