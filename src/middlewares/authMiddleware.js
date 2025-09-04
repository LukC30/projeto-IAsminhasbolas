const { StatusCodes } = require('http-status-codes');

const apiKeysStr = process.env.VALID_API_KEYS || '';
const validApiKeysArray = apiKeysStr.split(',').filter(key => key.trim() !== '');
const validApiKeys = new Set(validApiKeysArray);

if (validApiKeys.size > 0) {
    console.log(`${validApiKeys.size} API Keys carregadas com sucesso.`);
} else {
    console.warn('AVISO: Nenhuma VALID_API_KEYS encontrada no .env. Nenhuma autenticação por chave será possível.');
}

/**
 * Middleware para validar a API Key enviada no header 'X-API-Key'.
 */
const authMiddleware = (req, res, next) => {
    const apiKeyHeaderName = process.env.API_KEY_HEADER || 'X-API-Key';
    const userApiKey = req.get(apiKeyHeaderName);

    if (validApiKeys.size === 0) {
        console.error("Bloqueio por falta de configuração de chaves de API.");
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro de configuração do servidor.' });
    }

    if (!userApiKey || !validApiKeys.has(userApiKey)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Acesso não autorizado. Chave de API inválida ou não fornecida.' });
    }

    next();
};

module.exports = authMiddleware;