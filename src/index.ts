import "dotenv/config";
import { Rl } from "./definitions/console.definitions";
import createTestCasesHandler from "./handlers/create-test-cases.handler";
import deleteTestCasesHandler from "./handlers/delete-test-cases.handler";
import getSuitesHandler from "./handlers/get-suites.handler";
import getTestCasesHandler from "./handlers/get-test-cases.handler";
import saveTestCasesHandler from "./handlers/save-test-cases.handler";
import ConsoleUtils from "./utils/console.utils";

(async function main() {
  console.log("\nTEST SYNC AI\n");
  console.log("1. Get suite tests in TestRails");
  console.log("2. Get tests cases in TestRails");
  console.log("3. Save test cases in TestRails");
  console.log("4. Delete test cases in TestRails");
  console.log("5. Create test cases with ChatGPT");
  console.log("9. Exit");

  const operation = await ConsoleUtils.getInput("\nEnter the number corresponding to your choice: ");

  switch (operation.trim()) {
    case "1":
      await getSuitesHandler();
      break;
    case "2":
      await getTestCasesHandler();
      break;
    case "3":
      await saveTestCasesHandler();
      break;
    case "4":
      await deleteTestCasesHandler();
      break;
    case "5":
      await createTestCasesHandler();
      break;
    case "9":
      Rl.close();
      break;
    default:
      break;
  }

  main();
})();
