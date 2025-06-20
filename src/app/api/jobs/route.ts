import { NextResponse } from "next/server";
import { readJobs, writeJobs } from "@/lib/jobsStorage";
import { v4 as uuidv4 } from "uuid";
import { Job } from "@/types/job";

export async function GET() {
  const jobs: Job[] = readJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const body = await req.json();

  // Ensure that body matches Job fields except for ID
  const newJob: Job = {
    id: uuidv4(),
    title: body.title,
    company: body.company,
    link: body.link,
    status: body.status,
  };

  const jobs: Job[] = readJobs();
  jobs.push(newJob);
  writeJobs(jobs);

  return NextResponse.json(newJob, { status: 201 });
}