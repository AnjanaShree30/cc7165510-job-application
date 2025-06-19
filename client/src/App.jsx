import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import JobForm from "./components/JobForm";
import EditJob from "./components/EditJob";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to fetch jobs", err));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
    });
    setJobs(jobs.filter((job) => job._id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<Home jobs={jobs} onDelete={handleDelete} />} />
        <Route path="/add" element={<JobForm jobs={jobs} setJobs={setJobs} mode="add" />} />
        <Route path="/edit/:id" element={<EditJob />} /> 
      </Routes>
    </Router>
  );
}

export default App;
