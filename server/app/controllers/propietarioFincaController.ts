import { Request, Response } from 'express';
import { FincaBusiness, PropietarioBusiness } from '../business';
import { Finca, Propietario } from '../models/interfaces';

export class PropietarioFincaController {

   create(req: Request, res: Response): void {
      try {
         let _id: string = req.params._id;
         let propietario: Propietario;
         let finca: Finca = <Finca>req.body;
         let propietarioBusiness = new PropietarioBusiness();
         propietarioBusiness.insertLand(_id, finca, (error, result) => {
            error ?
               res.status(400).send({ 'ERROR': 'Error en su solicitud', 'MSG': error }) :
               !result ?
                  res.status(404).send({ 'ERROR': 'Propietario no encontrado' }) :
                  res.status(201).send({ 'CREATED': result });
         });
      } catch (error) {
         res.status(500).send({ 'SERVER_ERROR': error });
      }
   }

   get(req: Request, res: Response): void {
      try {
         let _id: string = req.params._id;
         let propietarioBusiness = new PropietarioBusiness();
         propietarioBusiness.getLand(_id, (error, result) => {
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
}