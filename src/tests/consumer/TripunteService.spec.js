import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import TripunteService from '../../services/TripunteService.js';
import { crearTripulanteRequestBody, crearTripulanteResponse, responseItemSearch, textoBusqueda } from '../PactResponses.js';
const { like } = MatchersV3;
describe('El API de Tripulantes', () => {

    let itemService;
    const provider = new PactV3({
        consumer: 'react-tripulante',
        provider: 'tripulante-service'
    });

    describe('crear tripulante', () => {
        it('retorna un id de tripulante ya creado', () => {
            //Arrange
            provider.given('crear tripulante')
                .uponReceiving('una solicitud para crear un Tripulante')
                .withRequest({
                    method: 'POST',
                    path: '/api/tripulante/registro',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: crearTripulanteRequestBody
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearTripulanteResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                const tripunteService = new TripunteService(mockServer.url);
                return tripunteService.crearTripulante(crearTripulanteRequestBody.Nombre, crearTripulanteRequestBody.Apellido, crearTripulanteRequestBody.EmailAddress, crearTripulanteRequestBody.Estado, crearTripulanteRequestBody.Tipo, crearTripulanteRequestBody.HorasVuelo, crearTripulanteRequestBody.NroMillas, crearTripulanteRequestBody.KeyCargo).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).equal(crearTripulanteResponse);
                });
            });

        });
    });


});