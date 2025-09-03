import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import AppContext from "../../Contexts/AppContext";
function Header({
  handleAddClick,
  handleSignUpClick,
  handleLogInClick,
  weatherData,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(AppContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const parts = fullName.split(" ");
    let initials = "";
    if (parts.length > 0) {
      initials += parts[0].charAt(0).toUpperCase();
    }
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  };

  const initials = getInitials(name);
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>{" "}
              <img
                src={avatar}
                alt={currentUser.name + " avatar"}
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleSignUpClick}
            type="button"
            className="header__sign-up-btn"
          >
            Sign up
          </button>
          <button
            onClick={handleLogInClick}
            type="button"
            className="header__log-in-btn"
          >
            Log in
          </button>
        </>
      )}
    </header>
  );
}
export default Header;
