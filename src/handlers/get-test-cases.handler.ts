import { Config } from "../definitions/config.definitions";
import TestRailsService from "../services/test-rails.service";
import ConsoleUtils from "../utils/console.utils";

const { suiteId } = Config.testRails;

export default async function handler() {
  console.log("\nGet test cases from TestRails\n");

  try {
    await TestRailsService.getTestCases();
  } catch (err) {
    ConsoleUtils.logError(err);
  }
}
