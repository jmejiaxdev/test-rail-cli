import fs from "fs";
import path from "path";

const createUnitTestsFile = (filePath: string, testExtension: string): string => {
  const directory = path.dirname(filePath);
  const name = path.basename(filePath, path.extname(filePath));
  const extension = path.extname(filePath);

  const testFilePath = `${directory}/${name}/${testExtension}${extension}`;
  fs.writeFileSync(testFilePath, "");
  return testFilePath;
};

const fileUtils = {
  createUnitTestsFile,
};

export default fileUtils;
