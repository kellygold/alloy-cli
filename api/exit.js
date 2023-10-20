import fs from "fs";

// define config file from alloy-clip-config.json
const CONFIG_FILE = 'alloy-cli-config.json';
function exit() {
    let config = {};
    if (fs.existsSync(CONFIG_FILE)) {
        config = JSON.parse(fs.readFileSync(CONFIG_FILE));
    }
    
    if (config.apiKey) {
        delete config.apiKey;
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(config));
        console.log("API key removed successfully. Exiting...");
    } else {
        console.log("No API key found. Exiting...");
    }
}

export { exit };