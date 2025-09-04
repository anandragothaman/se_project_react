import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import * as api from "../../utils/api";
import { signIn, signUp } from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AppContext from "../../Contexts/AppContext";
import * as auth from "../../utils/auth";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLogInClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleRegisterModalSubmit = ({ email, password, name, avatar }) => {
    auth
      .signUp({ email, password, name, avatar })
      .then((data) => {
        handleLoginModalSubmit({ email, password });
      })
      .catch(console.error);
  };

  const handleEditProfileModalSubmit = ({ name, avatar }) => {
    const jwt = getToken();
    if (!jwt) {
      setIsLoggedIn(false);
      return;
    }
    api
      .setUserInfo({ name, avatar }, jwt)
      .then(({ name, email, avatar, _id }) => {
        setCurrentUser({ name, email, avatar, _id });
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLoginModalSubmit = ({ email, password }) => {
    auth
      .signIn({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const jwt = getToken();

    if (!jwt) {
      setIsLoggedIn(false);
      return;
    }
    api
      .addItems({ name, imageUrl, weather }, jwt)
      .then((data) => {
        setClothingItems((prevItems) => [data, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };
  const handleDeleteItem = (id) => {
    const jwt = getToken();

    if (!jwt) {
      setIsLoggedIn(false);
      return;
    }
    api
      .deleteItem(id, jwt)
      .then(() => {
        //const updatedRecords = clothingItems.filter((item) => item._id !== id);
        setClothingItems((prevItems) => {
          return prevItems.filter((item) => item._id !== id);
        });
        closeActiveModal();
      })
      .catch(console.error);
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      setIsLoggedIn(false);
      return;
    }
    api
      .getUserInfo(jwt)
      .then(({ name, email, avatar, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, email, avatar, _id });
      })
      .catch(console.error);
  }, [isLoggedIn]);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                handleSignUpClick={handleSignUpClick}
                handleLogInClick={handleLogInClick}
                weatherData={weatherData}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        handleAddClick={handleAddClick}
                        weatherData={weatherData}
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onEditProfileModalSubmit={handleEditProfileClick}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegisterModalSubmit={handleRegisterModalSubmit}
              handleLogInClick={handleLogInClick}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLoginModalSubmit={handleLoginModalSubmit}
              handleSignUpClick={handleSignUpClick}
            />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onDeleteItem={handleDeleteItem}
              onClose={closeActiveModal}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onEditProfileModalSubmit={handleEditProfileModalSubmit}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
