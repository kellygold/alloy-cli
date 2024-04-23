// api/logs.js
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const CONFIG_FILE = 'alloy-cli-config.json';

async function fetchUntilEmpty(url, headers) {
    let results = [];
    let page = 0;
    let hasMoreData = true;

    while (hasMoreData) {
        const requestUrl = `${url}&page=${page}`;
        console.log(`Requesting: ${requestUrl}`);
        try {
            const response = await axios.get(requestUrl, { headers });
            if (response.data.data.length > 0) {
                console.log(`Page ${page}: Found ${response.data.data.length} items`);
                results = results.concat(response.data.data);
                page++;
            } else {
                console.log(`Page ${page}: No more data`);
                hasMoreData = false;
            }
        } catch (error) {
            console.error(`Request failed: ${requestUrl}`, error.response ? error.response.status : error.message);
            throw error; // Stop execution and surface the error
        }
    }
    return results;
}


async function listIntegrations(apiKey) {
    const headers = { Authorization: `Bearer ${apiKey}` };
    const url = `https://embedded.runalloy.com/2023-12/integrations`;
    return await fetchUntilEmpty(url, headers);
}

async function getWorkflowIdsForIntegration(apiKey, integrationId) {
    const integrations = await listIntegrations(apiKey);
    const integration = integrations.find(int => int.integrationId === integrationId);
    return integration ? integration.workflows.map(workflow => workflow.workflowId) : [];
}

async function getUsersForWorkflows(apiKey, workflowIds) {
    const headers = { Authorization: `Bearer ${apiKey}` };
    let users = [];

    for (const workflowId of workflowIds) {
        const url = `https://embedded.runalloy.com/2023-12/workflows/${workflowId}/users`;
        const workflowUsers = await fetchUntilEmpty(url, headers);
        users = [...users, ...workflowUsers.map(user => ({ ...user, workflowId }))];
    }

    return users;
}

async function getLogsForUserAndWorkflow(apiKey, userId, workflowId) {
    const headers = { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' };
    const url = `https://embedded.runalloy.com/2023-12/workflows/${workflowId}/logs?userId=${userId}`;
    console.log(url)
    const response = await fetchUntilEmpty(url, headers);
    return response
}

async function listLogs(apiKey, options, rawOutput) {
    const { workflowId, userId } = options;

    if (!workflowId || !userId) {
        console.error('Both --workflowId and --userId are required unless --allLogs is specified.');
        return;
    }

    console.log(`Fetching logs for User ID: ${userId} andWorkflow ID: ${workflowId}`);
    const logs = await getLogsForUserAndWorkflow(apiKey, userId, workflowId);
    if (logs.length > 0) {
        console.log(`Logs found for User ID: ${userId} and Workflow ID: ${workflowId}`);
    } else {
        console.log(`No logs found for User ID: ${userId} and Workflow ID: ${workflowId}`);
    }

    if (rawOutput) {
        console.log(JSON.stringify(logs, null, 2));
    } else {
        // Format and print logs in a more readable format if needed
        logs.forEach(log => {
            console.log(`Log ID: ${log.executionId}, Error: ${log.error}, Finished: ${log.finished}`);
        });
    }
}

export { listLogs };