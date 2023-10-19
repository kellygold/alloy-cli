# Alloy CLI

Alloy CLI is a command-line interface to interact with the Alloy API, allowing users to manage users, integrations, workflows, credentials, and events seamlessly from the terminal.

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/kellygold/alloy-cli.git
cd alloy-cli
```

Install the necessary dependencies:

```bash
npm install
```

## Usage

### General

- **Initialize Configuration**
  ```bash
  ./alloy.js init
  ```
  Initialize the CLI with your Alloy API key. This command will prompt you to enter your API key and save it for future requests.

### Users

- **List Users**
  ```bash
  ./alloy.js users list
  ```

- **Create User**
  ```bash
  ./alloy.js users create
  ```
  Create a new user. This command will prompt you to enter a username and optionally a full name.

- **Delete User**
  ```bash
  ./alloy.js users delete <USER_ID>
  ```

- **Get User by ID**
  ```bash
  ./alloy.js users get <USER_ID>
  ```

### Integrations

- **List Integrations**
  ```bash
  ./alloy.js integrations list
  ```

- **Install Integration**
  ```bash
  ./alloy.js integrations install <INTEGRATION_ID>
  ```
  Launches the Alloy Modal to Install an Integration for the CLI user. The modal runs as an electron app as an isolated session from your default browser

- **Get Integration by ID**
  ```bash
  ./alloy.js integrations get <INTEGRATION_ID>
  ```

### Workflows

- **List Workflows**
  ```bash
  ./alloy.js workflows list
  ```

- **Configure Workflow**
  ```bash
  ./alloy.js workflows config <WORKFLOW_ID>
  ```
  Save a runtime configuration for a custom_event based workflow. This command will prompt you to enter a user ID, event name, and JSON data. (minify the JSON data to avoid ending command early.)

- **Run Workflow**
  ```bash
  ./alloy.js workflows run <WORKFLOW_ID> <EVENT> <DATA>
  ./alloy.js workflows run <WORKFLOW_ID>      #tries using saved config for workflowID from `workflows config`
  ```

- **Get Workflow by ID**
  ```bash
  ./alloy.js workflows get <WORKFLOW_ID>
  ```

- **Upgrade Workflow**
  ```bash
  ./alloy.js workflows upgrade <WORKFLOW_ID>
  ```

### Credentials

- **List Credentials**
  ```bash
  ./alloy.js credentials list
  ```

- **Delete Credential**
  ```bash
  ./alloy.js credentials delete <CREDENTIAL_ID>
  ```

### Events

- **List Events**
  ```bash
  ./alloy.js events list
  ```

- **Get Event by Name**
  ```bash
  ./alloy.js events get <EVENT_NAME>
  ```

## Options

- **Raw Output**
  Add the `--raw` option to get the raw JSON output.
  ```bash
  ./alloy.js <COMMAND> --raw
  ```

- **Help**
  Add the `--help` option to get help on the usage of commands.
  ```bash
  ./alloy.js <COMMAND> --help
  ```

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the CLI.
