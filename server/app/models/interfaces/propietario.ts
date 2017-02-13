import { Document, Model } from 'mongoose';

export interface Propietario extends Document {
    fName: string;
    lName: string;
    gender: string;
    age: number;
    email: string;
}

export interface PropietarioModel extends Model<Propietario> { }