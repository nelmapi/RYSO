## RYSO

Order tracking system

## Setup Project

- Install Meteor

```
	curl https://install.meteor.com/ | sh
```

- Clone the project from the repository
- Open de project directory from the terminal
- Execute "meteor" inside the folder src.

## Testing

### Setup

- Open a terminal in the projectRoot/intregration_tests and run the following commands

```
npm install
```

- Update Selenium Web Driver

```
npm run updateWebDriver
```

- Start Selenium Web Driver

```
npm run startSelenium
```

### Run Integration Tests

- Open new terminal, go to integration_tests folder and run the integration tests

```
protractor ./configuration/protractor-conf.js
```
