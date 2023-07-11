import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import mongoose, { ConnectOptions } from 'mongoose';

import { Controller } from './main.controller';
import { MONGO_URL } from './constants/pokeApi.constants';

class App {
  public app: Application;

  public pokeController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    this.connectToDatabase();
    this.pokeController = new Controller(this.app);
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }));

    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    this.app.use(cors());

    const storage = multer.diskStorage({
      destination(req, file, cb) {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        cb(null, 'uploads/');
      },
      filename(req, file, cb) {
        cb(null, file.originalname);
      },
    });

    const upload = multer({ storage });

    this.app.use(upload.single('file'));
  }

  private connectToDatabase() {
    mongoose.Promise = global.Promise;
    mongoose
      .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch(error => {
        console.error('MongoDB connection error:', error);
      });
  }

}

export default new App().app;
