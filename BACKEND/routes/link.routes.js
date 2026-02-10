import express from 'express';
const router = express.Router();
import controller from '../controllers/link.controller.js';

router.get('/',controller.getAllLinks);
router.delete('/:shortCode',controller.deleteLinkByID);
router.patch('/:shortCode',controller.updateLinkById);

export default router;