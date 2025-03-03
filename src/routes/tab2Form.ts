import express from 'express'
const router = express.Router()

import { createTab2Form, getAllTab2Forms, getTab2FormById, updateTab2Form, deleteTab2Form } from '../controllers/tab2Form'

router.post('/tab2Form/:action', createTab2Form)
router.get('/tab2Form', getAllTab2Forms)
router.get('/tab2Form/:id', getTab2FormById)
router.delete('/tab2Form/:id', deleteTab2Form)
router.patch('/tab2Form/:id', updateTab2Form)


export default router

