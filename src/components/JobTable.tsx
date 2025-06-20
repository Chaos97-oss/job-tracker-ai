"use client";
import { useEffect, useState } from "react";
import Link from "next/link";


type Job = {
  id: string;
  title: string;
  company: string;
  link: string;
  status: string;
};

export default function JobTable() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then(setJobs);
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };

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
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View
                </a>
              </td>
              <td className="p-2 text-white border">
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-500 hover:text-red-700 mr-2"
                >
                  Delete
                </button>
                <Link href={`/edit/${job.id}`} className="text-blue-500 hover:underline mr-2">
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