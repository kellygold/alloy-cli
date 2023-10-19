#!/usr/bin/env node

import fs from 'fs';
import { configure, listUsers, createUser, deleteUser, getUserById } from './api/users.js';
import { listIntegrations, getIntegrationById, installIntegration } from './api/integrations.js';
import { listWorkflows, configureWorkflow, runWorkflow, getWorkflowById, upgradeWorkflow } from './api/workflows.js';
import { listCredentials, deleteCredential } from './api/credentials.js';
import { listEvents, getByName as getEventByName } from './api/events.js';
import { displayHelp } from './help.js';

const CONFIG_FILE = 'alloy-cli-config.json';


const rawOutput = process.argv.includes('--raw') || process.argv.includes('-r');
const help = process.argv.includes('--help') || process.argv.includes('-h');



async function main() {
    const command = process.argv[2];
    const subCommand = process.argv[3];
    const thirdArg = process.argv[4];

    if (help) {
        displayHelp(command, subCommand);
        return;
    }

    if (command === 'init') {
        await configure();
        return;
    }

    let config;
    try {
        config = JSON.parse(fs.readFileSync(CONFIG_FILE));
    } catch (error) {
        console.error('Please run the init command first.');
        return;
    }

    switch (command) {
        case 'users':
            switch (subCommand) {
                case 'list':
                    await listUsers(config.apiKey, rawOutput);
                    break;
                case 'create':
                    await createUser(config.apiKey);
                    break;
                case 'delete':
                    await deleteUser(config.apiKey, thirdArg);
                    break;
                case 'get':
                    await getUserById(config.apiKey, thirdArg, rawOutput);
                    break;
            }
            break;

        case 'integrations':
            switch (subCommand) {
                case 'list':
                    await listIntegrations(config.apiKey, config.userId, rawOutput);
                    break;
                case 'install':
                    await installIntegration(config.apiKey, config.userId, thirdArg);
                    break;
                case 'get':
                    await getIntegrationById(config.apiKey, config.userId, thirdArg, rawOutput);
                    break;
            }
            break;
            case 'workflows':
                switch (subCommand) {
                    case 'list':
                        await listWorkflows(config.apiKey, config.userId, rawOutput);
                        break;
                    case 'config':
                        await configureWorkflow(thirdArg);
                        break;
                    case 'run':
                        await runWorkflow(config.apiKey, config.userId, thirdArg, {
                            event: process.argv[5],
                            data: process.argv[6]
                        });
                        break;
                    case 'get':
                        await getWorkflowById(config.apiKey,config.userId, thirdArg, rawOutput);
                        break;
                    case 'upgrade':
                        await upgradeWorkflow(config.apiKey, thirdArg);
                        break;
                }
                break;
        case 'credentials':
            switch (subCommand) {
                case 'list':
                    await listCredentials(config.apiKey, config.userId, thirdArg, rawOutput);
                    break;
                case 'delete':
                    await deleteCredential(config.apiKey, config.userId, thirdArg);
                    break;
            }
            break;

        case 'events':
            switch (subCommand) {
                case 'list':
                    await listEvents(config.apiKey, rawOutput);
                    break;
                case 'get':
                    await getEventByName(config.apiKey, thirdArg, rawOutput);
                    break;
            }
            break;

        default:
            console.log('Command not recognized.');
    }
}

main();
