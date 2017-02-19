import { Request, Response } from 'express';
import { FincaBusiness } from '../business';
import { BaseController } from './interfaces/baseController';
import { Finca } from '../models/interfaces';

export class FincaController {
   getAll(req: Request, res: Response): void {
      try {
         let fincaBusiness = new FincaBusiness();
         fincaBusiness.getAll((error, result) => {
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
   findById(req: Request, res: Response): void {
      try {
         let _id: string = req.params._id;
         let fincaBusiness = new FincaBusiness();
         fincaBusiness.findById(_id, (error, result) => {
            error ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               !result ?
                  res.status(404).send({ 'ERROR': 'Finca no encontrada' }) :
                  res.status(200).send({ 'RESULT': result });
         });
      } catch (error) {
         res.status(500).send({ 'SERVER_ERROR': error });
      }
   }
   update(req: Request, res: Response): void {
      try {
         let _id: string = req.params._id;
         let dataUpdate: Finca = <Finca>req.body;
         let fincaBusiness = new FincaBusiness();
         fincaBusiness.update(_id, dataUpdate, (error, result) => {
            error || (result && result.nModified === 0) ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               !result ?
                  res.status(404).send({ 'ERROR': 'Finca no encontrada - no se puede actualizar' }) :
                  res.status(200).send({ 'UPDATED': dataUpdate });
         });
      } catch (error) {
         res.status(500).send({ 'SERVER_ERROR': error });
      }
   }
   delete(req: Request, res: Response): void {
      try {
         let _id: string = req.params._id;
         let fincaBusiness = new FincaBusiness();
         fincaBusiness.delete(_id, (error, result) => {
            error ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               !result ?
                  res.status(404).send({ 'ERROR': 'Finca no encontrada - no se puede eliminar' }) :
                  res.status(200).send({ 'DELETED': _id });
         });
      } catch (error) {
         res.status(500).send({ 'SERVER_ERROR': error });
      }
   }
}