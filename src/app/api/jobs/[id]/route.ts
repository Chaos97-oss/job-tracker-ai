import { NextRequest, NextResponse } from "next/server";
import { readJobs, writeJobs } from "@/lib/jobsStorage";
import { Job } from "@/types/job";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const body = await req.json();
  const jobs: Job[] = readJobs();
  const updatedJobs = jobs.map((job) =>
    job.id === params.id ? { ...job, ...body } : job
  );

  writeJobs(updatedJobs);
  return NextResponse.json({ message: "Updated successfully" });
}

export async function DELETE(_: NextRequest, { params }: RouteParams) {
  const jobs: Job[] = readJobs();
  const filteredJobs = jobs.filter((job) => job.id !== params.id);
  writeJobs(filteredJobs);

  return NextResponse.json({ message: "Deleted successfully" });
}