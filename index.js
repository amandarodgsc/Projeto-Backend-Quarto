// index.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Use process.env para acessar variáveis de ambiente
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Configurações do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
