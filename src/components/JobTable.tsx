"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Job } from "@/types/job";

export default function JobTable() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to fetch jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } else {
      alert("❌ Failed to delete job");
    }
  };

  if (loading) {
    return <p className="text-white p-4">Loading jobs...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Link</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="p-2 text-white border">{job.title}</td>
              <td className="p-2 text-white border">{job.company}</td>
              <td className="p-2 text-white border">{job.status}</td>
              <td className="p-2 text-white border">
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              </td>
              <td className="p-2 text-white border flex gap-2">
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                <Link
                  href={`/edit/${job.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}