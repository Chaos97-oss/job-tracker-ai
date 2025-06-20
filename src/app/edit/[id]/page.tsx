import { notFound } from "next/navigation";
import JobForm from "@/components/JobForm";
import { readJobs } from "@/lib/jobsStorage";
import { Job } from "@/types/job";

type PageProps = {
  params: { id: string };
};

export default function EditJobPage({ params }: PageProps) {
  const jobs: Job[] = readJobs();
  const job = jobs.find((j) => j.id === params.id);

  if (!job) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <JobForm existingJob={job} isEdit />
    </main>
  );
}