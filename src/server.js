require('dotenv').config();
const app = require('./app'); 
const logger = require('./config/logging');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Servidor rodando na porta ${port}`);
});