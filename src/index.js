const express = require('express');
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'test'
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Vous êtes bien connecté sur le port: ${port}`)
});

