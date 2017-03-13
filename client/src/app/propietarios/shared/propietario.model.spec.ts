import { Propietario } from './propietario.model';

describe('Propietario', () => {
  it('should create an instance', () => {
    expect(new Propietario()).toBeTruthy();
  });

  it('Debe haceptar valores en el constructor', () => {
    let propietario = new Propietario({
      fName: 'Jhon',
      lName: 'Doe',
      gender: 'M',
      age: 33,
      email: 'sample@he.ll',
      fincas: ['1']
    });
    expect(propietario.fName).toEqual('Jhon');
  });
});