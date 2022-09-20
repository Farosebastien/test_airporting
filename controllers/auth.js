//importation des paquets axios et dotenv
const axios = require("axios").default;
require("dotenv").config();

exports.authUser = () => {
    //préparation de la requête avec des variables d'environnement et le token
    const options = {
        method: 'POST',
        url: 'https://api.bridgeapi.io/v2/authenticate',
        headers: {
            accept: 'application/json',
            'Client-Id': process.env.CLIENT_ID,
            'Client-Secret': process.env.CLIENT_SECRET,
            'Bridge-Version': process.env.BRIDGE_VERSION,
            'content-type': 'application/json'
        },
        data: {email: process.env.EMAIL, password: process.env.PASSWORD}
    };

    //requête axios dans une promesse pour l'asynchrone
    return new Promise ((resolve, reject) => {
        try {
            axios
            .request(options)
            //promesse résolue
            .then(function (response) {
                //retour des informations
                resolve(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });
        //promesse echouée
        } catch(err) {
            reject(err)
        }
    });
}