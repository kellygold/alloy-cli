// user.js
import axios from 'axios';
import fs from 'fs';
import inquirer from 'inquirer';
import { formatIntegration, formatUser, formatUserList } from '../format.js';
import path from 'path';
import url from 'url';
import chalk from 'chalk';



const BASE_URL = 'https://embedded.runalloy.com/2023-06';
const CONFIG_FILE = 'alloy-cli-config.json';


async function configure() {
    let config = {};
    const answers = await inquirer.prompt([
        { type: 'input', name: 'apiKey', message: 'Enter your Alloy API key:' }
    ]);

    config.apiKey = answers.apiKey;

    try {
        const response = await axios.get(`${BASE_URL}/one/users/alloy-cli-user@example.com`, {
            headers: { Authorization: `bearer ${answers.apiKey}` }
        });
        config.userId = response.data.userId;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            const response = await axios.post(`${BASE_URL}/one/users`, {
                fullName: "cli user",
                username: "alloy-cli-user@example.com"
            }, {
                headers: { Authorization: `bearer ${answers.apiKey}` }
            });
            config.userId = response.data.userId;
        } else {
            console.error('An error occurred:', error.message);
            return;
        }
    }

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config));
    console.log(chalk.green("\n🚀 Configuration saved successfully!"));

    // Guide to add CLI to PATH using npm link
    console.log(chalk.cyan("\n🔧 To use 'alloy' globally:"));
    console.log(chalk.yellow("1. Run the following command to create a symlink:"));
    console.log(chalk.white("   npm link"));
}

async function listUsers(apiKey, rawOutput) {
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: { Authorization: `bearer ${apiKey}` }
        });
        rawOutput ? console.log(JSON.stringify(response.data)) : formatUserList(response.data);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

async function createUser(apiKey) {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'username', message: 'Enter username:' },
        { type: 'input', name: 'fullName', message: 'Enter full name (optional):' }
    ]);

    try {
        await axios.post(`${BASE_URL}/users/`, answers, {
            headers: {
                Authorization: `bearer ${apiKey}`,
                'content-type': 'application/json'
            }
        });
        console.log('User created successfully.');
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

async function deleteUser(apiKey, userId) {
    try {
        await axios.delete(`${BASE_URL}/users/${userId}`, {
            headers: { Authorization: `bearer ${apiKey}` }
        });
        console.log('User deleted successfully.');
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}
async function getUserById(apiKey, userId, rawOutput) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`, {
            headers: { Authorization: `bearer ${apiKey}` }
        });
        rawOutput ? console.log(JSON.stringify(response.data)) : formatUser(response.data);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

export { configure, listUsers, createUser, deleteUser, getUserById}