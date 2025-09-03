import "./ItemCard.css";
import { useContext } from "react";
import AppContext from "../../Contexts/AppContext";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
function ItemCard({ item, onCardClick, onCardLike }) {
  const { isLoggedIn } = useContext(AppContext);
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };
  return (
    <li className="card">
      <h2 className="card__name">
        <span className="card__name-text"> {item.name} </span>
        {isLoggedIn && isLiked && (
          <span
            type="button"
            onClick={handleLike}
            className="card__like-button card__like-button_liked"
          ></span>
        )}
        {!isLiked && isLoggedIn && (
          <span
            type="button"
            onClick={handleLike}
            className="card__like-button"
          ></span>
        )}
      </h2>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}
export default ItemCard;
