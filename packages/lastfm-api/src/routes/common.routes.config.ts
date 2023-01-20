import * as express from 'express';

export abstract class CommonRoutesConfig {
  static readonly apiRoot = '/api';

  protected readonly app: express.Application;
  readonly name: string;

  protected constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  abstract configureRoutes(): express.Application;
}
