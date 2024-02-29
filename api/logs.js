// api/logs.js
import axios from 'axios';
import moment from 'moment'; // Ensure moment is installed
import { formatLogEntry } from '../format.js';


const CONFIG_FILE = 'alloy-cli-config.json';

async function fetchUntilEmpty(url, headers) {
    let results = [];
    let page = 0;
    let hasMoreData = true;

    while (hasMoreData) {
        const response = await axios.get(`${url}&page=${page}`, { headers });
        if (response.data.data.length > 0) {
            results = results.concat(response.data.data);
            page++;
        } else {
            hasMoreData = false;
        }
    }
    return results;
}

async function getLogsForUserAndWorkflow(apiKey, userId, workflowId) {
    const headers = { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' };
    const url = `https://embedded.runalloy.com/2023-12/workflows/${workflowId}/logs?userId=${userId}`;
    return await fetchUntilEmpty(url, headers);
}

async function listLogs(apiKey, options, rawOutput) {
    const { workflowId, userId } = options;

    if (!workflowId || !userId) {
        console.error('Both --workflowId and --userId are required.');
        return;
    }

    const logs = await getLogsForUserAndWorkflow(apiKey, userId, workflowId);
    if (logs.length > 0) {
        if (rawOutput) {
            console.log(JSON.stringify(logs, null, 2));
        } else {
            logs.forEach(log => formatLogEntry(log, userId, workflowId));
        }
    } else {
        console.log(`No logs found for User ID: ${userId} and Workflow ID: ${workflowId}.`);
    }
}


export { listLogs };
