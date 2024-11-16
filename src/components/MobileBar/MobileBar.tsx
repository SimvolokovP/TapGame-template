import { NavLink } from "react-router-dom";
import { navLinks } from "../../utils/utils";
import "./MobileBar.scss";

const MobileBar = () => {
  return (
    <div className="container">
      <div className="mobile-bar">
        <ul className="list-reset mobile-bar__list">
          {navLinks.map((link) => (
            <li key={link.to} className="mobile-bar__list--item">
              <NavLink
                className={(e) =>
                  e.isActive ? "mobile-bar__link active" : "mobile-bar__link"
                }
                to={link.to}
              >
                {<link.icon size={24} />}
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileBar;
