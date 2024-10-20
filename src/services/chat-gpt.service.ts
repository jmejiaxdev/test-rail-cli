import fs from "fs";
import OpenAIApi from "../api/open-ai.api";
import TestRailsApi from "../api/test-rails.api";
import { TestCase, TestCaseDescription } from "../definitions/test-case.definitions";
import ConsoleUtils from "../utils/console.utils";

const createTestCasesContent = async (
  codeFileContent: string,
  testCasesFileContent: string
): Promise<string | null> => {
  // const response = await OpenAIAPI.getChatGPTResponse(`
  //   Given the following code:
  //   ${codeFileContent}

  //   And the following test cases:
  //   ${testCasesFileContent}

  //   Generate missing test cases in Jest. Use Gherkin-style descriptions
  //   in the format "[Given] scenario [When] condition [Then] expected", and "test" instead of "it".
  //   Provide the code only, without any additional descriptions or text.
  // `);
  const response = `\`\`\`javascript
  import sum from "./sum";
  
  describe("sum function", () => {
    test("[Given] two positive numbers [When] they are added [Then] the result should be their sum", () => {
      expect(sum(2, 3)).toBe(5);
    });
  
    test("[Given] a positive number and zero [When] they are added [Then] the result should be the positive number", () => {
      expect(sum(5, 0)).toBe(5);
    });
  
    test("[Given] two negative numbers [When] they are added [Then] the result should be their sum", () => {
      expect(sum(-2, -3)).toBe(-5);
    });
  });
  \`\`\``;

  // Use regular expressions to remove the markdown code block markers
  return response && response.replace(/```javascript|```/g, "").trim();
};

const ChatGPTService = {
  createTestCasesContent,
};

export default ChatGPTService;
