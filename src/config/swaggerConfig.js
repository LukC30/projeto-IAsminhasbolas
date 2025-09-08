const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gemini Proxy API',
            version: '1.0.0',
            description: 'Uma API que atua como um proxy inteligente para a API do Gemini, com cache e segurança.'
        },
        servers: [
            {
                url: '/api/v1',
                description: 'Servidor Principal'
            }
        ]
    },
    apis: ['./swagger.yaml', './src/routes/*.js']
}

const specs = swaggerJSDoc(options)

const setupSwagger = (app) =>{
    const port = process.env.PORT || 3000;
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
    console.log(`Documentação da API disponível em: http://localhost:${port}/api-docs`);
}

module.exports = setupSwagger