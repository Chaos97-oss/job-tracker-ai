/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { readJobs, writeJobs } from "@/lib/jobsStorage";
import { Job } from "@/types/job";

export async function PUT(
  req: NextRequest,
  context: any // yes, back to any
) {
  const body = await req.json();
  const { id } = context.params;

  const jobs: Job[] = readJobs();
  const updatedJobs = jobs.map((job) =>
    job.id === id ? { ...job, ...body } : job
  );

  writeJobs(updatedJobs);
  return NextResponse.json({ message: "Updated successfully" });
}

export async function DELETE(
  _: NextRequest,
  context: any
) {
  const { id } = context.params;
  const jobs: Job[] = readJobs();
  const filteredJobs = jobs.filter((job) => job.id !== id);

  writeJobs(filteredJobs);
  return NextResponse.json({ message: "Deleted successfully" });
}