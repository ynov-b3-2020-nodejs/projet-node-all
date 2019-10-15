const express = require('express');
const app = express();
const router = require('./routes/router');
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(morgan());
app.use(express.json());
app.use(router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Vous êtes bien connecté sur le port: ${port}`)
});

