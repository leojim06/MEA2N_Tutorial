import { PropietarioRepository } from '../repository/propietarioRepository';
import { BaseBusiness } from './interfaces/baseBusines';
import { Propietario } from '../models/interfaces/propietario';
import { Propietarios } from '../models/schemas/propietarioSchema';

/**
 * Manipula la informaci[on del Propietario en la capa de business
 * 
 * @export
 * @class PropietarioBusiness
 * @implements {BaseBusiness<Propietario>}
 */
export class PropietarioBusiness implements BaseBusiness<Propietario> {
   private propietarioRepository: PropietarioRepository;

   /**
    * Crea una instancia de PropietarioBusiness.
    * 
    * 
    * @memberOf PropietarioBusiness
    */
   constructor() {
      this.propietarioRepository = new PropietarioRepository(Propietarios);
   }

   /**
    * Crea un propietario en la capa de business
    * 
    * @param {Propietario} item
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioBusiness
    */
   create(item: Propietario, callback: (error: any, result: any) => void) {
      this.propietarioRepository.create(item, callback);
   }
   /**
    * Obtiene todos los propietarios en la capa de business
    * 
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioBusiness
    */
   getAll(callback: (error: any, result: any) => void) {
      this.propietarioRepository.getAll(callback);
   }
   /**
    * Actualiza un propietario en la capa de business por _id.
    * Primero verifica si el _id existe haciendo un llamado al método
    * findById de @see PropietarioBusiness
    * 
    * @param {string} _id
    * @param {Propietario} item
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioBusiness
    */
   update(_id: string, item: Propietario, callback: (error: any, result: any) => void) {
      this.propietarioRepository.findById(_id, (err, res) => {
         if (err || !res) {
            return callback(err, res);
         }
         this.propietarioRepository.update(res._id, item, callback);
      });
   }
   /**
    * Elimina un propietario en la capa de business por _id.
    * Primero verifica si el _id existe haciendo un llamado al método
    * findById de @see PropietarioBusiness
    * 
    * @param {string} _id
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioBusiness
    */
   delete(_id: string, callback: (error: any, result: any) => void) {
      this.propietarioRepository.findById(_id, (err, res) => {
         if (err || !res) {
            return callback(err, res);
         }
         this.propietarioRepository.delete(res._id, callback);
      });
   }
   /**
    * Encuentra un propietario en la capa de business
    * 
    * @param {string} _id
    * @param {(error: any, result: Propietario) => void} callback
    * 
    * @memberOf PropietarioBusiness
    */
   findById(_id: string, callback: (error: any, result: Propietario) => void) {
      this.propietarioRepository.findById(_id, callback);
   }
}