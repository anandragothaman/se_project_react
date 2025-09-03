import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

export default function ClothesSection({
  handleAddClick,
  onCardClick,
  clothingItems,
  weatherData,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__your-items">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-clothes-btn header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          if (item.owner !== currentUser._id) return null;
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
