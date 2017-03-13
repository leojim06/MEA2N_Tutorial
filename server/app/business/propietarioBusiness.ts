import * as async from 'async';
import { PropietarioRepository, FincaRepository } from '../repository';
import { BaseBusiness } from './interfaces/baseBusines';
import { Propietario, Finca } from '../models/interfaces';

/**
 * Manipula la información del Propietario en la capa de business
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
      this.propietarioRepository = new PropietarioRepository();
   }

   /**
    * Crea un propietario en la capa de business asegurandose de que el 
    * email no esté repetido
    * 
    * @param {Propietario} item
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioBusiness
    */
   create(item: Propietario, callback: (error: any, result: any) => void) {
      this.propietarioRepository.findEmail(item, (err: any, res: Propietario) => {
         if (res !== null) {
            return callback('El email ya existe', res);
         }
         this.propietarioRepository.create(item, callback);
      });

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
    * @param {Propietario} data
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioBusiness
    */
   update(_id: string, data: Propietario, callback: (error: any, result: any) => void) {
      this.propietarioRepository.findById(_id, (err: any, res: Propietario) => {
         if (err || !res) {
            return callback(err, res);
         }
         this.propietarioRepository.update(res, data, callback);
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
      this.propietarioRepository.findById(_id, (err: any, res: Propietario) => {
         if (err || !res) {
            return callback(err, res);
         }
         this.propietarioRepository.delete(res, callback);
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
   /**
    * Inserta una finca a un propietario según id del propietario
    * Con el id busca el propietario, si el propietario existe,
    * crea la finca, si la finca es creada, inserta la finca
    * en el arreglo de fincas del propietario.
    * Si algo sale mal, elimina la finca recién creada
    * 
    * @param {string} _id
    * @param {Finca} finca
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioBusiness
    */
   insertLand(_id: string, finca: Finca, callback: (error: any, result: any) => void) {
      // // utilizando la libreria async
      // async.waterfall([
      //    (cb) => {
      //       this.propietarioRepository.findById(_id, (err: any, propietario: Propietario) => {
      //          if (err || !propietario) {
      //             return callback(err, propietario);
      //          }
      //          cb(err, propietario);
      //       });
      //    },
      //    (propietario, cb) => {
      //       let fincaRepository = new FincaRepository();
      //       fincaRepository.create(finca, (err: any, finca: Finca) => {
      //          if (err || !finca) {
      //             return callback(err, finca);
      //          }
      //          cb(err, propietario, finca);
      //       });
      //    },
      //    (propietario, finca, cb) => {
      //       this.propietarioRepository.insertLand(propietario, finca, (err: any, res: any) => {
      //          if (err || !res) {
      //             let fincaRepository = new FincaRepository();
      //             fincaRepository.delete(finca, callback);
      //          }
      //          cb(err, res);
      //       });
      //    }
      // ], (error, result) => {
      //    return callback(error, result);
      // });

      //Utilizando llamados anidados a los repository
      this.propietarioRepository.findById(_id, (err: any, propietario: Propietario) => {
         if (err || !propietario) {
            return callback(err, propietario);
         }
         let fincaRepository = new FincaRepository();
         fincaRepository.create(finca, (err: any, newFinca: Finca) => {
            if (err || !newFinca) {
               return callback(err, finca);
            }
            this.propietarioRepository.insertLand(propietario, newFinca, (err: any, res: any) => {
               if (err || !res) {
                  fincaRepository.delete(newFinca, callback);
               }
               return callback(err, res);
            });
         });
      });
   }
   /**
    * Recupera la información de las fincas de un propietario dado.
    * 
    * @param {string} _id
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioBusiness
    */
   getLand(_id: string, callback: (error: any, result: any) => void) {
      this.propietarioRepository.findById(_id, (err: any, res: Propietario) => {
         if (err || !res) {
            return callback(err, res);
         }
         this.propietarioRepository.getLand(res, callback);
      });
   };
}