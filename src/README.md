## RYSO

PTAANG project

## Setup Project

1 Install Meteor

```
	curl https://install.meteor.com/ | sh
```

2 Clone the project from the repository
3 open de project directory from the terminal
4 execute "meteor" inside the folder src.

## Testing

### Setup

Open a terminal in the projectRoot/intregration_tests and run the following commands

```
npm install
```

Update Selenium Web Driver

```
npm run updateWebDriver
```

Start Selenium Web Driver

```
startSelenium
```

### Run Protractor Tests

Open new terminal, go to integration_tests folder and run the integration tests

```
protractor ./configuration/protractor-conf.js
```
