const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

const connectDB = require('./config/dbconn');
const authRouter = require('./router/auth');
const userRouter = require('./router/user');
const barberShop = require('./router/barberShop');

dotenv.config({ path: './config/config.env' });
const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/barberShop', barberShop);

app.listen(process.env.SERVER_PORT || 8080);