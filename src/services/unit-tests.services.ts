import fs from "fs";
import openAIAPI from "../api/open-ai.api";
import testRailsAPI from "../api/test-rails.api";
import { ANSIColor } from "../definitions/color.definitions";
import { Description, TestCase } from "../definitions/test-case.definitions";
import consoleUtils from "../utils/console.utils";

const createUnitTests = async (code: string, unitTests: string): Promise<string | null> => {
  return await openAIAPI.getChatGPTResponse(
    `Given the following code: 
    ${code}

    And the following unit tests: ${unitTests}

    Generate missing unit tests in Jest, using Gherkin-style descriptions in the format "Given-When-Then". 
    Provide the code only, without any additional descriptions or text.`
  );
};

const unitTestService = {
  createUnitTests,
  extractUnitTestsDescriptions,
};

export default testCaseService;
