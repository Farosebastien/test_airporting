//importation du paquet file-system
const fs = require("fs")

//importation des controllers
const auth = require("./controllers/auth");
const items = require("./controllers/items");
const accounts = require("./controllers/accounts");
const transactions = require("./controllers/transactions");

//fonction de récupération et de traitement des données
const getInfo = async() => {
    //récupération des informations d'authentification de l'utilisateur
    const authInfo = await auth.authUser();
    /*création de l'objet qui contiendra toutes les informations et 
    stockage des informations déjà récupérées*/
    const userInfos = {
        access_token: {
            value: authInfo.access_token,
            expires_at: authInfo.expires_at
        },
        items: [],
        transactions: []
    };
    //récupération des informations concernant les items avec passage du token en paramètre
    const itemsInfo = await items.getItems(authInfo.access_token);
    //boucle qui itère sur chaque item
    for(let i = 0; i<itemsInfo.resources.length; i++) {
        //pour chaque item, stockage des informations dans un objet
        const item = {
            id: itemsInfo.resources[i].id,
            status: itemsInfo.resources[i].status,
            status_code_info: itemsInfo.resources[i].status_code_info,
            status_code_description: itemsInfo.resources[i].status_code_description,
            bank_id: itemsInfo.resources[i].bank_id,
            accounts: []
        };
        //stockage de chaque item dans le tableau items dans l'objet des informations générales
        userInfos.items.push(item);
        /*pour chaque item, récupération des données des accounts lui 
        correspondant avec passage de l'id de l'item en paramètre*/
        const accountsList = await accounts.getAccounts(authInfo.access_token, itemsInfo.resources[i].id);
        //boucle qui itère sur chaque account
        for(let j = 0; j<accountsList.resources.length; j++) {
            //pour chaque account, stockage des informations dans un objet
            const account = {
                id: accountsList.resources[j].id,
                name: accountsList.resources[j].name,
                balance: accountsList.resources[j].balance,
                status: accountsList.resources[j].status,
                status_code_info: accountsList.resources[j].status_code_info,
                status_code_description: accountsList.resources[j].status_code_description,
                updated_at: accountsList.resources[j].updated_at,
                type: accountsList.resources[j].type,
                currency_code: accountsList.resources[j].currency_code,
                iban: accountsList.resources[j].iban
            };
            //stockage de chaque account dans le tableau items dans l'objet des informations générales
            userInfos.items[i].accounts.push(account);
        }
    }
    //récupération des informations des transactions
    const transactionsList = await transactions.getTransactions(authInfo.access_token);
    for(let i = 0; i<transactionsList.resources.length; i++) {
        /*boucle qui pour chaque transaction stocke les informations 
        dans l'objet des informations générales*/
        userInfos.transactions.push(transactionsList.resources[i]);
    }
    //transformation de l'objet userInfos en JSON et écriture dans le fichier userInfos.json
    fs.writeFileSync("./userInfos.json", JSON.stringify(userInfos, null, 2));
}

//appel de la fonction principale
getInfo();