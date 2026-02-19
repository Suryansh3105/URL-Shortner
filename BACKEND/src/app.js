import express from 'express'
import urlRoutes from '../routes/url.routes.js';
import linkRoutes from '../routes/link.routes.js';
import authRouters from '../routes/auth.routes.js';
import controllers from '../controllers/url.controller.js';

const app = express();
app.use(express.json())

app.use('/api/url',urlRoutes);
app.get('/:shortID',controllers.redirectToOriginalUrl);
app.use('/api/links',linkRoutes);
app.use('/auth',authRouters);

app.get('/',(req,res)=>{
    res.end("server working fine");
})

export default app;