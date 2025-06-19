import JobForm from "../components/JobForm";

function AddJob({ jobs, setJobs }) {
  return <JobForm jobs={jobs} setJobs={setJobs} mode="add" />;
}

export default AddJob;