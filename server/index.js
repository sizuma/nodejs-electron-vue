require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use('/public/', express.static(path.resolve(__dirname, '..', 'public')));

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.locals.pretty = true;

const router = require('./router/index');
app.use('/', router);

const port = process.env.NODE_PORT || 0;
const host = process.env.NODE_HOST || 'localhost';

module.exports = new Promise((resolve, reject) => {
    const server = app.listen(port, error => {
        const actualPort = server.address().port;
        process.env.NODE_PORT = actualPort;
        process.env.NODE_OUTRER_HOST = process.env.NODE_OUTRER_HOST || `${host}:${actualPort}`;
        console.log(`server is running on ${process.env.NODE_OUTRER_HOST}`);
        if (error) reject(error);
        else resolve(`${process.env.NODE_OUTRER_HOST}`);
    });
});