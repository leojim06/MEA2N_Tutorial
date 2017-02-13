process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../server/config/express';
import { Propietarios } from '../server/app/models/schemas/propietarioSchema';
import { Propietario } from '../server/app/models/interfaces/propietario';

chai.use(chaiHttp);
const expect = chai.expect;
const propietariosURL = `/api/v1/propietarios`;

const propietarioTest: Propietario = <Propietario>{
   fName: 'Joe',
   lName: 'Doe',
   gender: 'M',
   age: 33,
   email: 'sample@he.ll'
};

describe('PROPIETARIOS', () => {

   Propietarios.collection.drop();
   beforeEach((done) => {
      Propietarios.create(propietarioTest);
      done();
   });
   afterEach((done) => {
      Propietarios.collection.drop();
      done();
   });

   describe('/GET propietarios', () => {
      it('Debe listar todos los propietarios', (done) => {
         chai.request(app).get(propietariosURL).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('RESULT');
            expect(res.body.RESULT).to.be.an('array');
            expect(res.body.RESULT[0].fName).to.equal('Joe');
            expect(res.body.RESULT[0].lName).to.equal('Doe');
            expect(res.body.RESULT[0].gender).to.equal('M');
            expect(res.body.RESULT[0].age).to.equal(33);
            expect(res.body.RESULT[0].email).to.equal('sample@he.ll');
            done();
         });
      });
      it('No debe listar propietarios - base de datos vacia', (done) => {
         Propietarios.collection.drop();
         chai.request(app).get(propietariosURL).end((err, res) => {
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            expect(res.body).to.have.property('ERROR');
            expect(res.body.ERROR).to.be.a('string');
            expect(res.body.ERROR).to.be.equal('No existen registros');
            done();
         });
      });
   });

   describe('/POST propietarios', () => {
      it('Debe agregar un propietario', (done) => {
         chai.request(app).post(propietariosURL).send({
            fName: 'Leo',
            lName: 'Jim',
            gender: 'M',
            age: 29,
            email: 'leojim06@sample.com'
         }).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.have.property('CREATED');
            expect(res.body.CREATED).to.be.an('object');
            expect(res.body.CREATED).to.have.property('_id');
            expect(res.body.CREATED).to.have.property('__v');
            expect(res.body.CREATED).to.have.property('createdAt');
            expect(res.body.CREATED).to.have.property('updatedAt');
            expect(res.body.CREATED.fName).to.equal('Leo');
            expect(res.body.CREATED.lName).to.equal('Jim');
            expect(res.body.CREATED.gender).to.equal('M');
            expect(res.body.CREATED.age).to.equal(29);
            expect(res.body.CREATED.email).to.equal('leojim06@sample.com');
            done();
         });
      });
      it('Debe agregar un propietario - base de datos vacia', (done) => {
         Propietarios.collection.drop();
         chai.request(app).post(propietariosURL).send(propietarioTest).end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.have.property('CREATED');
            expect(res.body.CREATED).to.be.an('object');
            expect(res.body.CREATED).to.have.property('_id');
            expect(res.body.CREATED).to.have.property('__v');
            expect(res.body.CREATED).to.have.property('createdAt');
            expect(res.body.CREATED).to.have.property('updatedAt');
            expect(res.body.CREATED.fName).to.equal('Joe');
            expect(res.body.CREATED.lName).to.equal('Doe');
            expect(res.body.CREATED.gender).to.equal('M');
            expect(res.body.CREATED.age).to.equal(33);
            expect(res.body.CREATED.email).to.equal('sample@he.ll');
            done();
         });
      });
      it('No debe agregar propietario - faltan campos', (done) => {
         chai.request(app).post(propietariosURL).send({
            fName: 'Leo',
            lName: 'Jim',
         }).end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('ERROR');
            expect(res.body).to.have.property('MSG');
            expect(res.body.ERROR).to.be.a('string');
            expect(res.body.ERROR).to.equal('Error en su solicitud');
            done();
         });
      });
   });


   describe('/GET/:_id propietario', () => {
      it('Debe listar un propietario con id', (done) => {
         chai.request(app).get(propietariosURL).end((error, response) => {
            chai.request(app).get(`${propietariosURL}/${response.body.RESULT[0]._id}`)
               .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res).to.be.json;
                  expect(res.body).to.have.property('RESULT');
                  expect(res.body.RESULT).to.be.an('object');
                  expect(res.body.RESULT).to.have.property('_id');
                  expect(res.body.RESULT).to.have.property('__v');
                  expect(res.body.RESULT).to.have.property('createdAt');
                  expect(res.body.RESULT).to.have.property('updatedAt');
                  expect(res.body.RESULT.fName).to.equal('Joe');
                  expect(res.body.RESULT.lName).to.equal('Doe');
                  expect(res.body.RESULT.gender).to.equal('M');
                  expect(res.body.RESULT.age).to.equal(33);
                  expect(res.body.RESULT.email).to.equal('sample@he.ll');
                  expect(res.body.RESULT._id).to.equal(response.body.RESULT[0]._id);
                  done();
               });
         });
      });
      it('No debe listar un propietario - _id incorrecto', (done) => {
         chai.request(app).get(`${propietariosURL}/_id_sin_identificar`).end((err, res) => {
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
      it('No debe listar un propietario - _id manipulado', (done) => {
         chai.request(app).get(propietariosURL).end((error, response) => {
            let _idManipulado = response.body.RESULT[0]._id;
            _idManipulado = (1 + parseInt(_idManipulado.charAt(0))) +
               _idManipulado.substring(1, _idManipulado.length);
            chai.request(app).get(`${propietariosURL}/${_idManipulado}`)
               .end((err, res) => {
                  expect(res).to.have.status(404);
                  expect(res).to.be.json;
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('ERROR');
                  expect(res.body.ERROR).to.equal('Propietario no encontrado');
                  done();
               });
         });
      });
   });

   describe('/PUT/:_id propietarios', () => {
      it('Debe actualizar un propietario con id', (done) => {
         chai.request(app).get(propietariosURL).end((error, response) => {
            chai.request(app).put(`${propietariosURL}/${response.body.RESULT[0]._id}`)
               .send({ 'fName': 'Jane', 'gender': 'F' })
               .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res).to.be.json;
                  expect(res.body).to.have.property('UPDATED');
                  expect(res.body.UPDATED).to.be.an('object');
                  expect(res.body.UPDATED.fName).to.equal('Jane');
                  expect(res.body.UPDATED.gender).to.equal('F');
                  done();
               });
         });
      });
      it('No debe actualizar un propietario - _id incorrecto', (done) => {
         chai.request(app).put(`${propietariosURL}/_id_sin_identificar`)
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
      it('No debe actualizar un propietario - _id manipulado', (done) => {
         chai.request(app).get(propietariosURL).end((error, response) => {
            let _idManipulado = response.body.RESULT[0]._id;
            _idManipulado = (1 + parseInt(_idManipulado.charAt(0))) +
               _idManipulado.substring(1, _idManipulado.length);
            chai.request(app).put(`${propietariosURL}/${_idManipulado}`)
               .send({ fname: 'Name' })
               .end((err, res) => {
                  expect(res).to.have.status(404);
                  expect(res).to.be.json;
                  expect(res.body).to.be.an('object');
                  expect(res.body).to.have.property('ERROR');
                  expect(res.body.ERROR).to.equal('Propietario no encontrado - no se puede actualizar')
                  done();
               });
         });
      });
      it('No debe actualizar un propietario - campos incorrectos', (done) => {
         chai.request(app).get(propietariosURL).end((error, response) => {
            chai.request(app).put(`${propietariosURL}/${response.body.RESULT[0]._id}`)
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

   describe('/DELETE/:_id propietarios', () => {
      it('Debe borrar un propietario con id', (done) => {
         chai.request(app).get(propietariosURL).end((error, response) => {
            chai.request(app).del(`${propietariosURL}/${response.body.RESULT[0]._id}`)
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
      it('No debe eliminar un propietario - _id incorrecto', (done) => {
         chai.request(app).del(`${propietariosURL}/_id_sin_identificar`).end((err, res) => {
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
      it('No debe eliminar un propietario - _id manipulado', (done) => {
         chai.request(app).get(propietariosURL).end((error, response) => {
            let _idManipulado = response.body.RESULT[0]._id;
            _idManipulado = (1 + parseInt(_idManipulado.charAt(0))) +
               _idManipulado.substring(1, _idManipulado.length);
            chai.request(app).del(`${propietariosURL}/${_idManipulado}`).end((err, res) => {
               expect(res).to.have.status(404);
               expect(res).to.be.json;
               expect(res.body).to.be.an('object');
               expect(res.body).to.have.property('ERROR');
               expect(res.body.ERROR).to.equal('Propietario no encontrado - no se puede eliminar');
               done();
            });
         });
      });
   });
});