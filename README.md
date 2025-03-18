# TestRail CLI

A command-line interface for integrating unit tests with TestRail, allowing you to manage test suites and test cases directly from your terminal.

## Features

- Get test suites from TestRail
- Get test cases from TestRail
- Save test cases to TestRail
- Delete test cases from TestRail

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd testrail-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Configuration

Create a `.env` file in the root directory with the following variables (you can use `.env_default` as a template):

```
TRSC_API_USERNAME=your-testrail-username
TRSC_API_KEY=your-testrail-api-key
TRSC_API_ORGANIZATION_URL=your-testrail-organization-url
TRSC_API_PROJECT_ID=your-project-id
TRSC_API_SUITE_ID=your-suite-id

# Test case configuration
TRSC_TEST_CASE_SECTION_ID=your-section-id
TRSC_TEST_CASE_TEMPLATE=1
TRSC_TEST_CASE_TYPE_ID=7
TRSC_TEST_CASE_PRIORITY_ID=1
TRSC_TEST_CASE_REFS=
TRSC_TEST_CASE_MILESTONE=
TRSC_TEST_CASE_CUSTOM_MANUAL_VS_AUTOMATED=3
TRSC_TEST_CASE_CUSTOM_MANUAL_AUTOMATED=4
TRSC_TEST_CASE_CUSTOM_AUTOMATION_TOOL_TYPE=1
TRSC_TEST_CASE_CUSTOM_TEST_LEVEL=1
```

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `TRSC_API_USERNAME` | Your TestRail username (email) |
| `TRSC_API_KEY` | Your TestRail API key |
| `TRSC_API_ORGANIZATION_URL` | Your TestRail organization URL |
| `TRSC_API_PROJECT_ID` | The ID of your TestRail project |
| `TRSC_API_SUITE_ID` | The ID of your TestRail test suite |
| `TRSC_TEST_CASE_SECTION_ID` | The section ID where test cases will be added |

### Test Case Configuration Options

The following tables list all possible values for the test case configuration environment variables.

#### TRSC_TEST_CASE_TEMPLATE

| Value | Description |
|-------|-------------|
| 0 | Exploratory Charter |
| 1 | Test Case |
| 2 | UniTest / WebIR |

#### TRSC_TEST_CASE_TYPE_ID

| Value | Description |
|-------|-------------|
| 0 | API Postman |
| 1 | API Unit Test |
| 2 | Autify ETE Test |
| 3 | Automated |
| 4 | Client Unit Test |
| 5 | Database Test |
| 6 | DBT Test |
| 7 | E2E Test |
| 8 | Exploratory |
| 9 | Functionality |
| 10 | Glue Unit Test |
| 11 | Integration Test |
| 12 | Manual |
| 13 | Other |
| 14 | Sanity Test |
| 15 | Smoke Test |
| 16 | Unit Test |

#### TRSC_TEST_CASE_PRIORITY_ID

| Value | Description |
|-------|-------------|
| 0 | 1 - Don't Test |
| 1 | 2 - Test If Time |
| 2 | 3 - MustTest |

#### TRSC_TEST_CASE_CUSTOM_MANUAL_VS_AUTOMATED

| Value | Description |
|-------|-------------|
| 0 | None |
| 1 | Manual |
| 3 | Automated |

#### TRSC_TEST_CASE_CUSTOM_MANUAL_AUTOMATED

| Value | Description |
|-------|-------------|
| 0 | None |
| 1 | Manual |
| 2 | Under ENG development (manually tested) |
| 3 | E2E ENG Automated Test |
| 4 | Unit Test |
| 5 | Autify Automated |
| 6 | Postman API Automated |
| 7 | Selenium Automated |
| 8 | Older Tests |
| 9 | Nightwatch Automated |
| 10 | Playwright Automated |
| 11 | Synthetic Test |
| 12 | Smoke Test |

#### TRSC_TEST_CASE_CUSTOM_AUTOMATION_TOOL_TYPE

| Value | Description |
|-------|-------------|
| 0 | None |
| 1 | Jest |
| 2 | Autify |
| 3 | Nightwatch |
| 4 | Cypress |
| 5 | Selenium |
| 6 | Mocha |
| 7 | Playwright |
| 8 | Postman |
| 9 | Manual |
| 10 | DataDog |
| 11 | XUnit |
| 12 | Q4DataLib |
| 13 | Airflow |

#### TRSC_TEST_CASE_CUSTOM_TEST_LEVEL

| Value | Description |
|-------|-------------|
| 0 | None |
| 1 | Unit test |
| 2 | Integration test |
| 3 | Exploratory test |
| 4 | Regression test |
| 5 | Smoke test |
| 6 | Sanity Post-deployment test |
| 7 | Functionality test |
| 8 | Smoke &amp; Regression Test |
| 9 | Sanity Test |

## Usage

Run the CLI:

```bash
npm start
```

This will display a menu with the following options:

1. Get suites
2. Get test cases
3. Save test cases
9. Exit

Select an option by entering the corresponding number.

## License

ISC
