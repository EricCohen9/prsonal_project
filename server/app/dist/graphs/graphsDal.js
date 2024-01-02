var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { default as fetch } from 'node-fetch';
export const getAllGraphsDal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Replace 'YOUR_API_KEY' with your actual Polygon API key
        const apiKey = 'IAeKc9WcsMrjxRo9ygINaF6PbbBZDEc4';
        // Construct the API endpoint URL
        const apiUrl = 'https://api.polygon.io/v2/aggs/ticker/INTC/range/1/day/2023-01-07/2023-01-10?apiKey=' + apiKey;
        // Make the API call
        const response = yield fetch(apiUrl);
        // Check if the request was successful (status code 200)
        if (response.ok) {
            // Parse the JSON response
            const result = yield response.json();
            return result;
        }
        else {
            // Handle non-successful response
            console.error('Error fetching data from Polygon API:', response.status, response.statusText);
            return null;
        }
    }
    catch (error) {
        // Handle general errors
        return null;
    }
});
//# sourceMappingURL=graphsDal.js.map