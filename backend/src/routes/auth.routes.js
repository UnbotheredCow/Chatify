import express from 'express';
import { signup } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/signup",signup)

router.get("/login", (req, res) => {
    res.end("Login endpoint");
})

router.get("/logout", (req, res) => {
    res.end("Logout endpoint");
})

export default router;