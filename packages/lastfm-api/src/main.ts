/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as path from 'path';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import debug from 'debug';
import {PlayedSongsRoutes} from "./routes/played-songs.routes.config";
import {CommonRoutesConfig} from "./routes/common.routes.config";

const app: express.Application = express();
const routes: Array<CommonRoutesConfig> = [];
const debugLog = debug('app');

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({all: true})
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

routes.push(new PlayedSongsRoutes(app));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.name}`);
  });
  console.log(`Listening at http://localhost:${port}${CommonRoutesConfig.apiRoot}`);
});
server.on('error', console.error);
