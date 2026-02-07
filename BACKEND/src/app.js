import express from 'express'

const app = express();

app.get('/',(req,res)=>{
    res.end("server working fine");
})

export default app;