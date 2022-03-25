const questions = [
	{
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
		choices: [
			{
				name: "mit",
				value: "MIT",
			},
			{
				name: "gitHub",
				value: "GitHub",
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

const installationQuestions = [
	{
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

const userFlowQuestions = [
	{
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

const testQuestions = [
	{
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

module.exports = {
	questions,
	installationQuestions,
	userFlowQuestions,
	testQuestions,
};
