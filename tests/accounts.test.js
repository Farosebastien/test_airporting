//importation de axios et du controller
const accounts = require("../controllers/accounts");
const axios = require("axios");

//simulation de axios
jest.mock("axios");

//scénario de test pour accounts
describe("accounts", function () {

    //nettoyage du mock
    beforeEach(() => {
        axios.mockClear();
    });

    //faux paramètre itemId
    const fakeItemId = 123;

    //fausse réponse
    const fakeResponse = [
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

    //test de comparaison
    it ("should return accounts info", async () => {
        axios.request.mockResolvedValue({data: fakeResponse});
        expect(await accounts.getAccounts(fakeItemId)).toBe(fakeResponse);
    });
});