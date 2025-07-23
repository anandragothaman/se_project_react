import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>{" "}
    </div>
  );
}
