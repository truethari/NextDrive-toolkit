const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const readline = require("readline");
const { authenticate } = require("@google-cloud/local-auth");
const bcrypt = require("bcrypt");

const title = `
█▄░█ █▀▀ ▀▄▀ ▀█▀ █▀▄ █▀█ █ █░█ █▀▀   ▀█▀ █▀█ █▀█ █░░ █▀
█░▀█ ██▄ █░█ ░█░ █▄▀ █▀▄ █ ▀▄▀ ██▄   ░█░ █▄█ █▄█ █▄▄ ▄█`;

function readInput(options) {
  console.log("Select an option:");
  options.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });

  console.log();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Enter the number of the option you want: ", (answer) => {
      rl.close();
      const selectedOption = parseInt(answer);
      if (isNaN(selectedOption) || selectedOption < 1 || selectedOption > options.length) {
        console.log("Invalid option. Please enter a valid number from the menu.");
        resolve(readInput(options));
      } else {
        resolve(selectedOption);
      }
    });
  });
}

function selectDrive() {
  const messages = ["Google Drive", "Back to main menu", "Exit"];

  readInput(messages)
    .then((selectedOption) => {
      console.log();
      switch (selectedOption) {
        case 1:
          generateGoogleAuthToken();
          break;
        case 2:
          displayMenu();
          break;
        case 3:
          break;
        default:
          console.log("Invalid option.");
          break;
      }
    })
    .catch((err) => {
      console.error("Error occurred:", err);
    });
}

// AUTH TOKENS ------------------------------------------------------------

function generateGoogleAuthToken() {
  const SCOPES = ["https://www.googleapis.com/auth/drive"];
  const TOKEN_PATH = path.join(process.cwd(), "googletoken.json");
  const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

  async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  async function authorize() {
    let client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });

    if (client.credentials) {
      await saveCredentials(client);
      console.log(`Token stored to ${TOKEN_PATH}`);
    }
  }

  console.log(
    "Before Next Step, please make sure you have a credentials.json file in the root directory of this project.",
  );
  console.log(
    "If you don't have one, please follow the instructions in the README.md file to create one.",
  );
  console.log("https://github.com/truethari/NextDrive-toolkit/blob/master/README.md");
  console.log();

  const messages = ["Next step", "Back to main menu", "Exit"];
  readInput(messages)
    .then((selectedOption) => {
      console.log();
      switch (selectedOption) {
        case 1:
          authorize();
          break;
        case 2:
          displayMenu();
          break;
        case 3:
          break;
        default:
          console.log("Invalid option.");
          break;
      }
    })
    .catch((err) => {
      console.error("Error occurred:", err);
    });
}

// -----------------------------------------------------------------------

function bcryptPassword() {
  const saltRounds = 10;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Enter the password you want to bcrypt: ", (answer) => {
      rl.close();
      bcrypt.hash(answer, saltRounds, function (err, hash) {
        if (err) {
          console.error("Error occurred:", err);
        } else {
          console.log(`Bcrypt hash: ${hash}`);
        }
        resolve();
      });
    });
  });
}

function displayMenu() {
  console.log(title + "\n");

  const messages = ["Generate auth token", "Bcrypt a password", "Exit"];

  readInput(messages)
    .then((selectedOption) => {
      console.log();
      switch (selectedOption) {
        case 1:
          selectDrive();
          break;
        case 2:
          bcryptPassword();
          break;
        case 3:
          break;
        default:
          console.log("Invalid option.");
          break;
      }
    })
    .catch((err) => {
      console.error("Error occurred:", err);
    });
}

displayMenu();
