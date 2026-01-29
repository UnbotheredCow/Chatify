import express from 'express';

const router = express.Router();

router.get("/signup", (req, res) => {
    res.end("Signup endpoint");
})

router.get("/login", (req, res) => {
    res.end("Login endpoint");
})

router.get("/logout", (req, res) => {
    res.end("Logout endpoint");
})

export default router;