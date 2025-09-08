const express = require("express");
const makeGeminiService = require("../service/geminiService");
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
const geminiService = makeGeminiService()

router.post('/ask', authMiddleware, async(req, res, next)=>{
    try {
        const { prompt } = req.body
        const result = await geminiService.ask(prompt)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router
