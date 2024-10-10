import * as fs from "fs";

// Preserves the original file by creating a new file with the updated content.
// FIXME: Currently not in use
export default async function copyFile(sourceFilePath: string, destinationFilePath: string): Promise<void> {
  const fileContents = await fs.promises.readFile(sourceFilePath, "utf-8");
  await fs.promises.writeFile(destinationFilePath, fileContents);

  // To be used from caller
  // fs.readFileSync(destinationFilePath, "utf8");
}
