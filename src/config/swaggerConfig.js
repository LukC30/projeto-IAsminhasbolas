const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { app } = require("../server");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gemini BFF API',
            version: '0.1.0',
            description: 'Uma API que funciona como um BFF para a API do gemini'
        },
    },
    apis: ['./swagger.yaml']
}

const specs = swaggerJSDoc(options)

const setupSwagger = (app) =>{
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
    console.log(`Documentação da API disponivel em: http://localhost:${process.env.PORT || 3000}`)
}

module.exports = setupSwagger