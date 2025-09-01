import express from 'express' // Se importa express
import { register, login } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

export default router
