import { Finca } from './finca.model';

export interface PropietarioFinca {
   _id: string;
   fName: string;
   lName: string;
   gender: string;
   age: number;
   email: string;
   fincas: Finca[];
   createdAt: string;
   updatedAt: string;
}
