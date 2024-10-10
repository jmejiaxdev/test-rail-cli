import * as fs from "fs/promises";
import * as path from "path";

export default async function getTestFilesPaths(dirPath?: string): Promise<string[]> {
  if (!dirPath) throw new Error("DIR_PATH is not defined");

  let paths: string[] = [];

  const items = await fs.readdir(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = await fs.stat(itemPath);

    if (stats.isDirectory()) {
      const subDirFiles = await getTestFilesPaths(itemPath);
      paths = paths.concat(subDirFiles);
    } else if (stats.isFile() && (item.includes(".spec.") || item.includes(".test."))) {
      paths.push(itemPath);
    }
  }

  if (!paths.length) throw new Error(`${dirPath} does not contain any test files`);

  return paths;
}
