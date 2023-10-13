const express = require('express');
const db= require('./db')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const login =require('./routes/userRoutes')
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

// var cors(Option){

// }

app.use('/api',login)
app.listen(port, () =>
  console.log(`Server Started localhost:${port}`)
);
