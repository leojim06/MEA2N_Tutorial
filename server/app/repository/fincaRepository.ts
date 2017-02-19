import { Model, Document, Types } from 'mongoose';
import { BaseRepository } from './interfaces/baseRepository';
import { Finca } from '../models/interfaces';
import { Fincas } from '../models/schemas';

export class FincaRepository implements BaseRepository<Finca> {
   private model: Model<Document>;

   constructor() {
      this.model = Fincas;
   }

   create(item: Finca, callback: (error: any, result: any) => void) {
      this.model.create(item, callback);
   }
   getAll(callback: (error: any, result: any) => void) {
      this.model.find({}, callback);
   }
   update(item: Finca, data: Finca, callback: (error: any, result: any) => void) {
      item.update(data, callback);
   }
   delete(item: Finca, callback: (error: any, result: any) => void) {
      item.remove((err) => callback(err, { _id: item._id }));
   }
   findById(_id: string, callback: (error: any, result: Finca) => void) {
      this.model.findById(_id, callback);
   }
}