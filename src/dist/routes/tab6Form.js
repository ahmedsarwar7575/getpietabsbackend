import express from 'express';
const router = express.Router();
import { createTab6Form, getAllTab6Forms, getTab6FormById, updateTab6Form, deleteTab6Form } from '../controllers/tab6Form';
router.post('/tab6Form/:id', createTab6Form);
router.get('/tab6Form', getAllTab6Forms);
router.get('/tab6Form/:id', getTab6FormById);
router.delete('/tab6Form/:id', deleteTab6Form);
router.patch('/tab6Form/:id', updateTab6Form);
export default router;
