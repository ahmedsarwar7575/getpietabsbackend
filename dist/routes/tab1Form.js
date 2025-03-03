import express from 'express';
const router = express.Router();
import { createTab1Form, getAllTab1Forms, getTab1FormById, updateTab1Form, deleteTab1Form } from '../controllers/tab1Form';
router.post('/tab1Form', createTab1Form);
router.get('/tab1Form', getAllTab1Forms);
router.get('/tab1Form/:id', getTab1FormById);
router.delete('/tab1Form/:id', deleteTab1Form);
router.patch('/tab1Form/:id', updateTab1Form);
export default router;
