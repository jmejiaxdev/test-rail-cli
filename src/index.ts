import createUnitTests from "./controllers/create-unit-tests.controller";
import { rl } from "./definitions/read-line.definitions";
import consoleUtils from "./utils/console.utils";

(async function main() {
  console.log("\nTEST SYNC AI");
  console.log("\nChoose an operation to perform");
  console.log("\n1. Create unit tests in TestRails");
  console.log("2. Update unit tests in TestRails");
  console.log("3. Delete unit tests in TestRails");
  console.log("4. Get suite tests in TestRails");

  const operation = await consoleUtils.askQuestion("\nEnter the number corresponding to your choice: ");

  switch (operation.trim()) {
    case "1":
      createUnitTests();
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
  }

  rl.close();
})();
