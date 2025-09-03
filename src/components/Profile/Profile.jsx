import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  handleAddClick,
  onCardClick,
  clothingItems,
  weatherData,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}
