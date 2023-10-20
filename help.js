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
        `
    };

    console.log(baseHelp);

    if (command && commandHelp[command]) {
        console.log(commandHelp[command]);
    }

    if (subCommand) {
        // You can further customize this section to display help for specific sub-commands
        // if you have more detailed options or arguments for each sub-command.
    }
}

export {displayHelp};