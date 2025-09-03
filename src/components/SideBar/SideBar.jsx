import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";
import AppContext from "../../Contexts/AppContext";

export default function SideBar() {
  const currentUser = useContext(CurrentUserContext);
  const { setIsLoggedIn } = useContext(AppContext);
  const handleSignout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img
          src={avatar}
          alt={currentUser.name + " avatar"}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__line">
        <p className="sidebar__profile-data">Change profile data</p>
        <p className="sidebar__logout" onClick={handleSignout}>
          Log out
        </p>
      </div>
    </div>
  );
}
