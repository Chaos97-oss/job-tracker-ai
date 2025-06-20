import JobForm from "@/components/JobForm";
import { readJobs } from "@/lib/jobsStorage";
import { notFound } from "next/navigation";
import { Job } from "@/types/job";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditJobPage({ params }: Props) {
  const { id } = params;
  const jobs: Job[] = readJobs();

  const job = jobs.find((j) => j.id.trim() === id.trim());

  if (!job) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <JobForm existingJob={job} isEdit />
    </main>
  );
}