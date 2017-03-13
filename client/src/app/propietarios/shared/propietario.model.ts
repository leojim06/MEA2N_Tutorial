// export class Propietario {
//    _id: string;
//    fName: string;
//    lName: string;
//    gender: string;
//    age: number;
//    email: string;
//    fincas: string[];

//    constructor(values: Object = {}) {
//       Object.assign(this, values);
//    }
// }


export interface Propietario {
   _id: string;
   fName: string;
   lName: string;
   gender: string;
   age: number;
   email: string;
   fincas: string[];
   createdAt: string;
   updatedAt: string;
}
