import '../App.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import React from 'react';
import { useState, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { InfoToolTip } from './InfoTooltip';
import { getContent } from '../utils/auth'
import ProtectedRoute from './ProtectedRoute';
import { authorize } from '../utils/auth';
import { register } from '../utils/auth';

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: 'Загрузка' });
  const [isProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [email, setEmail] = useState("")
  const [isAddPlacePopupOpen, setIsCardPopupOpened] = useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpened] = useState(false);
  const [isInfoToolTopOpened, setIsInfoToolTopOpened] = useState(false)
  const [isRegisterSucces, setIsRegisterSucces] = useState(false)
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isProfilePopupOpened || isAddPlacePopupOpen || selectedCard;
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    tokenCheck();
  }, [])

  // Проверка токена
  function tokenCheck() {
    const jwt = localStorage.getItem("token")
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          setLoggedIn(true)
          console.log(loggedIn)
          setEmail(res.data.email)
          navigate("/cards")
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  // Запрс карточек и информации профиля
  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((res) => {
          setCards(res)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  // Закрытие на Escape
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  // Регистрация
  function handleRegister(value) {
    register(value)
      .then(() => {
        registrationState(true)
        navigate("/signin")
      })
      .catch((err) => {
        registrationState(false)
        console.log(`Ошибка: ${err}`);
      })
  }

  // Авторизация
  function handleLogin(data) {
    authorize(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token)
          navigate("/cards")
        }
      }
      )
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleLoggedIn(value) {
    setEmail(value)
    setLoggedIn(true)
  }

  // ЛАЙК
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  // Обновление информации пользователя
  function handleUpdateUser(data) {
    setIsLoading(true)
    api.updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }
  // Обновление аватара
  function handleUpdateAvatar(link) {
    setIsLoading(true)
    api.updateAvatar(link)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  // Добавление новой карточки
  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addNewCard(data)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  // Переключение Попапов
  function handleEditAvatarClick() {
    setIsAvatarPopupOpened(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(!isProfilePopupOpened)
  }

  function handleAddPlaceClick() {
    setIsCardPopupOpened(!isAddPlacePopupOpen)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpened(false);
    setIsCardPopupOpened(false);
    setIsAvatarPopupOpened(false);
    setSelectedCard(null);
    setIsInfoToolTopOpened(false)
  }

  function registrationState(state) {
    setIsInfoToolTopOpened(!isInfoToolTopOpened)
    setIsRegisterSucces(state)
  }

  return (
    < div className="body" >
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>

            <Route path='/cards' element={
              <ProtectedRoute
                loggedIn={setLoggedIn}
                email={email}
                isOpen={isProfilePopupOpened}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                element={Main}
              />
            } />
            <Route path='/signup' element={<Register onRegister={handleRegister} />} />
            <Route path='/signin' element={<Login onLogin={handleLogin} handleLoggedIn={handleLoggedIn} />} />
            <Route path='*' element={loggedIn ? (<Navigate to='/cards' />) : (<Navigate to='signin' />)} />
          </Routes>

          <Footer />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditProfilePopup isLoading={isLoading} isOpen={isProfilePopupOpened} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} />

          <EditAvatarPopup isLoading={isLoading} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />

          <AddPlacePopup isLoading={isLoading} isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} />
          <InfoToolTip text={isRegisterSucces ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."} isOpen={isInfoToolTopOpened} onClose={closeAllPopups} />

          {/*  popup question */}
          <PopupWithForm name="question" isLoading={isLoading} title="Вы уверены?" onClose={closeAllPopups} buttonText="Да" />
        </CurrentUserContext.Provider>
      </div>
    </div >

  );
}

export default App;
