import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

function AddJob() {
  const {
    showAlert,
    isLoading,
    isEditing,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    statusOptions,
    handleChange,
    status,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "Edit job" : "add job"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            onChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            onChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            onChange={handleJobInput}
            labelText="Job location"
          />
          <FormRowSelect
            name="status"
            value={status}
            onChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            value={jobType}
            list={jobTypeOptions}
            name="jobType "
            onChange={handleJobInput}
            labelText="job type"
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-lock submit-btn"
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
export default AddJob;
