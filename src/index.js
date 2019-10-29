const express = require('express');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('./DB');


const router = require('./routes/router');
app.use(express.json())
app.use(router)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Vous êtes bien connecté sur le port: ${port}`);
});
