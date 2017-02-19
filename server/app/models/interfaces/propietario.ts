import { Document, Model, Types } from 'mongoose';

export interface Propietario extends Document {
    fName: string;
    lName: string;
    gender: string;
    age: number;
    email: string;
    fincas: Types.ObjectId[];
}

export interface PropietarioModel extends Model<Propietario> { }