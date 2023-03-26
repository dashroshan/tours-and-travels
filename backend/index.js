const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './secrets.env' });
var app = express();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/root'));

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));
