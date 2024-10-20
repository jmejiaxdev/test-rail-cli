import "dotenv/config";
import CreatUnitTestsHandler from "./handlers/create-test-cases.handler";
import { Rl } from "./definitions/read-line.definitions";
import ConsoleUtils from "./utils/console.utils";

(async function main() {
  console.log("\n");
  console.log("TEST SYNC AI\n");
  console.log("1. Create test cases in TestRails");
  console.log("2. Update test cases in TestRails");
  console.log("3. Delete test cases in TestRails");
  console.log("4. Get suite tests in TestRails");

  const operation = await ConsoleUtils.getInput("\nEnter the number corresponding to your choice: ");
  console.log("\n");

  switch (operation.trim()) {
    case "1":
      await CreatUnitTestsHandler.handler();
      break;
    case "2":
      // update test cases
      break;
    case "3":
      // delete test cases
      // await deleteUnitTest();
      break;
    case "4":
      // get suite tests
      break;
    default:
      main();
      break;
  }

  Rl.close();
})();
