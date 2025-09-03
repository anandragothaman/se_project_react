import "./ModalWithForm.css";
import close from "../../assets/close-dark.svg";
function ModalWithForm({
  children,
  buttonText,
  isLogin,
  isRegister,
  isEditProfile,
  title,
  isOpen,
  onClose,
  onSubmit,
  handleLogInClick,
  handleSignUpClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close icon" className="modal__close-icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__line">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>{" "}
            {isLogin && !isRegister && !isEditProfile && (
              <p className="modal__login">
                or{" "}
                <span className="modal__login-text" onClick={handleSignUpClick}>
                  Register
                </span>
              </p>
            )}
            {isRegister && !isLogin && !isEditProfile && (
              <p className="modal__login">
                or{" "}
                <span className="modal__login-text" onClick={handleLogInClick}>
                  Log in
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
