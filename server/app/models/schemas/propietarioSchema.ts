import { Schema } from 'mongoose';
import { DataAccess } from '../../../config/dataAccess'
import { PropietarioModel } from '../interfaces/propietario';

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

const PropietarioSchema: Schema = new mongoose.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true }
}, { timestamps: true });

export const Propietarios = <PropietarioModel>mongooseConnection.model('Propietarios', PropietarioSchema);