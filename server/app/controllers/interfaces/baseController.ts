import { ReadController } from './read';
import { WriteController } from './write';

/**
 * Interface para crear el CRUD de los elementos <T> en la capa de
 * controller, se comunica con el usuario, depura la información 
 * entrante y muestra mensajes concretos en respuesta a las 
 * peticiones del usuario
 * 
 * @export
 * @interface BaseController
 * @extends {ReadController}
 * @extends {WriteController}
 * @template T
 */
export interface BaseController<T> extends ReadController, WriteController { }