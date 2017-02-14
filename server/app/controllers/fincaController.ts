import { Request, Response } from 'express';
import { FincaBusiness } from '../business/fincaBusiness';
import { BaseController } from './interfaces/baseController';
import { Finca } from '../models/interfaces/finca';

export class FincaController implements BaseController<Finca> {
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

   create(req: Request, res: Response): void {
      try {
         let finca: Finca = <Finca>req.body;
         let fincaBusiness = new FincaBusiness();
         fincaBusiness.create(finca, (error, result) => {
            error ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               res.status(201).send({ 'CREATED': result });
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
         let finca: Finca = <Finca>req.body;
         let fincaBusiness = new FincaBusiness();
         fincaBusiness.update(_id, finca, (error, result) => {
            error || (result && result.nModified === 0) ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               !result ?
                  res.status(404).send({ 'ERROR': 'Finca no encontrada - no se puede actualizar' }) :
                  res.status(200).send({ 'UPDATED': finca });
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