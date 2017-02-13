import { RequestHandler } from 'express'

/**
 * Interface que manipula información proveniente del usuario en la
 * capa controller al momento de registrar información
 * 
 * @export
 * @interface WriteController
 */
export interface WriteController {
    /**
     * Reciber la información proveniente del usuario y muestra los mensajes correspondientes
     * en la solicitud de crear un elementos de tipo <T>
     * 
     * @type {RequestHandler}
     * @memberOf WriteController
     */
    create: RequestHandler;
    /**
     * Reciber la información proveniente del usuario y muestra los mensajes correspondientes
     * en la solicitud de actualizar un elementos de tipo <T> 
     * 
     * @type {RequestHandler}
     * @memberOf WriteController
     */
    update: RequestHandler;
    /**
     * Reciber la información proveniente del usuario y muestra los mensajes correspondientes
     * en la solicitud de eliminar un elementos de tipo <T>
     * 
     * @type {RequestHandler}
     * @memberOf WriteController
     */
    delete: RequestHandler;
}