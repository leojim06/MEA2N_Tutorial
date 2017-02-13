import * as express from 'express';
import { PropietarioRoutes } from './propietarioRoutes';

const app = express();
const prefix: string = '/api/v1';

export class Routes {
   public get routes(): express.Application {
      app.use(`${prefix}/propietarios`, new PropietarioRoutes().routes);
      return app;
   }
}