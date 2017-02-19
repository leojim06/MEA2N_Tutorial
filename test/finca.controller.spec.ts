process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../server/config/express';
import { Fincas, Propietarios } from '../server/app/models/schemas';
import { Finca } from '../server/app/models/interfaces';

chai.use(chaiHttp);
const expect = chai.expect;
const fincasURL = `/api/v1/fincas`;

const fincaTest = {
   name: 'La Maria',
   area: 500,
   location: [1.087418, -77.385573]
};

// const fincaTest: Finca = <Finca>{
//    name: 'La Maria',
//    area: 500,
//    location: [1.087418, -77.385573]
//    // 1.087418, -77.385573
// };

describe('FINCAS', () => {

   Fincas.collection.drop();
   beforeEach((done) => {
      Fincas.create(fincaTest);
      done();
   });
   afterEach((done) => {
      Fincas.collection.drop();
      done();
   });

   // /api/v1/fincas - GET
   describe('/ GET fincas', () => {
      it('Debe listar todas las fincas', (done) => {
         chai.request(app).get(fincasURL).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('RESULT');
            expect(res.body.RESULT).to.be.an('array');
            expect(res.body.RESULT[0].name).to.equal('La Maria');
            expect(res.body.RESULT[0].area).to.equal(500);
            done();
         });
      });
      it('No debe listar fincas - base de datos vacia', (done) => {
         Fincas.collection.drop();
         chai.request(app).get(fincasURL).end((err, res) => {
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            expect(res.body).to.have.property('ERROR');
            expect(res.body.ERROR).to.be.a('string');
            expect(res.body.ERROR).to.be.equal('No existen registros');
            done();
         });
      });
   });

   // /api/v1/fincas - POST
   // No tiene end point pero se utiliza al crear la finca en la ruta
   // /api/v1/propietarios/:_id/fincas - POST
   // @deprecated


   // /api/v1/fincas/:_id - GET
   describe('/GET/:_id finca', () => {
      it('Debe listar finca con id', (done) => {
         chai.request(app).get(fincasURL).end((error, response) => {
            chai.request(app).get(`${fincasURL}/${response.body.RESULT[0]._id}`)
               .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res).to.be.json;
                  expect(res.body).to.have.property('RESULT');
                  expect(res.body.RESULT).to.be.an('object');
                  expect(res.body.RESULT).to.have.property('_id');
                  expect(res.body.RESULT).to.have.property('__v');
                  expect(res.body.RESULT.name).to.equal('La Maria');
                  expect(res.body.RESULT.area).to.equal(500);
                  expect(res.body.RESULT._id).to.equal(response.body.RESULT[0]._id);
                  done();
               });
         });
      });
      it('No debe listar finca - _id incorrecto', (done) => {
         chai.request(app).get(`${fincasURL}/_id_sin_identificar`).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('ERROR');
            expect(res.body).to.have.property('MSG');
            expect(res.body.ERROR).to.be.a('string');
            expect(res.body.ERROR).to.equal('Error en su solicitud');
            done();
         });
      });
      it('No debe listar finca - _id manipulado', (done) => {
         chai.request(app).get(fincasURL).end((error, response) => {
            let _idManipulado = response.body.RESULT[0]._id;
            _idManipulado = (1 + parseInt(_idManipulado.charAt(0))) +
               _idManipulado.substring(1, _idManipulado.length);
            chai.request(app).get(`${fincasURL}/${_idManipulado}`)
               .end((err, res) => {
                  expect(res).to.have.status(404);
                  expect(res).to.be.json;
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('ERROR');
                  expect(res.body.ERROR).to.equal('Finca no encontrada');
                  done();
               });
         });
      });
   });

   // /api/v1/fincas/:_id - PUT
   describe('/PUT/:_id fincas', () => {
      it('Debe actualizar finca con id', (done) => {
         chai.request(app).get(fincasURL).end((error, response) => {
            chai.request(app).put(`${fincasURL}/${response.body.RESULT[0]._id}`)
               .send({ area: 1500 })
               .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res).to.be.json;
                  expect(res.body).to.have.property('UPDATED');
                  expect(res.body.UPDATED).to.be.an('object');
                  expect(res.body.UPDATED.area).to.equal(1500);
                  done();
               });
         });
      });
      it('No debe actualizar finca - _id incorrecto', (done) => {
         chai.request(app).put(`${fincasURL}/_id_sin_identificar`)
            .send({ fName: 'Name' })
            .end((err, res) => {
               expect(res).to.have.status(400);
               expect(res).to.be.json;
               expect(res.body).to.be.an('object');
               expect(res.body).to.have.property('ERROR');
               expect(res.body).to.have.property('MSG');
               expect(res.body.ERROR).to.be.a('string');
               expect(res.body.ERROR).to.equal('Error en su solicitud');
               done();
            });
      });
      it('No debe actualizar finca - _id manipulado', (done) => {
         chai.request(app).get(fincasURL).end((error, response) => {
            let _idManipulado = response.body.RESULT[0]._id;
            _idManipulado = (1 + parseInt(_idManipulado.charAt(0))) +
               _idManipulado.substring(1, _idManipulado.length);
            chai.request(app).put(`${fincasURL}/${_idManipulado}`)
               .send({ fname: 'Name' })
               .end((err, res) => {
                  expect(res).to.have.status(404);
                  expect(res).to.be.json;
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('ERROR');
                  expect(res.body.ERROR).to.equal('Finca no encontrada - no se puede actualizar')
                  done();
               });
         });
      });
      it('No debe actualizar finca - campos incorrectos', (done) => {
         chai.request(app).get(fincasURL).end((error, response) => {
            chai.request(app).put(`${fincasURL}/${response.body.RESULT[0]._id}`)
               .send({ otroCampo: 'otro valor' })
               .end((err, res) => {
                  expect(res).to.have.status(400);
                  expect(res).to.be.json;
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('ERROR');
                  expect(res.body).to.have.property('MSG');
                  expect(res.body.ERROR).to.be.a('string');
                  expect(res.body.ERROR).to.equal('Error en su solicitud');
                  done();
               });
         });
      });
   });

   // /api/v1/fincas/:_id - DELETE
   describe('/DELETE/:_id fincas', () => {
      it('Debe borrar finca con id', (done) => {
         chai.request(app).get(fincasURL).end((error, response) => {
            chai.request(app).del(`${fincasURL}/${response.body.RESULT[0]._id}`)
               .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res).to.be.json;
                  expect(res.body).to.have.property('DELETED');
                  expect(res.body.DELETED).to.be.a('string');
                  expect(res.body.DELETED).to.be.equal(response.body.RESULT[0]._id);
                  done();
               });
         });
      });
      it('No debe eliminar finca - _id incorrecto', (done) => {
         chai.request(app).del(`${fincasURL}/_id_sin_identificar`).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('ERROR');
            expect(res.body).to.have.property('MSG');
            expect(res.body.ERROR).to.be.a('string');
            expect(res.body.ERROR).to.equal('Error en su solicitud');
            done();
         });
      });
      it('No debe eliminar finca - _id manipulado', (done) => {
         chai.request(app).get(fincasURL).end((error, response) => {
            let _idManipulado = response.body.RESULT[0]._id;
            _idManipulado = (1 + parseInt(_idManipulado.charAt(0))) +
               _idManipulado.substring(1, _idManipulado.length);
            chai.request(app).del(`${fincasURL}/${_idManipulado}`).end((err, res) => {
               expect(res).to.have.status(404);
               expect(res).to.be.json;
               expect(res.body).to.be.an('object');
               expect(res.body).to.have.property('ERROR');
               expect(res.body.ERROR).to.equal('Finca no encontrada - no se puede eliminar');
               done();
            });
         });
      });
   });
});