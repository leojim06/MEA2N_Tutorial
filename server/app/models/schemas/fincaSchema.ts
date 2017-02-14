import { Schema } from 'mongoose';
import { DataAccess } from '../../../config/dataAccess';
import { FincaModel } from '../interfaces/finca';

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

const FincaSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    area: { type: Number, required: true },
    location: {
        type: [Number],     // [<longitude>, <latitude>]
        required: true,
        index: '2d'        // create the geopatial index
    }
})

export const Fincas = <FincaModel>mongooseConnection.model('Fincas', FincaSchema);