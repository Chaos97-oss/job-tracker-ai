import { NextResponse } from "next/server";
import { readJobs, writeJobs } from "@/lib/jobsStorage";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const jobs = readJobs();
  const updatedJobs = jobs.map((job: any) =>
    job.id === params.id ? { ...job, ...body } : job
  );

  writeJobs(updatedJobs);
  return NextResponse.json({ message: "Updated successfully" });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const jobs = readJobs();
  const filteredJobs = jobs.filter((job: any) => job.id !== params.id);
  writeJobs(filteredJobs);

  return NextResponse.json({ message: "Deleted successfully" });
}
