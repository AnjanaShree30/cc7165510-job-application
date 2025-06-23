import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JobForm({ mode, jobs, setJobs }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Fetch the job directly if in edit mode
  useEffect(() => {
    if (mode === "edit" && id) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title || "");
          setCompany(data.company || "");
          setEmail(data.email || "");
          setSalary(data.salary || "");
          setLocation(data.location || "");
          setDescription(data.description || "");
        })
        .catch((err) => {
          console.error("Failed to fetch job", err);
          alert("Failed to fetch job data");
        });
    }
  }, [mode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { title, company, email, salary, location, description };

    try {
      let res;
      if (mode === "edit") {
        res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        });
      } else {
        res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jobData),
        });
      }

      if (!res.ok) throw new Error("Failed to submit job");
      const result = await res.json();

      if (mode === "add") {
        setJobs((prev) => [...prev, result]);
        alert("Job added successfully!");
      } else {
        setJobs((prev) =>
          prev.map((job) => (job._id === id ? result : job))
        );
        alert("Job updated successfully!");
      }

      navigate("/jobs");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit job");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {mode === "edit" ? "Edit Job" : "Add Job"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Contact Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          {mode === "edit" ? "Update Job" : "Add Job"}
        </button>
      </form>
    </div>
  );
}

export default JobForm;

