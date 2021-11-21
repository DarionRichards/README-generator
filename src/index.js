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

const buildInstallationSection = (installationSteps) => {
    const steps = installationSteps.join("\n");
    return steps;
};

const buildUsageSection = (array) => {
    const steps = array.join(" \n");
    return steps;
};

const buildTestSection = (array) => {
    const steps = array.join("\n");
    return steps;
};

const generateTitle = (answers) => {
    return `# ${answers.title} ![MIT](https://img.shields.io/static/v1?label=MIT&message=License&color=green)`;
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
  
  ${answers.description}`;
};

const generateInstallation = (installationAnswers) => {
    const steps = buildInstallationSection(installationAnswers);
    return `## Installation
  
  Run the following script to install the packages required for the application:
  
  \`\`\`
  ${steps}
  \`\`\``;
};

const generateUsage = (userFlowAnswers) => {
    const steps = buildUsageSection(userFlowAnswers);
    return `## Usage
  
  To use the application run the following script:
  
  \`\`\`
  ${steps}\n
  \`\`\``;
};

const generateTests = (testAnswers) => {
    const steps = buildTestSection(testAnswers);
    return `## Tests
  
  To use the application run the following script:
  
  \`\`\`
  ${steps}\n
  \`\`\``;
};

const generateContributing = (answers) => {
    return `## Contributing
  
  ${answers.contribute}`;
};

const generateLicense = (answers) => {
    return `## License
  
  ADD TEXT HERE`;
};

const generateContactMe = (answers) => {
    return `## Contact me

  ${answers.gitUsername}
  ${answers.email}`;
};

const generateReadme = (
    answers,
    installationAnswers,
    userFlowAnswers,
    testAnswers
) => {
    return `${generateTitle(answers)}

  ${generateTableOfContents(
		answers,
		installationAnswers,
		userFlowAnswers,
		testAnswers
	)}
  
  ${generateDescription(answers)}
  
  ${generateInstallation(installationAnswers)}
  
  ${generateUsage(userFlowAnswers)}
  
  ${generateTests(testAnswers)}
  
  ${generateContributing(answers)}
  
  ${generateLicense(answers)}

  ${generateContactMe(answers)}
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

const start = async() => {
    // store answers from questions
    const answers = await inquirer.prompt(questions);

    // array to store inatllation & application answers
    const installationArray = [];
    const userFlowArray = [];
    const testArray = [];

    // if includeInstall === true
    if (answers.includeInstall) {
        const installationAnswers = await askInstallationQuestions();
        installationArray.push(installationAnswers);
    }

    // if includeApplication === true
    if (answers.includeApplication) {
        const userFlowAnswers = await askUserFlowQuestions();
        const testAnswers = await askTestQuestions();
        userFlowArray.push(userFlowAnswers);
        testArray.push(testAnswers);
    }

    // generate readme based on answers
    const readme = generateReadme(
        answers,
        installationArray,
        userFlowArray,
        testArray
    );

    // write generated readme to a file
    writeToFile("GENERATED_README.md", readme);
};

start();