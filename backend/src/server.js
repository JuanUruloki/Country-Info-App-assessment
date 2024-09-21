require('dotenv').config();
const express = require('express');
const cors = require('cors');
const countriesRoute = require('./routes/countries');
const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); 

app.use('/api', countriesRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
});
