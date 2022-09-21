//importation de axios et du controller
const auth = require("../controllers/auth");
const axios = require("axios");

//simulation de axios
jest.mock("axios");

//scénario de test pour auth
describe("auth", function () {

    //nettoyage du mock
    beforeEach(() => {
        axios.mockClear();
    });

    //fausse reponse
    const fakeResponse = {
        access_token: "fake_token",
        expires_at: "expiration_date",
        user: {
            uuid: "user_id",
            email: "user_email"
        }
    };

    //test de comparaison
    it ("should return user info", async () => {
        axios.request.mockResolvedValue({data: fakeResponse});
        expect(await auth.authUser()).toBe(fakeResponse);
    });
});