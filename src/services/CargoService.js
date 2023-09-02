import axios from "axios"
export default class CargoService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    crearCargo = (Descripcion) => {

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/api/cargo/registro', {
                Descripcion
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