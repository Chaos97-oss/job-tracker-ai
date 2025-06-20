import JobForm from "@/components/JobForm";
import { readJobs } from "@/lib/jobsStorage";
import { notFound } from "next/navigation";

type Job = {
  id: string;
  title: string;
  company: string;
  link: string;
  status: string;
};

type Props = {
  params: {
    id: string;
  };
};

export default async function EditJobPage(props: Props) {
  const id = props.params.id;
  const jobs: Job[] = readJobs();

  const job = jobs.find((j: Job) => j.id.trim() === id.trim());

  if (!job) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <JobForm existingJob={job} isEdit />
    </main>
  );
}