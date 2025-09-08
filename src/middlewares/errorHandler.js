const { StatusCodes } = require("http-status-codes");

const errorHandler = (error, req, res, next) =>{
    console.error("Erro: ", error)
    
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const stringMessage = error.message || "Ocorreu um erro interno no servidor"

    res.status(statusCode).json({error : stringMessage})
}

module.exports = errorHandler