import express from 'express'
const router = express.Router()

import { createTab1, getTab1, deletetab1, updatetab1 } from '../controllers/tab1'


router.post('/tab1', createTab1)
router.get('/tab1', getTab1)
router.delete('/tab1/:id', deletetab1)
router.patch('/tab1/:id', updatetab1)


export default router

