import Wrapper from "../assets/wrappers/SmallSidebar.js";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext.js";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import links from "../utils/links";
import NavLinks from "./NavLinks.js";

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            <NavLinks toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default SmallSidebar;
