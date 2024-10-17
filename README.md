# TestSyncAI

**TestSyncAI** is a powerful tool that automates the process of converting test descriptions into Gherkin language, syncing test cases with TestRail, and updating Jest test descriptions with TestRail IDs. By integrating with OpenAI's ChatGPT and TestRail APIs, TestSyncAI ensures that your testing workflow is efficient and seamless.

## Features

- **Gherkin Conversion**: Automatically convert test descriptions into Gherkin language using OpenAI's ChatGPT API.
- **TestRail Integration**: Create or update test cases in TestRail based on Jest test descriptions.
- **Test Case Syncing**: Append TestRail test case IDs to Jest test descriptions for easy tracking.
- **Automation**: Simplify test management by automating routine tasks like syncing and updating test cases.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Convert to Gherkin](#convert-to-gherkin)
  - [Sync with TestRail](#sync-with-testrail)
  - [Update Jest Test Descriptions](#update-jest-test-descriptions)
- [Configuration](#configuration)
- [License](#license)

## Installation

### Prerequisites

- Node.js v14 or higher
- TestRail API access
- OpenAI API access

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/your-repo/TestSyncAI.git
   cd TestSyncAI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables for TestRail and OpenAI API keys. Create a `.env` file in the root directory with the following:

   ```bash
   TESTRAIL_API_URL=https://yourcompany.testrail.io/index.php?/api/v2/
   TESTRAIL_USERNAME=yourusername
   TESTRAIL_API_KEY=yourapikey
   TESTRAIL_PROJECT_ID=your_project_id
   TESTRAIL_SUITE_ID=your_suite_id
   TESTRAIL_SECTION_ID=your_section_id

   OPEN_AI_API_KEY=your_openai_api_key
   ```

## Usage

### Convert to Gherkin

To convert test descriptions to Gherkin syntax using ChatGPT, call the `convertToGherkin` function:

```javascript
const { convertToGherkin } = require("./src/converters");

convertToGherkin("should get all flags")
  .then((gherkinText) => {
    console.log(gherkinText);
  })
  .catch(console.error);
```

### Sync with TestRail

To sync test descriptions with TestRail (create or update a test case), use the `getOrCreateTestRailId` function:

```javascript
const { getOrCreateTestRailId } = require("./src/testrail");

getOrCreateTestRailId("should get all flags")
  .then((testId) => {
    console.log(`TestRail ID: ${testId}`);
  })
  .catch(console.error);
```

### Update Jest Test Descriptions

To update Jest test descriptions with the TestRail ID, use the `addTestRailIdToTestDescription` function:

```javascript
const { addTestRailIdToTestDescription } = require("./src/updater");

addTestRailIdToTestDescription("./testFile.test.ts", "should get all flags", "12345678");
```

### Full Workflow Example

Here's an example combining all features:

```javascript
const { convertToGherkin } = require("./src/converters");
const { getOrCreateTestRailId } = require("./src/testrail");
const { addTestRailIdToTestDescription } = require("./src/updater");

async function processTest(testDescription, filePath) {
  try {
    const gherkin = await convertToGherkin(testDescription);
    console.log(`Gherkin for "${testDescription}":\n${gherkin}`);

    const testId = await getOrCreateTestRailId(testDescription);
    console.log(`TestRail ID for "${testDescription}": ${testId}`);

    addTestRailIdToTestDescription(filePath, testDescription, testId);
    console.log(`Updated test description with TestRail ID in ${filePath}`);
  } catch (error) {
    console.error("Error processing test:", error);
  }
}

processTest("should get all flags", "./testFile.test.ts");
```

## Configuration

### Environment Variables

- **TESTRAIL_API_URL**: The base URL for your TestRail API.
- **TESTRAIL_USERNAME**: Your TestRail account username.
- **TESTRAIL_API_KEY**: The API key for TestRail authentication.
- **TESTRAIL_PROJECT_ID**: The ID of your TestRail project.
- **TESTRAIL_SUITE_ID**: The ID of the suite where test cases should be added.
- **TESTRAIL_SECTION_ID**: The section ID where test cases are organized.

- **OPEN_AI_API_KEY**: Your OpenAI API key to access the GPT model.

### Scripts

The project includes three main scripts:

- **converters.js**: Contains the function to convert test descriptions to Gherkin format using OpenAI.
- **testrail.js**: Handles the interaction with TestRail API (create/update tests).
- **updater.js**: Modifies Jest test descriptions to include TestRail IDs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
