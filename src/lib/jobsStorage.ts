import fs from "fs";
import path from "path";
import { Job } from "@/types/job";

const filePath = path.resolve(process.cwd(), "data/jobs.json");

export function readJobs(): Job[] {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData) as Job[];
  } catch (err) {
    console.error("❌ Failed to read jobs.json:", err);
    return [];
  }
}

export function writeJobs(data: Job[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Failed to write to jobs.json:", err);
  }
}