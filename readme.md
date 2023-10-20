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
  Initialize the CLI with your Alloy API key. This command will prompt you to enter your API key and save it in a configuration file in your project directory for future requests. It also creates a cli-user with the email `alloy-cli-user@example.com` if one does not already exist. Your API key is sensitive information; use the `alloy exit` command to purge it when it's not in use.
  **config storage:** `alloy-cli/alloy-cli-config.json`

- **Exit and Purge API Key**
  ```bash
  alloy exit
  ```
  This command will purge the stored API key from the configuration file, ensuring that sensitive data is not left stored on your machine. Other configurations, like saved workflow configurations, will remain intact.

### Users

- **List Users**
  ```bash
  alloy users list
  ```

- **Create User**
  ```bash
  alloy users create
  ```

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

- **Run Workflow**
  ```bash
  alloy workflows run <WORKFLOW_ID> <EVENT> <DATA>
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
