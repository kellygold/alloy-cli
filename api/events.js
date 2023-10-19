// events.js
import axios from 'axios';
import { formatEventList, formatEventByName } from '../format.js';

const BASE_URL = 'https://embedded.runalloy.com/2023-06';


async function listEvents(apiKey, rawOutput) {
    try {
        const response = await axios.get(`${BASE_URL}/events`, {
            headers: { Authorization: `bearer ${apiKey}` }
        });
        rawOutput ? console.log(JSON.stringify(response.data)) : response.data.data.forEach(formatEventList);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

async function getByName(apiKey, eventName, rawOutput) {
    try {
        const response = await axios.get(`${BASE_URL}/events`, {
            headers: { Authorization: `bearer ${apiKey}` }
        });
        const event = response.data.data.find(e => e.name === eventName);
        rawOutput ? console.log(JSON.stringify(event)) : formatEventByName(event);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

export { listEvents, getByName }