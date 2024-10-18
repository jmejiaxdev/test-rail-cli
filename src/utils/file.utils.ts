import fs from "fs";
import path from "path";
import { config } from "../definitions/config.definitions";

const createUnitTestsFile = (filePath: string): string => {
  const directory = path.dirname(filePath);
  const name = path.basename(filePath, path.extname(filePath));
  const extension = path.extname(filePath);

  const testFilePath = `${directory}/${name}${config.testExtension}${extension}`;
  fs.writeFileSync(testFilePath, "");
  return testFilePath;
};

const fileUtils = {
  createUnitTestsFile,
};

export default fileUtils;
