import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import AppContext from "../../Contexts/AppContext";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

export default function SideBar({ onEditProfileModalSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignout = () => {
    removeToken();
    setIsLoggedIn(false);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img
          src={currentUser.avatar ? currentUser.avatar : avatar}
          alt={currentUser.name + " avatar"}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__line">
        <p className="sidebar__profile-data" onClick={onEditProfileModalSubmit}>
          Change profile data
        </p>
        <p className="sidebar__logout" onClick={handleSignout}>
          Log out
        </p>
      </div>
    </div>
  );
}
