import express from 'express';
const router = express.Router();
import { createTab1, getTab1, deleteTab1, updateTab1 } from '../controllers/tab1';
import upload from '../middlewares/multer'; // Adjust the path based on your structure
router.post('/tab1', upload.single('image'), createTab1);
router.get('/tab1', getTab1);
router.delete('/tab1/:id', deleteTab1);
router.patch('/tab1/:id', upload.single('image'), updateTab1);
export default router;
