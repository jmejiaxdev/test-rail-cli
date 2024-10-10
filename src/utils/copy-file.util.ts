import * as fs from "fs";

export default async function copyFile(sourceFilePath: string, destinationFilePath: string): Promise<void> {
  try {
    const fileContents = await fs.promises.readFile(sourceFilePath, "utf-8");
    await fs.promises.writeFile(destinationFilePath, fileContents);

    fs.readFileSync(destinationFilePath, "utf8");
    console.log(`File copied from ${sourceFilePath} to ${destinationFilePath}`);
  } catch (error) {
    console.error(`Error copying file: ${error}`);
  }
}
