import { Model, Document, Types } from 'mongoose';
import { BaseRepository } from './interfaces/baseRepository';
import { Finca } from '../models/interfaces/finca';

export class FincaRepository implements BaseRepository<Finca> {
    private model: Model<Document>;

    constructor(schemaModel: Model<Document>) {
        this.model = schemaModel;
    }

    create(item: Finca, callback: (error: any, result: any) => void) {
        this.model.create(item, callback);
    }
    getAll(callback: (error: any, result: any) => void) {
        this.model.find({}, callback);
    }
    update(_id: Types.ObjectId, item: Finca, callback: (error: any, result: any) => void) {
        this.model.update({ _id: _id }, item, callback);
    }
    delete(_id: Types.ObjectId, callback: (error: any, result: any) => void) {
        this.model.remove({ _id: _id }, (err) => callback(err, { _id: _id }));
    }
    findById(_id: string, callback: (error: any, result: Finca) => void) {
        this.model.findById(_id, callback);
    }
}