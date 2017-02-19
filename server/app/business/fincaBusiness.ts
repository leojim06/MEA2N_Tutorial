import { FincaRepository } from '../repository';
import { BaseBusiness } from './interfaces/baseBusines';
import { Finca } from '../models/interfaces';
import { Fincas } from '../models/schemas';

export class FincaBusiness implements BaseBusiness<Finca> {
   private fincaRepository: FincaRepository;

   constructor() {
      this.fincaRepository = new FincaRepository();
   }

   create(item: Finca, callback: (error: any, result: any) => void) {
      this.fincaRepository.create(item, callback);
   }
   getAll(callback: (error: any, result: any) => void) {
      this.fincaRepository.getAll(callback);
   }
   update(_id: string, data: Finca, callback: (error: any, result: any) => void) {
      this.fincaRepository.findById(_id, (err: any, res: Finca) => {
         if (err || !res) {
            return callback(err, res);
         }
         this.fincaRepository.update(res, data, callback);
      });
   }
   delete(_id: string, callback: (error: any, result: any) => void) {
      this.fincaRepository.findById(_id, (err: any, res: Finca) => {
         if (err || !res) {
            return callback(err, res);
         }
         this.fincaRepository.delete(res, callback);
      });
   }
   findById(_id: string, callback: (error: any, result: Finca) => void) {
      this.fincaRepository.findById(_id, callback);
   }
}