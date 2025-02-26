import express from 'express'
const router = express.Router()
import upload from '../middlewares/multer'; // Adjust the path based on your structure

import { createTab6, getTab6, deleteTab6, updateTab6 } from '../controllers/tab6'


router.post('/tab6', upload.single('image'), createTab6)
router.get('/tab6', getTab6)
router.delete('/tab6/:id', deleteTab6)
router.patch('/tab6/:id', upload.single('image'), updateTab6)


export default router

