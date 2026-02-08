import express from 'express'
import validateUrl from '../middleware/validateUrl.js';
import controllers from '../controllers/url.controller.js';

const router = express.Router();

router.post('/shorten',validateUrl,controllers.shortenUrl);


export default router;
