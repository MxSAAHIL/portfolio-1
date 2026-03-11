import type { MouseEvent } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const Navbar = () => {
  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, selector: string) => {
    event.preventDefault();
    const section = document.querySelector(selector);
    if (!section) return;
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Portfolio
        </a>
        <a
          href="mailto:muhammedsaahil944@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          muhammedsaahil944@gmail.com
        </a>
        <ul>
          <li>
            <a href="#about" onClick={(event) => handleNavClick(event, "#about")}>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a href="#work" onClick={(event) => handleNavClick(event, "#work")}>
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(event) => handleNavClick(event, "#contact")}
            >
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
