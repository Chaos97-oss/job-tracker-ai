import JobTable from "@/components/JobTable";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Tracker Dashboard</h1>
      <JobTable />
    </main>
  );
}