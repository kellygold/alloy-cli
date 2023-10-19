// credentials.js
import axios from 'axios';
import { formatCredentials, formatDeleteCredential } from '../format.js';

const BASE_URL = 'https://embedded.runalloy.com/2023-06';
const CONFIG_FILE = 'alloy-cli-config.json';

async function listCredentials(apiKey, userId, rawOutput) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}/credentials`, {
            headers: { Authorization: `bearer ${apiKey}` }
        });
        rawOutput ? console.log(JSON.stringify(response.data)) : response.data.data.forEach(formatCredentials);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}
async function deleteCredential(apiKey, userId, credentialId) {
    try {
        const response = await axios.delete(`${BASE_URL}/users/${userId}/credentials/${credentialId}`, {
            headers: { Authorization: `bearer ${apiKey}` }
        });
        // Formatting the delete response here
        formatDeleteCredential(response.data);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}


export { listCredentials, deleteCredential };