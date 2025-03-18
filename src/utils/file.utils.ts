import fs from "fs";

import { getInput } from "./console.utils";

export const getFileContent = (filePath: string): string => {
  const fileContent = fs.readFileSync(filePath, "utf8");

  if (!fileContent) {
    throw new Error(`"${filePath}" is empty`);
  }

  return fileContent;
};

export const getFilePath = async (message: string): Promise<string> => {
  const filePath = await getInput(message);

  if (!fs.existsSync(filePath)) {
    throw new Error(`"${filePath}" is not a valid file path`);
  }

  return filePath;
};

export function getFileTitles(fileContent: string): RegExpMatchArray[] {
  const regex = /(it|test)\(\s*['"`](.*)['"`]/g;
  const matches: RegExpMatchArray[] = [];
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    matches.push(match);
  }

  return matches;
}
