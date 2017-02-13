import { Model, Document, Types } from 'mongoose';
import { BaseRepository } from './interfaces/baseRepository';
import { Propietario } from '../models/interfaces/propietario';

/**
 * Manipula la información del Propietario directamente con la base de datos
 * 
 * @export
 * @class PropietarioRepository
 * @implements {BaseRepository<Propietario>}
 */
export class PropietarioRepository implements BaseRepository<Propietario> {
   private model: Model<Document>;

   /**
    * Crea una instancia de PropietarioRepository.
    * 
    * @param {Model<Document>} schemaModel
    * 
    * @memberOf PropietarioRepository
    */
   constructor(schemaModel: Model<Document>) {
      this.model = schemaModel;
   }

   /**
    * Crea un propietario
    * 
    * @param {Propietario} item
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioRepository
    */
   create(item: Propietario, callback: (error: any, result: any) => void) {
      this.model.create(item, callback);
   }
   /**
    * Obtiene todos los propietarios
    * 
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioRepository
    */
   getAll(callback: (error: any, result: any) => void) {
      this.model.find({}, callback);
   }
   /**
    * Actualiza un propietario por _id
    * 
    * @param {Types.ObjectId} _id
    * @param {Propietario} item
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioRepository
    */
   update(_id: Types.ObjectId, item: Propietario, callback: (error: any, result: any) => void) {
      this.model.update({ _id: _id }, item, callback);
   }
   /**
    * Elimina un propietario por _id
    * 
    * @param {Types.ObjectId} _id
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioRepository
    */
   delete(_id: Types.ObjectId, callback: (error: any, result: any) => void) {
      this.model.remove({ _id: _id }, (err) => callback(err, { _id: _id }));
   }
   /**
    * Encuentra un propietario por _id
    * 
    * @param {string} _id
    * @param {(error: any, result: Propietario) => void} callback
    * 
    * @memberOf PropietarioRepository
    */
   findById(_id: string, callback: (error: any, result: Propietario) => void) {
      this.model.findById(_id, callback);
   }
}