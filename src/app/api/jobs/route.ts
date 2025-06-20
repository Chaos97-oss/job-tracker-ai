import { NextResponse } from "next/server";
import { readJobs, writeJobs } from "@/lib/jobsStorage";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const jobs = readJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newJob = {
    id: uuidv4(),
    ...body,
  };

  const jobs = readJobs();
  jobs.push(newJob);
  writeJobs(jobs);

  return NextResponse.json(newJob, { status: 201 });
}