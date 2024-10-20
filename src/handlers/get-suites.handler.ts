import fs from "fs";
import { Config } from "../definitions/config.definitions";
import { Rl } from "../definitions/read-line.definitions";
import ChatGPTService from "../services/chat-gpt.service";
import FileUtils from "../utils/file.utils";
import TestRailsService from "../services/test-rails.service";

export default async function handler() {
  console.log("\nGet suites from TestRails\n");

  try {
    TestRailsService.getSuites();
  } catch (err) {
    console.error("Error:", err);
  } finally {
    Rl.close();
  }
}
