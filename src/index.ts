import "dotenv/config";
import { Rl } from "./definitions/read-line.definitions";
import createTestCasesHandler from "./handlers/create-test-cases.handler";
import deleteTestCasesHandler from "./handlers/delete-test-cases.handler";
import getSuitesHandler from "./handlers/get-suites.handler";
import saveTestCasesHandler from "./handlers/save-test-cases.handler";
import ConsoleUtils from "./utils/console.utils";

(async function main() {
  console.log("\nTEST SYNC AI\n");
  console.log("1. Create test cases in TestRails");
  console.log("2. Update test cases in TestRails");
  console.log("3. Delete test cases in TestRails");
  console.log("4. Get suite tests in TestRails");

  const operation = await ConsoleUtils.getInput("\nEnter the number corresponding to your choice: ");

  switch (operation.trim()) {
    case "1":
      await getSuitesHandler();
      break;
    case "2":
      await createTestCasesHandler();
      break;
    case "3":
      await saveTestCasesHandler();
      break;
    case "4":
      await deleteTestCasesHandler();
      break;
    default:
      main();
      break;
  }

  Rl.close();
})();
