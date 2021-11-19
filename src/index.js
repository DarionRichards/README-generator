const fs = require("fs");
const inquirer = require("inquirer");

// declare questions
const questions = [{
        type: "input",
        name: "title",
        message: "What is your project title?",
    },
    {
        type: "input",
        name: "description",
        message: "What is your project description?",
    },
    {
        type: "confirm",
        name: "checkInstallationScript",
        message: "Does your project need to be installed?",
    },
    {
        type: "confirm",
        name: "userFlow",
        message: "Is your project an application?",
    },
    {
        type: "list",
        name: "license",
        message: "Please choose the corresponding license for your project:",
        choices: [{
                name: "gitHub",
                value: "gitHub",
            },
            {
                name: "noLicense",
                value: "noLicenseRequired",
            },
        ],
    },
    {
        type: "input",
        name: "gitUsername",
        message: "What is your GitHub username?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "input",
        name: "contribute",
        message: "How can other contribute to this app?",
    },
];

const generateTitle = (answers) => {
    return `# TITLE ![MIT](https://img.shields.io/static/v1?label=MIT&message=License&color=green)`;
};

const generateTableOfContents = (answers) => {
    return `## Table of Contents
  
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)
  - [Contributing](#contributing)
  - [License](#license)`;
};

const generateDescription = (answers) => {
    return `## Description
  
  ADD TEXT HERE`;
};

const generateInstallation = (answers) => {
    return `## Installation
  
  Run the following script to install the packages required for the application:
  
  \`\`\`
  ADD TEXT HERE
  \`\`\``;
};

const generateUsage = (answers) => {
    return `## Usage
  
  To use the application run the following script:
  
  \`\`\`
  ADD TEXT HERE
  \`\`\``;
};

const generateTests = (answers) => {
    return `## Tests
  
  To use the application run the following script:
  
  \`\`\`
  ADD TEXT HERE
  \`\`\``;
};

const generateContributing = (answers) => {
    return `## Contributing
  
  ADD TEXT HERE`;
};

const generateLicense = (answers) => {
    return `## License
  
  ADD TEXT HERE`;
};

const generateReadme = (answers) => {
    return `${generateTitle(answers)}

  ${generateTableOfContents(answers)}
  
  ${generateDescription(answers)}
  
  ${generateInstallation(answers)}
  
  ${generateUsage(answers)}
  
  ${generateTests(answers)}
  
  ${generateContributing(answers)}
  
  ${generateLicense(answers)}
  `;
};

const writeToFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, data);
    } catch (error) {
        console.log(error.message);
    }
};

const start = async() => {
    // prompt the questions using inquirer
    const answers = await inquirer.prompt(questions);
    console.log(answers);
    // generate readme based on answers
    const readme = generateReadme();

    // write generated readme to a file
    writeToFile("GENERATED_README.md", readme);
};

start();