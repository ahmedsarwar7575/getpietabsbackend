import express from 'express';
const router = express.Router();

import { createTab3, getTab3, deleteTab3, updateTab3, getTab3ById } from '../controllers/tab3';
import upload from '../middlewares/multer'; // Adjust the path based on your structure

router.post('/tab3', upload.fields([
    { name: "frontBusinessPicture", maxCount: 1 },
    { name: "businessLogo", maxCount: 1 },
]), createTab3);
router.get('/tab3', getTab3);
router.get('/tab3/:id', getTab3ById);
router.delete('/tab3/:id', deleteTab3);
router.patch('/tab3/:id', upload.fields([
    { name: "frontBusinessPicture", maxCount: 1 },
    { name: "businessLogo", maxCount: 1 },
]), updateTab3);

export default router;
