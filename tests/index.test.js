//simulation de l'implémentation de getInfo sans les appels aux controllers
function MockedGetinfo()  {
    //simulation du retour de l'appel à auth.js
    const mockedAuthInfo = {
        access_token: "fake_token",
        expires_at: "expiration_date",
        user: {
            uuid: "user_id",
            email: "user_email"
        }
    };
    //préparation du resultat mocké de getinfo
    const fakeUserInfos = {
        access_token: {
            value: mockedAuthInfo.access_token,
            expires_at: mockedAuthInfo.expires_at
        },
        items: [],
        transactions: []
    };
    //simulation du retour de l'appel à items.js
    const mockedItemsInfo = [
        {
            id: 22,
            status: 0,
            status_code_info: null,
            status_code_description: null,
            bank_id: "bank_id"
        }
    ];
    //boucle qui itère sur chaque item
    for(let i = 0; i<mockedItemsInfo.length; i++) {
        //pour chaque item, stockage des informations dans un objet mocké
        const mockedItem = {
            id: mockedItemsInfo[i].id,
            status: mockedItemsInfo[i].status,
            status_code_info: mockedItemsInfo[i].status_code_info,
            status_code_description: mockedItemsInfo[i].status_code_description,
            bank_id: mockedItemsInfo[i].bank_id,
            accounts: []
        };
        //stockage de chaque item mocké dans le tableau items dans l'objet des informations générales mockées
        fakeUserInfos.items.push(mockedItem);
        //simulation du retour de accounts.js pour chaque item mocké
        const mockedAccountsList = [
            {
              id: "account_id",
              name: "Compte Crédit Immobilier",
              balance: 140200,
              status: 0
            },
            {
              id: "account_id",
              name: "Compte Titres",
              balance: 8700,
              status: 0
            }
        ];
        //boucle qui itère sur chaque account
        for(let j = 0; j<mockedAccountsList.length; j++) {
            //pour chaque account, stockage des informations dans un objet
            const mockedAccount = {
                id: mockedAccountsList[j].id,
                name: mockedAccountsList[j].name,
                balance: mockedAccountsList[j].balance,
                status: mockedAccountsList[j].status
            };
            //stockage de chaque account mocké dans le tableau items dans l'objet des informations générales
            fakeUserInfos.items[i].accounts.push(mockedAccount);
        }
    }
    //simulation du retour de transactions.js
    const mockedTransactionsList = [
        {
            id: "transaction_id",
            clean_description: "Achat De Titres",
            bank_description: "ACHAT DE TITRES - 260422",
            amount: -1693,
            date: "2022-04-26"
        },
        {
            id: "transaction_id",
            clean_description: "Achat De Titres",
            bank_description: "ACHAT DE TITRES - 260422",
            amount: -1693,
            date: "2022-04-26"
        }
    ];
    for(let i = 0; i<mockedTransactionsList.length; i++) {
        /*boucle qui pour chaque transaction mockée stocke les informations 
        dans l'objet des informations générales*/
        fakeUserInfos.transactions.push(mockedTransactionsList[i]);
    }

    return fakeUserInfos;
}

//préparation de la réponse attendue pour la comparaison avec le retour de mockedGetInfo()
const fakeResponse = {
    access_token: {
        value: "fake_token",
        expires_at: "expiration_date"
    },
    items: [
        {
            id: 22,
            status: 0,
            status_code_info: null,
            status_code_description: null,
            bank_id: "bank_id",
            accounts: [
                {
                    id: "account_id",
                    name: "Compte Crédit Immobilier",
                    balance: 140200,
                    status: 0
                  },
                  {
                    id: "account_id",
                    name: "Compte Titres",
                    balance: 8700,
                    status: 0
                  }
            ]
        }
    ],
    transactions: [
        {
            id: "transaction_id",
            clean_description: "Achat De Titres",
            bank_description: "ACHAT DE TITRES - 260422",
            amount: -1693,
            date: "2022-04-26"
        },
        {
            id: "transaction_id",
            clean_description: "Achat De Titres",
            bank_description: "ACHAT DE TITRES - 260422",
            amount: -1693,
            date: "2022-04-26"
        }
    ]
};

//test de comparaison entre le retour de mockedGetInfos et fakeResponse
it ("should return an object with infos", () => {
    expect(MockedGetinfo()).toStrictEqual(fakeResponse);
});