const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({string:'salut'});
});
app.listen(port, ()=> {
  console.log('Le serveur tourne sur le port : '+port)
});

