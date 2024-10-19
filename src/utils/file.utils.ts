import fs from "fs";
import path from "path";
import { Config } from "../definitions/config.definitions";
import ConsoleUtils from "./console.utils";

const createTestCasesFile = (filePath: string): string => {
  const directory = path.dirname(filePath);
  const name = path.basename(filePath, path.extname(filePath));
  const extension = path.extname(filePath);

  const testFilePath = `${directory}/${name}${Config.testExtension}${extension}`;
  fs.writeFileSync(testFilePath, "");

  return testFilePath;
};

const getCodeFilePath = async (): Promise<string> => {
  const filePath = await ConsoleUtils.getInput(`Enter the file path (e.g folder/file.ext): `);
  if (!fs.existsSync(filePath)) throw new Error(`"${filePath}" is not a valid file path`);
  return filePath;
};

const getTestCasesFilePath = async (filePath: string): Promise<string> => {
  const unitTestsFilePath = await ConsoleUtils.getInput(
    "Enter the test cases file path or empty to create a new one: "
  );
  if (!unitTestsFilePath) return FileUtils.createTestCasesFile(filePath);

  const isTestFileInvalid =
    !fs.existsSync(unitTestsFilePath) || path.extname(unitTestsFilePath) !== Config.testExtension;
  if (isTestFileInvalid) throw new Error(`Invalid test cases file path or extension "${unitTestsFilePath}"`);

  return unitTestsFilePath;
};

const FileUtils = {
  createTestCasesFile,
  getCodeFilePath,
  getTestCasesFilePath,
};

export default FileUtils;
