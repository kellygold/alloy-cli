# Alloy CLI

Alloy CLI is a command-line interface to interact with the Alloy API, allowing users to manage users, integrations, workflows, credentials, and events seamlessly from the terminal.

![cli_info](https://github.com/kellygold/alloy-cli/assets/28990947/ecbea829-4af5-435e-b8f4-c0a7ff59c452)

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

### Global Command

To use `alloy` as a global command:

```bash
npm link
```

After running `npm link`, you can use the `alloy` command directly in your terminal.

### Local Command

If you prefer not to install the command globally, you can also run the CLI directly using:

```bash
./alloy.js <COMMAND>
```

## Usage

### General

- **Initialize Configuration**
  ```bash
  alloy init
  ```
  Initialize the CLI with your Alloy API key. This command will prompt you to enter your API key and save it for future request. It also will create a cli-user with email alloy-cli-user@example.com if one does not already exist

### Users

- **List Users**
  ```bash
  alloy users list
  ```

- **Create User**
  ```bash
  alloy users create
  ```
  Create a new user. This command will prompt you to enter a username and optionally a full name.

- **Delete User**
  ```bash
  alloy users delete <USER_ID>
  ```

- **Get User by ID**
  ```bash
  alloy users get <USER_ID>
  ```

### Integrations

- **List Integrations**
  ```bash
  alloy integrations list
  ```

- **Install Integration**
  ```bash
  alloy integrations install <INTEGRATION_ID>
  ```
  Launches the Alloy Modal to Install an Integration for the CLI user. The modal runs as an electron app as an isolated session from your default browser.

- **Get Integration by ID**
  ```bash
  alloy integrations get <INTEGRATION_ID>
  ```

### Workflows

- **List Workflows**
  ```bash
  alloy workflows list
  ```

- **Configure Workflow**
  ```bash
  alloy workflows config <WORKFLOW_ID>
  ```
  Save a runtime configuration for a custom_event based workflow. This command will prompt you to enter a user ID, event name, and JSON data. (minify the JSON data to avoid ending command early.)

- **Run Workflow**
  ```bash
  alloy workflows run <WORKFLOW_ID> <EVENT> <DATA>
  ```
  ```bash
  alloy workflows run <WORKFLOW_ID>      #tries using saved config for workflowID from `workflows config`
  ```

- **Get Workflow by ID**
  ```bash
  alloy workflows get <WORKFLOW_ID>
  ```

- **Upgrade Workflow**
  ```bash
  alloy workflows upgrade <WORKFLOW_ID>
  ```

### Credentials

- **List Credentials**
  ```bash
  alloy credentials list
  ```

- **Delete Credential**
  ```bash
  alloy credentials delete <CREDENTIAL_ID>
  ```

### Events

- **List Events**
  ```bash
  alloy events list
  ```

- **Get Event by Name**
  ```bash
  alloy events get <EVENT_NAME>
  ```

## Options

- **Raw Output**
  Add the `--raw` option to get the raw JSON output.
  ```bash
  alloy <COMMAND> --raw
  ```

- **Help**
  Add the `--help` option to get help on the usage of commands.
  ```bash
  alloy <COMMAND> --help
  ```

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the CLI.
