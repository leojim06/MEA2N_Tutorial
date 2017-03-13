import { Model, Document, Types, Schema } from 'mongoose';
import { BaseRepository } from './interfaces/baseRepository';
import { Propietario, Finca } from '../models/interfaces';
import { Propietarios } from '../models/schemas';

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
   constructor() {
      this.model = Propietarios;
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
   update(item: Propietario, data: Propietario, callback: (error: any, result: any) => void) {
      item.update(data, callback);
   }
   /**
    * Elimina un propietario por _id y sus fincas relacionadas.
    * 
    * @param {Types.ObjectId} _id
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioRepository
    */
   delete(item: Propietario, callback: (error: any, result: any) => void) {
      item.remove((err) => callback(err, { _id: item._id }));
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


   // Recibe el id del propietario, el id de la finca y registra la finca dentro del 
   // arreglo de fincas del propietario.
   // $addToSet ingresa el elemento en el arreglo solo si el elemento no existe
   // $push ingresa el elemento en el arreglo aunque ya exista en este
   // $pull saca el elemento del arreglo, si existen varios elementos iguales los elimina a todos

   /**
    * Inserta la finca enviada en el arreglo de fincas del propietario enviado
    * 
    * @param {Propietario} propietario
    * @param {Finca} finca
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioRepository
    */
   insertLand(propietario: Propietario, finca: Finca, callback: (error: any, result: any) => void) {
      propietario.update({
         $addToSet: { fincas: finca._id }
      }, (err) => callback(err, { propietario: propietario, finca: finca }));
   }


   /**
    * Recupera la información de las fincas del propietario y las adjunta en el documento propietario
    * @see mongoose.populate
    *
    * @param {Propietario} item
    * @param {(error: any, result: any) => void} callback
    * 
    * @memberOf PropietarioRepository
    */
   getLand(item: Propietario, callback: (error: any, result: any) => void) {
      item.populate('fincas', callback);
   };

   
   /**
    * Busca en la base de datos si existe el email que tiene registrado el propietario
    * 
    * @param {Propietario} item 
    * @param {(error: any, result: any) => void} callback 
    * 
    * @memberOf PropietarioRepository
    */
   findEmail(item: Propietario, callback: (error: any, result: any) => void) {
      this.model.findOne({email: item.email }, callback);
   }
}