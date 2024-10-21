import { Rl } from "../definitions/read-line.definitions";
import TestRailsService from "../services/test-rails.service";

export default async function handler() {
  console.log("\nGet suites from TestRails\n");

  try {
    const suites = await TestRailsService.getSuites();
    console.log(suites);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    Rl.close();
  }
}
