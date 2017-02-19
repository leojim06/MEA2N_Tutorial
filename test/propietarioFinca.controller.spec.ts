process.env.NODE_ENV = 'test';

import * as async from 'async';
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../server/config/express';
import { Propietarios, Fincas } from '../server/app/models/schemas';
import { Propietario, Finca } from '../server/app/models/interfaces';

chai.use(chaiHttp);
const expect = chai.expect;
const propietariosURL = `/api/v1/propietarios`;
const fincasURL = `/api/v1/fincas`;

const propietarioTest1: Propietario = <Propietario>{
   fName: 'John',
   lName: 'Doe',
   gender: 'M',
   age: 33,
   email: 'sample@he.ll'
};
const fincaTest1 = {
   name: 'Hacienda el Paraiso',
   area: 1500,
   location: [1.087418, -77.385573]
};
const fincaTest2 = {
   name: 'La María',
   area: 1500,
   location: [1.287418, -77.585573]
};
const fincaTest3 = {
   name: 'Las nubes',
   area: 1500,
   location: [1.387418, -77.785573]
};

describe('PROPIETARIOS & FINCAS', () => {
   beforeEach((done) => {
      async.waterfall([
         // Eliminar datos de propietarios y de fincas
         (callback) => { Propietarios.collection.drop((callback())) },
         (callback) => { Fincas.collection.drop(callback()) },
         // Crea propietario
         (callback) => {
            Propietarios.create(propietarioTest1, (error, propietario) => {
               callback(error, propietario);
            });
         },
         // Crea 2 fincas
         (propietario: Propietario, callback) => {
            Fincas.create(fincaTest1, (error, finca) => {
               let fincas: Finca[] = [];
               fincas.push(finca);
               callback(error, propietario, fincas);
            });
         },
         (propietario: Propietario, fincas: Finca[], callback) => {
            Fincas.create(fincaTest2, (error, finca) => {
               fincas.push(finca);
               callback(error, propietario, fincas);
            });
         },
         // Adjunta las fincas al propietario
         (propietario: Propietario, fincas: Finca[], callback) => {
            fincas.forEach(finca => {
               propietario.update({ $push: { fincas: { _id: finca._id } } },
                  (err, res) => { });
            });
            callback();
         }
      ], (error, result) => {
         done();
      });
   });
   afterEach((done) => {
      Propietarios.collection.drop();
      Fincas.collection.drop();
      done();
   });

   // /api/v1/propietarios - DELETE
   it('Debe borrar un propietario y sus fincas asociadas', (done) => {
      // Obtiene todos los propietarios
      chai.request(app).get(propietariosURL).end((error, propietarios) => {
         // Borra un el primer propietario
         chai.request(app).del(`${propietariosURL}/${propietarios.body.RESULT[0]._id}`)
            .end((err, res) => {
               expect(res).to.have.status(200);
               expect(res.body).to.have.property('DELETED');
               // Obtiene la primera finca del primer propietario y debe responder con 404 
               // porque la finca se borró con el propietario
               chai.request(app).get(`${fincasURL}/${propietarios.body.RESULT[0].fincas[0]}`)
                  .end((err, res) => {
                     expect(res).to.have.status(404);
                     expect(res.body).to.have.property('ERROR');
                     expect(res.body.ERROR).to.equal('Finca no encontrada');
                     done();
                  });
            });
      });
   });
   // /api/v1/fincas - DELETE
   it('Debe borrar una finca y su relación con el correspondiente propietario', (done) => {
      // Obtiene todos los propietarios
      chai.request(app).get(propietariosURL).end((error, propietarios) => {
         // Borra la primera finca del primer propietario
         chai.request(app).del(`${fincasURL}/${propietarios.body.RESULT[0].fincas[0]}`)
            .end((error, result) => {
               expect(result).to.have.status(200);
               expect(result.body).to.have.property('DELETED');
               expect(result.body.DELETED).to.equal(propietarios.body.RESULT[0].fincas[0]);
               // Se recupera el propietario por id y se compara los datos de las fincas
               // Se espera que el id de la finca ya no se encuentre 
               // en los datos del primer Propietario
               chai.request(app).get(`${propietariosURL}/${propietarios.body.RESULT[0]._id}`)
                  .end((error, res) => {
                     expect(res.body.RESULT.fincas).not.contain(result.body.DELETED);
                     done();
                  });
            });
      });
   });
   // /api/v1/propietario/:_id/fincas - GET
   it('Debe obtener la información de un propietario por id y la informacion de sus fincas (populate)',
      (done) => {
         // Obtiene todos los propietarios
         chai.request(app).get(propietariosURL).end((error, propietarios) => {
            // Obtiene el primer propietario por id en la ruta 
            // /propietarios/:_id/fincas y se espera que el arreglo
            // fincas contenga una propiedad name con información que se conoce
            chai.request(app).get(`${propietariosURL}/${propietarios.body.RESULT[0]._id}/fincas`)
               .end((err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body.RESULT.fincas[0]).to.have.property('name');
                  expect(res.body.RESULT.fincas[0].name).to.be.equal('Hacienda el Paraiso');
                  done();
               });
         });
      });
   // /api/v1/propietario/:_id/fincas - POST
   it('Debe crear una finca y adjuntarla al propietario por id', (done) => {
      // Obtiene todos los propietarios
      chai.request(app).get(propietariosURL).end((error, propietarios) => {
         // Crea la finca
         chai.request(app).post(`${propietariosURL}/${propietarios.body.RESULT[0]._id}/fincas`)
            .send(fincaTest3).end((error, result) => {
               // Espera status 201 y que el result contenga una propiedad 
               // CREATED con una propiedad propietario y una propiedad finca
               expect(result).to.have.status(201);
               expect(result.body.CREATED.propietario._id).to.be.equal(propietarios.body.RESULT[0]._id);
               // Espera que al buscar el propietario nuevamente por id contenga el id de la finca
               chai.request(app).get(`${propietariosURL}/${propietarios.body.RESULT[0]._id}`)
                  .end((error, res) => {
                     expect(res.body.RESULT.fincas).contain(result.body.CREATED.finca._id);
                     done();
                  });
            });
      });
   });
});
