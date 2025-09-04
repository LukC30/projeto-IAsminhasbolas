const axios = require("axios");

const askGemini = async (prompt) =>{
    const apiKey = process.env.GEMINI_API_KEY
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
    const body = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }]
    };

    try{
        const { data } = await axios.post(url, body)
        if(data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]){
            return data.candidates[0].content.parts[0].text;
        } 
        throw new Error('Formato de resposta invalido.')
    } catch (e) {
        console.error("Erro detalhado do Axios:", error.response?.data || error.message);
        throw new Error('Falha na comunicação com a API do Gemini.');
    }
};

module.exports = {askGemini};