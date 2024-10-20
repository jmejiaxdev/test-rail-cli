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

const getFileContent = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  if (!fileContent) console.log(`${filePath} is empty`);
  return fileContent;
};

const getFilePath = async (message: string): Promise<string> => {
  const filePath = await ConsoleUtils.getInput(message);
  if (!fs.existsSync(filePath)) throw new Error(`"${filePath}" is not a valid file path`);
  return filePath;
};

const hasFileExtension = (filePath: string, fileExtension: string) => {
  const isTestFileInvalid = fs.existsSync(filePath) && path.extname(filePath) === fileExtension;
  if (!isTestFileInvalid) throw new Error(`Invalid file extension "${filePath}"`);
  return true;
};

const FileUtils = {
  createTestCasesFile,
  getFileContent,
  getFilePath,
  hasFileExtension,
};

export default FileUtils;
