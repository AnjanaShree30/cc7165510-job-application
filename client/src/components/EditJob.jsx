import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    email: '',
    description: '',
  });

  useEffect(() => {
    fetch(`${import.meta.VITE_BACKEND_URL}/api/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => {
        console.error("Error fetching job data:", err);
        alert("Failed to fetch job");
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.VITE_BACKEND_URL}/api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Job updated successfully");
      navigate("/jobs");
    } else {
      alert("Failed to update job");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "company", "location", "email", "description"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            {field === "description" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Job
        </button>
      </form>
    </div>
  );
}

export default EditJob;
