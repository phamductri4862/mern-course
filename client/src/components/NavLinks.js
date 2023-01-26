import links from "../utils/links";
import { NavLink } from "react-router-dom";

function NavLinks({ toggleSidebar }) {
  return links.map(({ text, path, id, icon }) => {
    return (
      <NavLink
        to={path}
        key={id}
        onClick={toggleSidebar}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <span className="icon">{icon}</span>
        {text}
      </NavLink>
    );
  });
}
export default NavLinks;
