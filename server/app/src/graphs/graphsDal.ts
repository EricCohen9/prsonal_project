import pool from "../PostgreSQL/PostgreSQL.js";
import { UserInterface } from "../interfaces/userInterface.js";
import { comparePassword } from "../bycrypt/bycrypt.js";
import db from "../PostgreSQL/PostgreSQL.js";
// import { default as fetch } from 'node-fetch';

export const getAllGraphsDal = async () => {
  try {
    // Replace 'YOUR_API_KEY' with your actual Polygon API key
    const apiKey = 'IAeKc9WcsMrjxRo9ygINaF6PbbBZDEc4';

    // Construct the API endpoint URL
    const apiUrl = 'https://api.polygon.io/v2/aggs/ticker/INTC/range/1/day/2023-01-07/2023-01-10?apiKey=' + apiKey;

    // Make the API call
    const response = await fetch(apiUrl);

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Parse the JSON response
      const result = await response.json();
      return result;
    } else {
      // Handle non-successful response
      console.error('Error fetching data from Polygon API:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    // Handle general errors
   
    return null;
  }
};
