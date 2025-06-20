import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "data/jobs.json");

export function readJobs() {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (err) {
    console.error("Failed to read jobs:", err);
    return [];
  }
}

export function writeJobs(data: any) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to write jobs:", err);
  }
}