import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';

import { Routes } from '../app/routes';

/**
 * Estableciendo la aplicación con express
 * 
 * @export Aplicación express
 * @class App
 */
class App {
    public express: express.Application;

    /**
     * Crea una instancia de la aplicación express
     * 
     * 
     * @memberOf App
     */
    constructor() {
        this.express = express();
        this.setMiddleware();
        this.setRoutes();
    }

    /**
     * Establece una ruta publica para la aplicación
     * 
     * 
     * @memberOf App
     */
    private setRoutes(): void {
        this.express.get('/', this.renderHelloWorld);
        this.express.use(new Routes().routes);
    }

    /**
     * Ruta basica que responde con un Hello World
     * 
     * @private
     * @param {express.Request} req Solicitud del Cliente
     * @param {express.Response} res Respuesta del Servidor
     * 
     * @memberOf App
     */
    private renderHelloWorld(req: express.Request, res: express.Response): void {
        res.status(200).send({ message: 'Hello World (^.^)' });
    }

    /**
     * Establece los middleware a usar.
     * Morgan - logger para crear reporte de solicitudes en linea de comandos
     * bodyParser para estandarizar la forma en la que se recibe la información (json)
     * 
     * @private
     * 
     * @memberOf App
     */
    private setMiddleware(): void {
        // Establece el logger solo si la variable de entorno es de desarrollo
        if (this.express.get('env') === 'development') {
            this.express.use(logger('dev'));
        }
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            next();
        });
    }
}

export default new App().express;