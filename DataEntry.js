require('dotenv').config(); 
const axios = require('axios');

// API URL of the server
const API_URL = process.env.API_URL;
// Function to generate keys for a new user
async function generateKeys() {
  try {
    const response = await axios.post(`${API_URL}/generate-keys`, {
        "publicKey": "0x1234567890abcdef1234564567890abcdef1234567890abcef",
        "privateKey": "0xabcdefabcdefabcdefabcdefabcfabcdefabcdefbcdef"
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error generating keys:', error.response ? error.response.data : error.message);
  }
}

generateKeys();

// Function to delete keys for a user
async function deleteKeys(privateKey) {
  try {
    const response = await axios.delete(`${API_URL}/delete-keys`, { data: { privateKey } });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error deleting keys:', error.response ? error.response.data : error.message);
  }
}

// deleteKeys("0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef");

// Function to fetch private key
async function fetchPrivateKey(publicKey) {
  try {
    const response = await axios.post(`${API_URL}/fetch-private-key`, { publicKey });
    console.log('Private Key:', response.data.privateKey);
  } catch (error) {
    console.error('Error fetching private key:', error.response ? error.response.data : error.message);
  }
}

// // Example of calling the functions
// generateKeys('user@example.com');
// deleteKeys('user@example.com');
// fetchPrivateKey('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcef');
