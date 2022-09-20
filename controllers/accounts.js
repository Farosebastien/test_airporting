//importation des paquets axios et dotenv
const axios = require('axios').default;
require("dotenv").config();


exports.getAccounts = (authorization, itemId) => {
    /*préparation de la requête avec des variables d'environnement, 
    le token et l'id de l'item à récupérer*/
    const options = {
        method: 'GET',
        url: `https://api.bridgeapi.io/v2/accounts?item_id=${itemId}&limit=null`,
        headers: {
            accept: 'application/json',
            'Client-Id': process.env.CLIENT_ID,
            'Client-Secret': process.env.CLIENT_SECRET,
            Authorization: `Bearer ${authorization}`,
            'Bridge-Version': process.env.BRIDGE_VERSION
        }
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