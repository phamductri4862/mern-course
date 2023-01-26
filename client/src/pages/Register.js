import React from "react";
import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, isMember } = values;
    if ((!name && !isMember) || !email || !password) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login successful. Redirecting....",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "Create successful. Redirecting....",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button disabled={isLoading} type="submit" className="btn btn-block">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() =>
            setupUser({
              currentUser: { email: "test@test.com", password: "111111" },
              endPoint: "login",
              alertText: "Log in. Redirecting....",
            })
          }
        >
          {isLoading ? "Loading..." : "Demo App"}
        </button>
        <p>
          {!values.isMember ? "Already a member?" : "Not a member yet?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {!values.isMember ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
