//importation de axios et du controller
const items = require("../controllers/items");
const axios = require("axios");

//simulation de axios
jest.mock("axios");

//scénario de test pour items
describe("items", function () {

    //nettoyage du mock
    beforeEach(() => {
        axios.mockClear();
    });

    //fausse reponse
    const fakeResponse = {
        id: 22,
        status: 0,
        status_code_info: null,
        status_code_description: null,
        bank_id: "bank_id"
    };

    //test de comparaison
    it ("should return item info", async () => {
        axios.request.mockResolvedValue({data: fakeResponse});
        expect(await items.getItems()).toBe(fakeResponse);
    });
});