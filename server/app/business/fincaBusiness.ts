import { FincaRepository } from '../repository/fincaRepository';
import { BaseBusiness } from './interfaces/baseBusines';
import { Finca } from '../models/interfaces/finca';
import { Fincas } from '../models/schemas/fincaSchema';

export class FincaBusiness implements BaseBusiness<Finca> {
   private fincaRepository: FincaRepository;

   constructor() {
      this.fincaRepository = new FincaRepository(Fincas);
   }

   create(item: Finca, callback: (error: any, result: any) => void) {
      this.fincaRepository.create(item, callback);
   }
   getAll(callback: (error: any, result: any) => void) {
      this.fincaRepository.getAll(callback);
   }
   update(_id: string, item: Finca, callback: (error: any, result: any) => void) {
      this.fincaRepository.findById(_id, (err, res) => {
         if (err || !res) {
            return callback(err, res);
         }
         this.fincaRepository.update(res._id, item, callback);
      });
   }
   delete(_id: string, callback: (error: any, result: any) => void) {
      this.fincaRepository.findById(_id, (err, res) => {
         if (err || !res) {
            return callback(err, res);
         }
         this.fincaRepository.delete(res._id, callback);
      });
   }
   findById(_id: string, callback: (error: any, result: Finca) => void) {
      this.fincaRepository.findById(_id, callback);
   }
}