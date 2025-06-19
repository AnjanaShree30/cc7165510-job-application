import JobCard from '../components/JobCard';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/jobs`)
            .then((res) => res.json())
            .then((data) => setJobs(data))
            .catch((error) => {
                console.error("Error fetching jobs:", error);
                alert("Failed to fetch jobs. Please try again.");
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setJobs((prev) => prev.filter((job) => job._id !== id));
                alert("Job deleted successfully");
            } else {
                alert("Failed to delete job");
            }
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Error occurred while deleting job.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            {/* Quote and Add Button */}
            <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4 md:mb-0">
                    Dreams are extremely important. You can’t do it unless you imagine it
                </h1>
                <Link
                    to="/add"
                    className="border border-blue-500 text-blue-500 bg-white hover:bg-blue-500 hover:text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-md"
                >
                    + Add Job
                </Link>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {jobs.length === 0 ? (
                    <p className="text-gray-500 text-center col-span-full">No jobs posted yet.</p>
                ) : (
                    jobs.map((job) => (
                        <JobCard key={job._id} job={job} onDelete={handleDelete} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
