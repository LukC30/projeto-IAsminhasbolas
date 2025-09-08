const express = require("express");
const makeGeminiService = require("../service/geminiService");
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
const geminiService = makeGeminiService()

/**
 * @swagger
 * /ask:
 *   post:
 *     tags:
 *       - Gemini
 *     summary: Envia um prompt para a API do Gemini
 *     description: Recebe um prompt, o envia para a API do Gemini (utilizando cache) e retorna a resposta.
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: O texto da pergunta a ser enviada para o Gemini.
 *                 example: "Qual a distância da Terra até a Lua?"
 *     responses:
 *       '200':
 *         description: Resposta bem-sucedida do Gemini.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
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
