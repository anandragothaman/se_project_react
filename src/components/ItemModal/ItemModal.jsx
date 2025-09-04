import "./ItemModal.css";
import close from "../../assets/close.svg";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";
function ItemModal({ isOpen, card, onClose, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const handleDeleteItem = () => {
    onDeleteItem(card._id);
  };
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close icon" className="modal__close-icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__left-section">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              type="button"
              className="modal__delete"
              onClick={handleDeleteItem}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
