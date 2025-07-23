import "./ItemModal.css";
import close from "../../assets/close.svg";
function ItemModal({ isOpen, card, onClose, onDeleteItem }) {
  const handDeleteItem = () => {
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
          <p className="modal__delete" onClick={handDeleteItem}>
            Delete item
          </p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
