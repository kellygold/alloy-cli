// integration.js
import axios from 'axios';
import { spawn } from 'child_process';
import { formatIntegration } from '../format.js';

import { fileURLToPath } from 'url';
import path from 'path';

const BASE_URL = 'https://embedded.runalloy.com/2023-12';
const CONFIG_FILE = 'alloy-cli-config.json';

async function listIntegrations(apiKey, userId, rawOutput) {
    const response = await axios.get(`${BASE_URL}/integrations`, {
        headers: { Authorization: `bearer ${apiKey}` },
        params: { userId: userId }
    });

    rawOutput ? console.log(JSON.stringify(response.data)) : response.data.data.forEach(integration => formatIntegration(integration, false));
}

async function getIntegrationById(apiKey, userId, integrationId, rawOutput) {
    try {
        const response = await axios.get(`${BASE_URL}/integrations/${integrationId}`, {
            headers: { Authorization: `bearer ${apiKey}` },
            params: { userId: userId}
        });
        rawOutput ? console.log(JSON.stringify(response.data)) : formatIntegration(response.data.data, true);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}
async function installIntegration(apiKey, userId, integrationId) {
    console.log(integrationId)
    const response = await axios.get(`${BASE_URL}/users/${userId}/integrations/${integrationId}/install-url`, {
        headers: { Authorization: `bearer ${apiKey}` }
    });
    openUrlInBrowser(response.data.url);
}
function openUrlInBrowser(url) {
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const browserPath = path.join(currentDir, 'electron-browser.cjs');
    
    spawn('electron', [browserPath, url], {
        stdio: 'inherit',
        detached: true
    }).unref();
}

export { listIntegrations, installIntegration, getIntegrationById };