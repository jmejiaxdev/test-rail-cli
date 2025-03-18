import "dotenv/config";
import { RL } from "./definitions/console.definitions";
import { getInput } from "./utils/console.utils";
import { getSuitesCommand } from "./commands/get-suites.command";
import { getTestCasesCommand } from "./commands/get-test-cases.command";
import { saveTestCasesCommand } from "./commands/save-test-cases.command";

(async function main() {
  console.log("\nTEST RAIL CLI\n");
  console.log("1. Get suites");
  console.log("2. Get test cases");
  console.log("3. Save test cases");
  console.log("9. Exit");

  const operation = await getInput("\nEnter the number corresponding to your choice: ");

  switch (operation.trim()) {
    case "1":
      await getSuitesCommand();
      break;
    case "2":
      await getTestCasesCommand();
      break;
    case "3":
      await saveTestCasesCommand();
      break;
    case "9":
      RL.close();
      break;
    default:
      break;
  }

  main();
})();
