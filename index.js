require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(dbURI, {
  tlsAllowInvalidCertificates: true, // Temporário até resolver problemas de SSL
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB', err);
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
