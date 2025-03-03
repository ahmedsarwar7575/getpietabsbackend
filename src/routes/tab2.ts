import express from 'express';
const router = express.Router();

import { createTab2, getTab2, deleteTab2, updateTab2 } from '../controllers/tab2';
import upload from '../middlewares/multer'; // Adjust the path based on your structure

router.post('/tab2', upload.single('image'), createTab2);
router.get('/tab2', getTab2);
router.delete('/tab2/:id', deleteTab2);
router.patch('/tab2/:id', upload.single('image'), updateTab2);

export default router;
