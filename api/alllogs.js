// api/logs.js
import axios from 'axios';
import { formatLogEntry } from '../format.js';

async function fetchAllIntegrations(apiKey, userId) {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    accept: 'application/json',
  };
  const url = `https://embedded.runalloy.com/2023-12/integrations?userId=${userId}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch integrations for user ${userId}: ${error}`);
    return [];
  }
}

async function fetchUsersForWorkflow(apiKey, workflowId, rawOutput = false) {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    accept: 'application/json',
  };
  const url = `https://embedded.runalloy.com/2023-12/workflows/${workflowId}/users/`;
  try {
    const response = await axios.get(url, { headers });
    return response.data.data;
  } catch (error) {
    // Log a user-friendly message or the error based on the response status
    if (error.response) {
      const message = error.response.status === 404
        ? `No users have installed workflow ${workflowId}.`
        : `Failed to fetch users for workflow ${workflowId}: ${error.message}`;
      console.log(message);
    } else {
      // Log the error message if there's no response (network error, etc.)
      console.log(`Error fetching users for workflow ${workflowId}: ${error.message}`);
    }
    // Return an empty array to allow the process to continue
    return [];
  }
}



async function fetchLogsForUserAndWorkflow(apiKey, userId, workflowId) {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    accept: 'application/json',
  };
  const url = `https://embedded.runalloy.com/2023-12/workflows/${workflowId}/logs?userId=${userId}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch logs for user ${userId} and workflow ${workflowId}: ${error}`);
    return [];
  }
}

async function listAllLogs(apiKey, userId, rawOutput) {
  const integrations = await fetchAllIntegrations(apiKey, userId);
  for (const integration of integrations) {
      for (const workflow of integration.workflows) {
          const users = await fetchUsersForWorkflow(apiKey, workflow.workflowId);
          for (const user of users) {
              const logs = await fetchLogsForUserAndWorkflow(apiKey, user.userId, workflow.workflowId);
              if (rawOutput) {
                  console.log(JSON.stringify({ userId: user.userId, workflowId: workflow.workflowId, logs: logs }, null, 2));
              } else {
                  if (logs.length > 0) {
                      logs.forEach(log => formatLogEntry(log, user.userId, workflow.workflowId));
                  } else {
                      console.log(`No logs found for User ID: ${user.userId} and Workflow ID: ${workflow.workflowId}.`);
                  }
              }
          }
      }
  }
}

export { listAllLogs };
