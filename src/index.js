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
        name: "includeInstall",
        message: "Does your project need to be installed?",
    },
    {
        type: "confirm",
        name: "includeApplication",
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

const installationQuestions = [{
        type: "input",
        name: "installationStep",
        message: "Please enter the steps for installation:",
    },
    {
        type: "confirm",
        name: "includeStep",
        message: "Do you wish to enter another step?",
    },
];

const userFlowQuestions = [{
        type: "input",
        name: "userFlow",
        message: "Please enter the USER FLOW:",
    },
    {
        type: "confirm",
        name: "includeStep",
        message: "Do you wish to enter another step?",
    },
];

const testQuestions = [{
        type: "input",
        name: "test",
        message: "Please enter steps to TEST application:",
    },
    {
        type: "confirm",
        name: "includeStep",
        message: "Do you wish to enter another step?",
    },
];

const generateTitle = (answers) => {
    return `# TITLE ![MIT](https://img.shields.io/static/v1?label=MIT&message=License&color=green)`;
};

const generateTableOfContents = (
    answers,
    installationAnswers,
    applicationAnswers
) => {
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

const generateInstallation = (installationAnswers) => {
    return `## Installation
  
  Run the following script to install the packages required for the application:
  
  \`\`\`
  ADD TEXT HERE
  \`\`\``;
};

const generateUsage = (applicationAnswers) => {
    return `## Usage
  
  To use the application run the following script:
  
  \`\`\`
  ADD TEXT HERE
  \`\`\``;
};

const generateTests = (applicationAnswers) => {
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

const generateReadme = (answers, installationAnswers, applicationAnswers) => {
    return `${generateTitle(answers)}

  ${generateTableOfContents(answers, installationAnswers, applicationAnswers)}
  
  ${generateDescription(answers)}
  
  ${generateInstallation(installationAnswers)}
  
  ${generateUsage(applicationAnswers)}
  
  ${generateTests(applicationAnswers)}
  
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

const askInstallationQuestions = async() => {
    // condition for while statement
    let active = true;

    // array to store installation steps
    const installationArray = [];

    while (active) {
        // prompt the installation step questions to user
        const installationAnswers = await inquirer.prompt(installationQuestions);
        installationArray.push(installationAnswers.installationStep);
        // condition to stop while loop
        if (!installationAnswers.includeStep) {
            active = false;
        }
    }

    return installationArray;
};

const askApplicationQuestions = async() => {
    const askUserFlowQuestions = async() => {
        // condition for while statement
        let active = true;

        // array to store installation steps
        const userFlowArray = [];

        while (active) {
            // prompt the installation step questions to user
            const userFlowAnswers = await inquirer.prompt(userFlowQuestions);
            userFlowArray.push(userFlowAnswers.userFlow);
            // condition to stop while loop
            if (!userFlowAnswers.includeStep) {
                active = false;
            }
        }

        return userFlowArray;
    };
    const askTestQuestions = async() => {
        // condition for while statement
        let active = true;

        // array to store installation steps
        const testArray = [];

        while (active) {
            // prompt the installation step questions to user
            const testAnswers = await inquirer.prompt(testQuestions);
            testArray.push(testAnswers.test);
            // condition to stop while loop
            if (!testAnswers.includeStep) {
                active = false;
            }
        }

        return testArray;
    };
    const userFlowAnswers = await askUserFlowQuestions();
    const testAnswers = await askTestQuestions();

    return {
        userFlow: userFlowAnswers,
        test: testAnswers,
    };
};

const start = async() => {
    // store answers from questions
    const answers = await inquirer.prompt(questions);

    // array to store inatllation & application answers
    const installationArray = [];
    const applicationArray = [];

    // if includeInstall === true
    if (answers.includeInstall) {
        const installationAnswers = await askInstallationQuestions();
        installationArray.push(installationAnswers);
    }

    // if includeApplication === true
    if (answers.includeApplication) {
        const applicationAnswers = await askApplicationQuestions();
        applicationArray.push(applicationAnswers);
    }

    // generate readme based on answers
    const readme = generateReadme(answers, installationArray, applicationArray);

    // write generated readme to a file
    writeToFile("GENERATED_README.md", readme);
};

start();