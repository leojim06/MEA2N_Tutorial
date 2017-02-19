import { Schema } from 'mongoose';
import { DataAccess } from '../../../config/dataAccess'
import { PropietarioModel } from '../interfaces';
import { Fincas } from '../schemas';

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

const PropietarioSchema: Schema = new mongoose.Schema({
   fName: { type: String, required: true, trim: true },
   lName: { type: String, required: true, trim: true },
   gender: { type: String, required: true, enum: ['M', 'F', 'X'], default: 'X' },
   age: { type: Number, required: true },
   email: { type: String, required: true, unique: true },
   fincas: [{ type: Schema.Types.ObjectId, ref: 'Fincas' }]
}, { timestamps: true });

// Función antes de borrar el registro (.pre -> remove) borrar las fincas
PropietarioSchema.pre('remove', function (next) {
   let propietario = this;
   propietario.fincas.forEach(finca => {
      Fincas.remove({ _id: finca }).exec();
   });
   next();
});

export const Propietarios = <PropietarioModel>mongooseConnection.model('Propietarios', PropietarioSchema);