"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Job } from "@/types/job";

type JobFormProps = {
  existingJob?: Job;
  isEdit?: boolean;
};

export default function JobForm({ existingJob, isEdit = false }: JobFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<Job, "id">>({
    title: existingJob?.title || "",
    company: existingJob?.company || "",
    link: existingJob?.link || "",
    status: existingJob?.status || "Applied",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = isEdit ? "PUT" : "POST";
    const endpoint = isEdit && existingJob?.id ? `/api/jobs/${existingJob.id}` : "/api/jobs";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("❌ Failed to save job. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Company Name</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Application Link</label>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save Job
      </button>
    </form>
  );
}