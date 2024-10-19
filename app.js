import express from 'express';
import mongoose from 'mongoose'; 
import config from './config/config.js';
import serverConfig from './frameworks/webserver/server.js';
import routes from './frameworks/webserver/routes/index.js'

import 'dotenv/config';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log("userService root path accessed");
});

serverConfig(app, mongoose, config).startServer()

routes(app,express)