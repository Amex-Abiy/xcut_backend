const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

const connectDB = require('./config/dbconn');
const authRouter = require('./router/auth');

dotenv.config({ path: './config/config.env' });
const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/api/auth', authRouter);

app.listen(process.env.SERVER_PORT || 8080);