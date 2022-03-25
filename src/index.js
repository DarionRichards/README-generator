const fs = require("fs");
const inquirer = require("inquirer");

const {
	questions,
	installationQuestions,
	userFlowQuestions,
	testQuestions,
} = require("./utils/questions");

const askInstallationQuestions = async () => {
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

const askUserFlowQuestions = async () => {
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

const askTestQuestions = async () => {
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

const buildSections = (
	answers,
	installationAnswers,
	userFlowAnswers,
	testAnswers
) => {
	if (!answers.includeInstall && !answers.includeApplication) {
		return ``;
	}
	if (!answers.includeInstall && answers.includeApplication) {
		return `${generateUsage(userFlowAnswers)}
  
    ${generateTests(testAnswers)}`;
	}
	if (answers.includeInstall && !answers.includeApplication) {
		return `${generateInstallation(installationAnswers)}`;
	}
	if (answers.includeInstall && answers.includeApplication) {
		return `${generateInstallation(installationAnswers)}
  
    ${generateUsage(userFlowAnswers)}
  
    ${generateTests(testAnswers)}`;
	}
};

const generateTitle = (answers) => {
	return `# ${answers.title} ![${answers.license}](https://img.shields.io/static/v1?label=${answers.license}&message=License&color=green)`;
};

const generateTableOfContents = (answers) => {
	if (!answers.includeInstall && !answers.includeApplication) {
		return `
## Table of Contents
        
- [Description](#description)
- [Contributing](#contributing)
- [Contact Me](#contactme)`;
	}
	if (!answers.includeInstall && answers.includeApplication) {
		return `
## Table of Contents
        
- [Description](#description)
- [Contributing](#contributing)
- [Usage](#usage)
- [Tests](#tests)
- [Contact Me](#contactme)`;
	}
	if (answers.includeInstall && !answers.includeApplication) {
		return `
## Table of Contents
        
- [Description](#description)
- [Contributing](#contributing)
- [Installation](#installation)
- [Contact Me](#contactme)`;
	}
	if (answers.includeInstall && answers.includeApplication) {
		return `
## Table of Contents
        
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Contributing](#contributing)
- [Contact Me](#contactme)`;
	}
};

const generateDescription = (answers) => `

## Description
  
${answers.description}`;

const generateInstallation = (installationAnswers) => {
	const steps = buildInstallationSection(installationAnswers);
	return `
## Installation
  
Run the following script to install the packages required for the application:
  
\`\`\`
${steps}
\`\`\``;
};

const generateUsage = (userFlowAnswers) => {
	const steps = buildUsageSection(userFlowAnswers);
	return `
## Usage
  
To use the application run the following script:
  
\`\`\`
${steps}\n
\`\`\``;
};

const generateTests = (testAnswers) => {
	const steps = buildTestSection(testAnswers);
	return `
## Tests
  
To use the application run the following script:
  
\`\`\`
${steps}\n
\`\`\``;
};

const generateContributing = (answers) => `
## Contributing

${answers.contribute}`;

const generateContactMe = (answers) => `
## Contact me

${answers.gitUsername}
${answers.email}`;

const generateReadme = (
	answers,
	installationAnswers,
	userFlowAnswers,
	testAnswers
) => `${generateTitle(answers)}

    ${generateTableOfContents(
			answers,
			installationAnswers,
			userFlowAnswers,
			testAnswers
		)}
  
    ${generateDescription(answers)}
  
    ${buildSections(answers, installationAnswers, userFlowAnswers, testAnswers)}
  
    ${generateContributing(answers)}

    ${generateContactMe(answers)}`;

const writeToFile = (filePath, data) => {
	try {
		fs.writeFileSync(filePath, data);
	} catch (error) {
		console.log(error.message);
	}
};

const start = async () => {
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
