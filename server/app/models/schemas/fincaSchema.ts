import { Schema } from 'mongoose';
import { DataAccess } from '../../../config/dataAccess';
import { FincaModel } from '../interfaces';
import { Propietarios } from '../schemas';

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

const FincaSchema: Schema = new mongoose.Schema({
   name: { type: String, required: true, trim: true },
   area: { type: Number, required: true, trim: true },
   location: {
      type: [Number],     // [<longitude>, <latitude>]
      required: true,
      index: '2d'        // create the geopatial index
   }
})

// Función antes de borrar el registro (.pre -> remove) borrar las relaciones con propietario
FincaSchema.pre('remove', function (next) {
   let finca = this;
   Propietarios.update({ fincas: finca._id },
      { $pull: { fincas: finca._id } }
   ).exec();
   next();
});

export const Fincas = <FincaModel>mongooseConnection.model('Fincas', FincaSchema);