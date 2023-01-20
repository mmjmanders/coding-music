import * as express from 'express';
import {CommonRoutesConfig} from "./common.routes.config";

export class PlayedSongsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'PlayedSongsRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`${CommonRoutesConfig.apiRoot}/played-songs`)
      .get((req: express.Request, res: express.Response) => {
        res.json({message: 'GET played songs'});
      });
    return this.app;
  }
}
