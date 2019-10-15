const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({string:'salut'});
});
app.listen(port, function () {
  console.log(`Vous êtes bien connecté sur le port: ${port}`)
});

