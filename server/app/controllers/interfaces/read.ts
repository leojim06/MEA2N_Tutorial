import { RequestHandler } from 'express';

/**
 * Interface que manipuala información proveniente del usuario en la
 * capa controller al momento de leer información
 * 
 * @export
 * @interface ReadController
 */
export interface ReadController {
    /**
     * Reciber la información proveniente del usuario y muestra los mensajes correspondientes
     * en la solicitud de obtener todos los elementos de tipo <T>
     * 
     * @type {RequestHandler}
     * @memberOf ReadController
     */
    getAll: RequestHandler;
    /**
     * Reciber la información proveniente del usuario y muestra los mensajes correspondientes
     * en la solicitud de obtener un elemento elementos de tipo <T> 
     * 
     * @type {RequestHandler}
     * @memberOf ReadController
     */
    findById: RequestHandler;
}