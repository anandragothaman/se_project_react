import "./ModalWithForm.css";
import close from "../../assets/close-dark.svg";
function ModalWithForm({
  children,
  buttonText,
  isLogin,
  isRegister,
  title,
  isOpen,
  onClose,
  onSubmit,
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
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>{" "}
          {isLogin && !isRegister && (
            <p>
              or <span>Register</span>
            </p>
          )}
          {isRegister && !isLogin && (
            <p>
              or <span>Log in</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
