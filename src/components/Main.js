import React from 'react';
import { api } from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {

    api.getInitialData()
      .then((arg) => {
        const [userData, initialCards] = arg;
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar)
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-block">
          <img className="profile__avatar" src={userAvatar} alt={userName} />
          <div className="profile__background" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} aria-label="Добавить новую карточку"></button>
      </section>

      {/* Карточки грузятся ок */}

      <section className="elements">
        <ul className="elements__list">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>

    </main>
  );
}

export default Main;