import "dotenv/config";
import createUnitTests from "./controllers/create-unit-tests.controller";
import { rl } from "./definitions/read-line.definitions";
import consoleUtils from "./utils/console.utils";

(async function main() {
  console.log("\n");
  console.log("TEST SYNC AI");
  console.log("\n");
  console.log("1. Create unit tests in TestRails");
  console.log("2. Update unit tests in TestRails");
  console.log("3. Delete unit tests in TestRails");
  console.log("4. Get suite tests in TestRails");
  console.log("\n");

  const operation = await consoleUtils.getInput("Enter the number corresponding to your choice: ");

  switch (operation.trim()) {
    case "1":
      await createUnitTests();
      break;
    case "2":
      // update unit tests
      break;
    case "3":
      // delete unit tests
      break;
    case "4":
      // get suite tests
      break;
    default:
      main();
      break;
  }

  rl.close();
})();
