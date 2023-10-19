import axios from 'axios';
import fs from 'fs';
import inquirer from 'inquirer';
import { formatWorkflow } from '../format.js';



const BASE_URL = 'https://embedded.runalloy.com/2023-06';
const CONFIG_FILE = 'alloy-cli-config.json';

async function configureWorkflow(workflowId) {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE));

    const answers = await inquirer.prompt([
        { type: 'input', name: 'userId', message: 'Enter user ID:', default: config.userId },
        { type: 'input', name: 'event', message: 'Enter event name:' },
        { type: 'input', name: 'data', message: 'Enter JSON data:' }
    ]);

    config.workflows = config.workflows || {};
    config.workflows[workflowId] = answers;

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config));
    console.log('Workflow configuration saved.');
}

async function runWorkflow(apiKey, userId, workflowId) {
    let config;
    try {
        config = JSON.parse(fs.readFileSync(CONFIG_FILE));
    } catch (error) {
        console.error('Error reading configuration file.');
        return;
    }

    const workflowConfig = config.workflows[workflowId];
    if (!workflowConfig) {
        console.error('Workflow configuration not found.');
        return;
    }

    try {
        const eventData = JSON.parse(workflowConfig.data);
        const response = await axios.post(`${BASE_URL}/run/event`, {
            event: workflowConfig.event,
            userId: workflowConfig.userId,
            data: eventData
        }, {
            headers: { Authorization: `bearer ${apiKey}` }
        });

        console.log(response.data.message);
    } catch (error) {
        console.error('An error occurred while running the workflow:', error.message);
    }
}
async function getWorkflowById(apiKey, userId, workflowId, rawOutput) {
    try {
        const response = await axios.get(`${BASE_URL}/workflows/${workflowId}`, {
            headers: { Authorization: `bearer ${apiKey}` },
            params: { userId: userId }
        });
        rawOutput ? console.log(JSON.stringify(response.data)) : formatWorkflow(response.data.data, true);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

async function listWorkflows(apiKey, userId, rawOutput) {
    try {
        const response = await axios.get(`${BASE_URL}/workflows/`, {
            headers: { Authorization: `bearer ${apiKey}` },
            params: { userId: userId }
        });

        rawOutput 
            ? console.log(JSON.stringify(response.data)) 
            : response.data.data.forEach(workflow => formatWorkflow(workflow));
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}


async function upgradeWorkflow(apiKey, userId, workflowId) {
    try {
        const response = await axios.put(`${BASE_URL}/workflows/${workflowId}/upgrade`, null, {
            headers: { Authorization: `bearer ${apiKey}` },
            params: { userId: userId }
        });
        console.log(response.data.upgraded ? 'Workflow upgraded successfully.' : 'Upgrade failed.');
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

export { listWorkflows, configureWorkflow, runWorkflow, getWorkflowById, upgradeWorkflow };
