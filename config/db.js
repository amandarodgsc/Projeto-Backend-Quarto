const mongoose = require('mongoose');
const { mongodb_url } = require('../.env');

mongoose.connect(dbURI, {
  tlsAllowInvalidCertificates: true // Temporário até resolver problemas de SSL
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB', err);
});
