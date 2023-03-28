import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/media/KrainovLogoWhite.png";

import "./Layout.scss";
export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      <div className="header">
        <NavLink to={`/`} className="header__logo">
          <img src={logo} alt="" />
        </NavLink>
        <div className="header__nav-bar">
          <NavLink to={"/"} className="header__nav-bar-item">
            Главная
          </NavLink>
        </div>
      </div>

      {children}
    </div>
  );
};
