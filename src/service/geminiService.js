const NodeCache = require("node-cache");
const { askGemini } = require("../client/geminiClient");
const Joi = require("joi");
const logger = require("../config/logging");

const promptSchema = Joi.string().trim().min(10).max(1000).required().messages({
    'string.base': `"prompt" deve ser um texto.`,
    'string.empty': `"prompt" não pode ser vazio.`,
    'string.min': `"prompt" deve ter no mínimo {#limit} caracteres.`,
    'string.max': `"prompt" deve ter no máximo {#limit} caracteres.`,
    'any.required': `"prompt" é um campo obrigatório.`
})

const geminiCache = new NodeCache({stdTTL : 7200})

const makeGeminiService = () => {
     const ask = async(prompt) => {
        const cacheKey = prompt.trim().toLowerCase();

        const cachedResponse = geminiCache.get(cacheKey);
        if(cachedResponse){
            logger.info({cacheKey}, "Cache Hit")
            return { response : cachedResponse, fromCache: true}
        }
        logger.info({cacheKey}, "Cache Miss, chamando a api do GEMINI")
        let realResponse = await askGemini(prompt)
        geminiCache.set(cacheKey, realResponse)
        return {response : realResponse, fromCache : false}
     };
     return{
        ask,
    };
}

module.exports = makeGeminiService;
