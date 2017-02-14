import { Document, Model } from 'mongoose';

export interface Finca extends Document {
    name: string;
    area: number;
    location: [number];
}

export interface FincaModel extends Model<Finca> { }