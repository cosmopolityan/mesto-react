import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [delButtonText, setDelButtonText] = React.useState('Да');

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

  api.getProfileInfo()
    .then((userData) => {
      setCurrentUser(userData);
    })
    .catch((err) => {
      console.log(err);
    });

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
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

  return (
    <>
      <body class="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
          />
          <Footer />

          <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" name="edit-profile_form">
            <input type="text" autoComplete="name" autoCapitalize="words" className="popup__input" name="name" id="profile-name" placeholder="Имя" minLength="2" maxLength="40" required />
            <p className="popup__error popup__error_type_name" id="profile-name-error" />

            <input type="text" className="popup__input" name="job" id="job" placeholder="О себе" minLength="2" maxLength="200" required />
            <p className="popup__error popup__error_type_job" id="profile-job-error" />
          </PopupWithForm>

          <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title="Новое место" name="add-card_form" buttonTitle="Создать">
            <input type="text" className="popup__input" name="title" id="title" placeholder="Название" minLength="2" maxLength="30" required />
            <p className="popup__error popup__error_type_title" id="element-title-error" />

            <input type="url" className="popup__input" name="link" id="photo-link" placeholder="Ссылка на картинку" required />
            <p className="popup__error popup__error_type_photo-link" id="element-link-error" />
          </PopupWithForm>

          <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" name="edit-avatar">
            <input type="url" className="popup__input" name="avatar" id="avatar" placeholder="Ссылка на картинку" required />
            <p className="popup__error popup__error_type_avatar" id="profile-avatar-error" />
          </PopupWithForm>

          <PopupWithForm onClose={closeAllPopups} title="Вы уверены?" name="delete-confirmation" buttonTitle="Да" />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        </CurrentUserContext.Provider>

      </body>

    </>
  );
}

export default App;
