import chalk from 'chalk';


function formatIntegration(integration, displayBlocks = false) {
    const colors = [chalk.blue, chalk.magenta]; // Define two colors to alternate between
    
    console.log(chalk.bold.blue(`Integration ID: ${integration.integrationId}`));
    console.log(chalk.bold.cyan(`App: ${integration.app}`));
    console.log(chalk.bold(`Installed: ${integration.installed ? chalk.green('Yes') : chalk.red('No')}`));
    console.log(chalk.bold('Workflows:'));
    
    integration.workflows.forEach((workflow, index, array) => {
        const isLastWorkflow = index === array.length - 1;
        console.log(`${isLastWorkflow ? '└──' : '├──'} ${chalk.green(`Name: ${workflow.name}`)}`);
        console.log(`    ${isLastWorkflow ? ' ' : '|'}   ├── Installed: ${workflow.installed ? chalk.green('Yes') : chalk.red('No')}`);
        console.log(`    ${isLastWorkflow ? ' ' : '|'}   ├── Active: ${workflow.active ? chalk.green('Yes') : chalk.red('No')}`);
        console.log(`    ${isLastWorkflow ? ' ' : '|'}   └── Version: ${workflow.version}`);
        
        if (displayBlocks) {
            console.log(`    ${isLastWorkflow ? ' ' : '|'}       Blocks:`);
            workflow.blocks.forEach((block, bIndex, bArray) => {
                const color = colors[bIndex % colors.length]; // Alternate between colors
                console.log(`    ${isLastWorkflow ? ' ' : '|'}       ├── ${color(`Name: ${block.name}`)}`);
                console.log(`    ${isLastWorkflow ? ' ' : '|'}       └── ${color(`Type: ${block.type}`)}`);
            });
        }
    });
    console.log('\n'); // Adding a newline for better separation between integrations
}

function formatWorkflow(workflow, displayBlocks = false) {
    console.log(chalk.bold.green(`Workflow ID: ${workflow.workflowId}`));
    console.log(chalk.bold.cyan(`Name: ${workflow.name}`));
    console.log(chalk.bold(`Installed: ${workflow.installed ? chalk.green('Yes') : chalk.red('No')}`));
    
    // Only display the version if the workflow is installed
    if (workflow.installed) {
        console.log(chalk.bold(`Version: ${workflow.installedVersion}`));
    }
    
    if (displayBlocks && workflow.blocks) {
        console.log(chalk.bold('Blocks:'));
        workflow.blocks.forEach((block, index, array) => {
            const isLastBlock = index === array.length - 1;
            console.log(`${isLastBlock ? '└──' : '├──'} ${chalk.green(`Name: ${block.name}`)}`);
            console.log(`    ${isLastBlock ? ' ' : '|'}   └── Type: ${block.type}`);
        });
    }
    console.log('\n'); // Adding a newline for better separation between workflows
}

function formatCredentials(credential) {
    console.log(chalk.bold.blue(`Credential ID: ${credential.credentialId}`));
    console.log(chalk.bold.cyan(`Type: ${credential.type}`));
    console.log(chalk.bold(`Created At: ${new Date(credential.createdAt).toLocaleString()}`));
    console.log(chalk.bold(`Updated At: ${new Date(credential.updatedAt).toLocaleString()}`));
    console.log('\n'); // Adding a newline for better separation between credentials
}
function formatDeleteCredential(response) {
    if (response.success) {
        console.log(chalk.bold.green('Credential deleted successfully.'));
    } else {
        console.log(chalk.bold.red('Failed to delete credential.'));
    }
}

function formatEventList(event) {
    console.log(chalk.bold.green(`Name: ${event.name}`));
    console.log(`Description: ${event.description}`);
    console.log('\n'); // Adding a newline for better separation between events
}

function formatEventByName(event) {
    if (event) {
        console.log(chalk.bold.green(`Name: ${event.name}`));
        console.log(`Description: ${event.description}`);
        console.log(`Body: ${JSON.stringify(event.body, null, 2)}`);
    } else {
        console.log(chalk.red('Event not found.'));
    }
    console.log('\n'); // Adding a newline for better separation
}
function formatUserList(users, rawOutput) {
console.log(chalk.bold('Users:'));
    users.data.forEach((user, index, array) => {
        const isLastUser = index === array.length - 1;
        console.log(`${isLastUser ? '└──' : '├──'} ${chalk.green(user.username)}`);
        console.log(`    ${isLastUser ? ' ' : '|'}   ├── User ID: ${user.userId}`);
        if (user.username) {
            console.log(`    ${isLastUser ? ' ' : '|'}   ├── Full Name: ${user.fullName}`);
        }
    });
    console.log('\n'); // Adding a newline for better separation between users
}

function formatUser(user) {
    console.log(chalk.bold.green(`User ID: ${user.userId}`));
    console.log(chalk.bold.cyan(`Full Name: ${user.fullName}`));
    if (user.username) {
        console.log(chalk.bold(`Username: ${user.username}`));
    }
    console.log('\n'); // Adding a newline for better separation
}


export { formatIntegration, formatWorkflow, formatCredentials, formatDeleteCredential, formatEventList, formatEventByName, formatUserList, formatUser };