import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import CargoService from '../../services/CargoService.js';
import { crearCargoRequestBody, crearCargoResponse } from '../PactResponses.js';
const { like } = MatchersV3;
describe('El API de Cargos', () => {

    let itemService;
    const provider = new PactV3({
        consumer: 'react-cargo',
        provider: 'cargo-service'
    });

    describe('crear cargo', () => {
        it('retorna un id de cargo ya creado', () => {
            //Arrange
            provider.given('crear cargo')
                .uponReceiving('una solicitud para crear un Cargo')
                .withRequest({
                    method: 'POST',
                    path: '/api/cargo/registro',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: crearCargoRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearCargoResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                const cargoService = new CargoService(mockServer.url);
                return cargoService.crearCargo(crearCargoRequestBody.Descripcion).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearCargoResponse);
                });
            });

        });
    });


});