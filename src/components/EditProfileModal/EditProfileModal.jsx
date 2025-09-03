import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

export default function EditProfileModal({
  onClose,
  isOpen,
  onEditProfileModalSubmit,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [user, setUser] = useState({ name: "", avatar: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileModalSubmit({ name: user.name, avatar: user.avatar });
  };
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser, isOpen]);
  return (
    <ModalWithForm
      buttonText="Save changes"
      isLogin={true}
      isEditProfile={true}
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={user.name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={user.avatar}
        />
      </label>
    </ModalWithForm>
  );
}
