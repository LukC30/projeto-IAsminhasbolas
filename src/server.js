require('dotenv').config()

const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const { askGemini } = require('./client/geminiClient')
const authMiddleware = require('./middlewares/authMiddleware')


const app = express()
app.use(express.json())

const port = process.env.PORT || 3000
app.get('/', (req, res) =>{
    res.send('HIIIIIIIIIIIIIIIIIII')
})

app.post('/ask', authMiddleware, async (req, res)=>{

    try{
        const { prompt } = req.body;
        if(!prompt){
            return res.status(400).json({ error : 'O Prompt é obrigatorio no corpo da requisicao.'})
        }
        const response = await askGemini(prompt)
        res.json({ response })
    } catch (e){
        console.error(e)
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
    }
})

app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})

module.exports = { app }