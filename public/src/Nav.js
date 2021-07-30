import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Nav.css";
import caret from "./icons/caret.png";
import Menu from "./menu/Menu";

function Nav() {
  const [show, handleShow] = useState(false);
  const history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  

  return (
    <>
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push("/")}
          className="nav__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <div className="nav__headings">
          <ul className="nav__headings__ul">
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <li>My List</li>
          </ul>
        </div>
        <div className="menu__dropdown">
        <div className="nav__profile">
          <img
            className="nav__avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <img className="nav__caret" src={caret} alt="" />
          
          <div className="menu__dropdown__content ">
          <Menu />
          </div>
        </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Nav;
