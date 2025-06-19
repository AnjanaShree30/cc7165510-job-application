import { Link } from "react-router-dom";
import banner from "../assets/landing-banner.jpg";

function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <img
        src={banner}
        alt="Landing Banner"
        className="w-full h-screen object-cover"
      />
      <div className="absolute top-1/4 left-10 md:left-20 bg-white bg-opacity-80 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Job Board
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/jobs"
            className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            View Posted Jobs
          </Link>
          <Link
            to="/add"
            className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-600 hover:text-white transition"
          >
            + Add Job
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
