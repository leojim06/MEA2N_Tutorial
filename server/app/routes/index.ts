import * as express from 'express';
import { PropietarioRoutes } from './propietarioRoutes';
import { FincaRoutes } from './fincaRoutes';
import { PropietarioFincaRoutes } from './propietarioFincaRoutes';

const app = express();
const prefix: string = '/api/v1';

export class Routes {
   public get routes(): express.Application {
      app.use(`${prefix}/propietarios`,
         new PropietarioRoutes().routes,
         new PropietarioFincaRoutes().routes);
      app.use(`${prefix}/fincas`, new FincaRoutes().routes);
      return app;
   }
}