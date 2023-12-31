import axios from "axios"
export default class TripulanteService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    crearTripulante = (Nombre, Apellido, EmailAddress,Estado,Tipo ,HorasVuelo,NroMillas,KeyCargo) => {

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/tripulante/registro', {
                Nombre,
                Apellido,
                EmailAddress,
                Estado,
                Tipo ,
                HorasVuelo,
                NroMillas,
                KeyCargo
            },{
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }

}