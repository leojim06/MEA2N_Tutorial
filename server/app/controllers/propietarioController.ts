import { Request, Response } from 'express';
import { PropietarioBusiness } from '../business/propietarioBusiness';
import { BaseController } from './interfaces/baseController';
import { Propietario } from '../models/interfaces/propietario';

/**
 * Manipula la información del Propietario en la capa de controller
 * Es el contacto directo con el cliente y recibe información de este
 * También muestra los mensajes pertinentes al cliente.
 * 
 * @export
 * @class PropietarioController
 * @implements {BaseController<Propietario>}
 */
export class PropietarioController implements BaseController<Propietario> {
   /**
    * Obtiene todos los registros de Propietario o muestra el error pertinente
    * 
    * @param {Request} req
    * @param {Response} res
    * 
    * @memberOf PropietarioController
    */
   getAll(req: Request, res: Response): void {
      try {
         let propietarioBusiness = new PropietarioBusiness();
         propietarioBusiness.getAll((error, result) => {
            error ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               result && result.length === 0 ?
                  res.status(404).send({ 'ERROR': 'No existen registros' }) :
                  res.status(200).send({ 'RESULT': result });
         });
      } catch (error) {
         res.status(500).send({ 'SERVER_ERROR': error });
      }
   }

   /**
    * Crea un registro de Propietario o muestra el error pertinente
    * 
    * @param {Request} req
    * @param {Response} res
    * 
    * @memberOf PropietarioController
    */
   create(req: Request, res: Response): void {
      try {
         let propietario: Propietario = <Propietario>req.body;
         let propietarioBusiness = new PropietarioBusiness();
         propietarioBusiness.create(propietario, (error, result) => {
            error ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               res.status(201).send({ 'CREATED': result });
         });
      } catch (error) {
         res.status(500).send({ 'SERVER_ERROR': error });
      }
   }

   /**
    * Obtiene un registro de propietario por id o muestra el error pertinente
    * 
    * @param {Request} req
    * @param {Response} res
    * 
    * @memberOf PropietarioController
    */
   findById(req: Request, res: Response): void {
      try {
         let _id: string = req.params._id;
         let propietarioBusiness = new PropietarioBusiness();
         propietarioBusiness.findById(_id, (error, result) => {
            error ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               !result ?
                  res.status(404).send({ 'ERROR': 'Propietario no encontrado' }) :
                  res.status(200).send({ 'RESULT': result });
         });
      } catch (error) {
         res.status(500).send({ 'SERVER_ERROR': error });
      }
   }

   /**
    * Actualiza un registro de propietario por id o muestra el error pertinente
    * 
    * @param {Request} req
    * @param {Response} res
    * 
    * @memberOf PropietarioController
    */
   update(req: Request, res: Response): void {
      try {
         let _id: string = req.params._id;
         let propietario: Propietario = <Propietario>req.body;
         let propietarioBusiness = new PropietarioBusiness();
         propietarioBusiness.update(_id, propietario, (error, result) => {
            error || (result && result.nModified === 0) ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               !result ?
                  res.status(404).send({ 'ERROR': 'Propietario no encontrado - no se puede actualizar' }) :
                  res.status(200).send({ 'UPDATED': propietario });
         });
      } catch (error) {
         res.status(500).send({ 'SERVER_ERROR': error });
      }
   }

   /**
    * Elimina un registro de propietario por id o muestra el error pertinente
    * 
    * @param {Request} req
    * @param {Response} res
    * 
    * @memberOf PropietarioController
    */
   delete(req: Request, res: Response): void {
      try {
         let _id: string = req.params._id;
         let propietarioBusiness = new PropietarioBusiness();
         propietarioBusiness.delete(_id, (error, result) => {
            error ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               !result ?
                  res.status(404).send({ 'ERROR': 'Propietario no encontrado - no se puede eliminar' }) :
                  res.status(200).send({ 'DELETED': _id });
         });
      } catch (error) {
         res.status(500).send({ 'SERVER_ERROR': error });
      }
   }
}