import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React, { useEffect } from 'react';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [editButtonText, setEditButtonText] = React.useState('Сохранить');

  const [delButtonText, setDelButtonText] = React.useState('Да');

  const [avatarButtonText, setAvatarButtonText] = React.useState('Сохранить')

  const [placeButtonText, setPlaceButtonText] = React.useState('Создать')

  const [currentUser, setCurrentUser] = React.useState(React.useContext(CurrentUserContext))

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);

    setSelectedCard({});
  }

  useEffect(() => {
    api.getProfileInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  function handleUpdateUser(data) {
    setEditButtonText('Сохранение...')
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditButtonText('Сохранить')
      })
  }

  function handleUpdateAvatar(data) {
    setAvatarButtonText('Сохранение...')
    api.setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAvatarButtonText('Сохранить')
      })
  }

  React.useEffect(() => {

    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function handleCardLike(card) {

    const isLiked = card.likes.some(element => element._id === currentUser._id);

    const changeLike = (newCard) => {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    }

    if (!isLiked) {
      api.setLike(card._id)
        .then((newCard) => {
          changeLike(newCard)
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      api.deleteLike(card._id)
        .then((newCard) => {
          changeLike(newCard)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleCardDelete(deletedCard) {
    setDelButtonText('Удаление...')
    api.deleteItem(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((item) => item !== deletedCard);
        setCards(newCards);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDelButtonText('Да')
      })
  }

  function handleAddPlaceSubmit(newCard) {
    setPlaceButtonText('Сохранение...')
    api.postItem(newCard) // error_2905
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPlaceButtonText('Создать')
      })
  }

  return (
    <>
      <body class="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />

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
            buttonText={placeButtonText}
          />

          <PopupWithForm onClose={closeAllPopups} title="Вы уверены?" name="delete-confirmation" buttonTitle="Да" />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        </CurrentUserContext.Provider>

      </body>

    </>
  );
}

export default App;
