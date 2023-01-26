import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

function Profile() {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ currentUser: { name, email, lastName, location } });
  };

  return (
    <Wrapper>
      <form action="" className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            name="lastName"
            value={lastName}
            labelText="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-lock" type="submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
export default Profile;
