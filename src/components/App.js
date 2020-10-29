import React, { useEffect } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

// Api
import api from '../utils/api';
import authApi from '../utils/authApi';

// components
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';


function App() {

  // переменные состояний видимости попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isConfirmDeleteCardPopupOpen, setConfirmDeleteCardPopupOpen] = React.useState(false);

  //
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({name: "", about: ""});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccessAuth, setIsSuccessAuth] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmDeleteCardClick(card) {
    setConfirmDeleteCardPopupOpen(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(undefined);
    setConfirmDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsSuccessAuth(false);
  }

  // обработчик обновления данных пользователя
  function handleUpdateUser(newInfo) {
    api.setUserInfo(newInfo)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обработчик обновления аватара
  function handleUpdateAvatar(newAvatar) {
    api.setUserAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обработчик постановки/снятия лайка карточек
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard.data : c);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обработчик удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((card) => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обработчик добавления новой карточки
  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((newCard) => {
        if(!newCard) {
          throw new Error({message: 'проверьте введенные данные'})
        }
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // эффект для закрытия попапов кликом на оверлей или по нажатию клавиши "ESC"
  React.useEffect(() => {
    function handleCloseByOverlayClickAndPressEscape(e) {
      if (e.key === 'Escape' || e.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', handleCloseByOverlayClickAndPressEscape);
    document.addEventListener('keydown', handleCloseByOverlayClickAndPressEscape);

    return () => {
      document.removeEventListener('click', handleCloseByOverlayClickAndPressEscape);
      document.removeEventListener('keydown', handleCloseByOverlayClickAndPressEscape);
    }
  })

  // обработчик формы компонента Register
  function onRegister(authData) {
    authApi.registerUser(authData)
      .then((res) => {
        if (res) {
          setIsSuccessAuth(true);
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      })
  }

  // обработчик формы компонента Login
  function onLogin(authData) {
    authApi.loginUser(authData)
      .then((data) => {
        if (data) {
          tokenCheck();
          setLoggedIn(true);
          history.push('/');
          return data.token;
        }
        throw new Error('Ошибка авторизации');
      })
      .catch(err => {
        console.log(err);
      })
  }

  //обработчик выхода пользователя
  function onSignOut() {
    localStorage.removeItem('token');
    setEmail('');
    setLoggedIn(false);
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      Promise.all([api.getInitialCards(token), authApi.getContent(token)])
        .then(([data, user]) => {
          setCards(data);
          setCurrentUser(user.data)
          setEmail(user.data.email);
        })
        .then(() => {
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [])


  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>

        <Header
          linkTo='/signup'
          linkTitle='Регистрация'
          signOut={onSignOut}
          email={email}
          loggedIn={loggedIn}
        />

        <Switch>

          <ProtectedRoute
            exact path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmDeleteCardClick}
            cards={cards}
          />

          <Route path='/signup'>
            <Register onRegister={onRegister} />
          </Route>

          <Route path='/signin'>
            <Login onLogin={onLogin} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>

        </Switch>

        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccessAuth}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />


      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
