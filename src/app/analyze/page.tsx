"use client";
import { useState } from "react";

export default function AnalyzePage() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null); // Clear previous result
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 Job Description Analyzer</h1>

      <textarea
        rows={10}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Paste a job description here..."
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Analyzing...
          </span>
        ) : (
          "Analyze"
        )}
      </button>

      {/* Handle errors or malformed data */}
      {result?.error && (
        <p className="mt-4 text-red-500 font-semibold">❌ {result.error}</p>
      )}

      {/* Only render summary and skills if they exist */}
      {result?.summary && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <p>{result.summary}</p>
        </div>
      )}

      {result?.skills && Array.isArray(result.skills) && result.skills.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          <ul className="list-disc ml-5">
            {result.skills.map((skill: string, idx: number) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}