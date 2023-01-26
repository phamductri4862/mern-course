import React, { Fragment } from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

function Landing() {
  const { user } = useAppContext();
  return (
    <Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page ">
          {/* !INFO */}
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              adipisci nam natus ipsum saepe, debitis labore quam quas omnis
              perspiciatis ad cum voluptatum reiciendis officia iusto sapiente
              molestias, voluptate, fuga tenetur odio eaque! Aspernatur dolor,
              architecto, voluptates, autem asperiores harum quibusdam eveniet
              eius optio unde porro maiores sapiente iure accusantium.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          {/* !END OF INFO */}
          {/* IMAGE */}
          <img src={main} alt="job hunt" className="img main-img" />
          {/* END OF IMAGE */}
        </div>
      </Wrapper>
    </Fragment>
  );
}

export default Landing;
