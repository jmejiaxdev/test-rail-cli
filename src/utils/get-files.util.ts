import * as fs from "fs";
import * as path from "path";

interface FileData {
  path: string;
  name: string;
}

const shouldExclude = (fileName: string): boolean => {
  const exclusionPatterns = [/\.spec\.ts$/, /\.spec\.tsx$/, /\.test\.ts$/, /\.test\.tsx$/];
  return exclusionPatterns.some((pattern) => pattern.test(fileName));
};

export default function getFiles(directory: string): FileData[] {
  const files: FileData[] = [];

  const items = fs.readdirSync(directory);

  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      files.push(...getFiles(itemPath));
    } else if (stats.isFile() && (item.endsWith(".ts") || item.endsWith(".tsx")) && !shouldExclude(item)) {
      files.push({ path: itemPath, name: item });
    }
  }

  return files;
}
