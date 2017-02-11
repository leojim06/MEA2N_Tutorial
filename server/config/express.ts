import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as logger from 'morgan'

/**
 * Estableciendo la aplicación con express
 * 
 * @export Aplicación express
 * @class App
 */
export class App {
    private app: express.Application;

    /**
     * Crea una instancia de la aplicación express
     * 
     * 
     * @memberOf App
     */
    constructor() {
        this.app = express();
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
        this.app.get('/', this.renderHelloWorld);
    }

    /**
     * Inicializa el servidor de node con la aplicación express
     * 
     * @param {number} port Puerto en el que escuchará el servidor
     * 
     * @memberOf App
     */
    public startServer(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}.`);
        });
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
        res.status(200).send('Hello World (^.^)');
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
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
}