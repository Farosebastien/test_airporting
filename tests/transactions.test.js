//importation de axios et du controller
const transactions = require("../controllers/transactions");
const axios = require("axios");

//simulation de axios
jest.mock("axios");

//scénario de test pour transactions
describe("transactions", function () {

    //nettoyage du mock
    beforeEach(() => {
        axios.mockClear();
    });

    //fausse reponse
    const fakeResponse = [
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

    //test de comparaison
    it ("should return transactions info", async () => {
        axios.request.mockResolvedValue({data: fakeResponse});
        expect(await transactions.getTransactions()).toBe(fakeResponse);
    });
});