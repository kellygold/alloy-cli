function displayHelp(command, subCommand) {
    const baseHelp = `
        Usage: ./alloy.js [COMMAND] [SUBCOMMAND] [OPTIONS]
        
        Commands:
            init                    Initialize the CLI with your Alloy API key.
            users                   Manage users.
            integrations            Manage integrations.
            workflows               Manage workflows.
            credentials             Manage credentials.
            events                  Manage events.
            logs                    Fetch execution logs.
            exit                    Remove your API key from local storage.
        
        Options:
            --help, -h              Display help information.
            --raw, -r               Display raw JSON output.
    `;

    const commandHelp = {
        users: `
            Usage: ./alloy.js users [SUBCOMMAND] [OPTIONS]
            
            Subcommands:
                list                List all users.
                create              Interactively create a new user.
                delete <USER_ID>    Delete a user by ID.
                get <USER_ID>       Get details of a user by ID.
        `,
        integrations: `
            Usage: ./alloy.js integrations [SUBCOMMAND] [OPTIONS]
            
            Subcommands:
                list                List all integrations.
                install <INTEGRATION_ID>    Install an integration by ID.
                get <INTEGRATION_ID>        Get details of an integration by ID.
        `,
        workflows: `
            Usage: ./alloy.js workflows [SUBCOMMAND] [OPTIONS]
            
            Subcommands:
                list                List all workflows.
                config <WORKFLOW_ID>        Interactively configure a workflow by ID.
                run <WORKFLOW_ID> <EVENT> <DATA>    Run a workflow by ID with event and data.
                get <WORKFLOW_ID>   Get details of a workflow by ID.
                upgrade <WORKFLOW_ID>       Upgrade a workflow by ID.
        `,
        credentials: `
            Usage: ./alloy.js credentials [SUBCOMMAND] [OPTIONS]
            
            Subcommands:
                list <INTEGRATION_ID>       List all credentials for an integration by ID.
                delete <CREDENTIAL_ID>      Delete a credential by ID.
        `,
        events: `
            Usage: ./alloy.js events [SUBCOMMAND] [OPTIONS]
            
            Subcommands:
                list                List all events.
                get <EVENT_NAME>    Get details of an event by name.
        `,
        logs: `
            Usage: ./alloy.js logs [SUBCOMMAND] [OPTIONS]
            
            Subcommands:
                get --userId <USER_ID> --workflowId <WORKFLOW_ID>    Fetch logs for a specific user and workflow.
                getall             Fetch all logs for all users and workflows.
            
            Options for 'get':
                --userId <USER_ID>          Specify the user ID.
                --workflowId <WORKFLOW_ID>  Specify the workflow ID.
            
            Note: The 'getall' subcommand does not require additional options.
        `
    };

    // Check if the help request is for a specific command or general
    if (command === '--help' || command === '-h' || !command) {
        console.log(baseHelp);
    } else if (command && commandHelp[command]) {
        // Show specific help for the provided command
        console.log(`Usage for '${command}' command:`);
        console.log(commandHelp[command]);
    } else {
        // If an unrecognized command is provided, show the base help
        console.log(baseHelp);
    }

    // Additional logic for sub-commands can be added here if needed
}

export { displayHelp };