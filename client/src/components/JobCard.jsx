import { useNavigate } from "react-router-dom";
import banner from "../assets/job-banner.jpg"; // Make sure this image exists

function JobCard({ job, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden text-gray-800">
      <img
        src={banner}
        alt="Job Banner"
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
        <p className="text-sm"><strong>Company:</strong> {job.company}</p>
        <p className="text-sm"><strong>Email:</strong> {job.email}</p>
        <p className="text-sm"><strong>Salary:</strong> {job.salary}</p>
        <p className="text-sm"><strong>Location:</strong> {job.location}</p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => navigate(`/edit/${job._id}`)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(job._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
