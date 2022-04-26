import React from 'react';

function handleEditAvatarClick(e) {
  e.preventDefault();
  console.log('Отправлена форма.');
  const test = document.querySelectorAll('#confirm-edit-profile-avatar_popup');
  test.classList.add('.popup__opened');
}

function Main() {
  return (
    <main class="content">
      <section class="profile">
        <div class="profile__avatar-block">
          <img class="profile__avatar" src="#" alt="Ваш аватар" />
          <div class="profile__background" onClick={handleEditAvatarClick}></div>
        </div>
        <div class="profile__info">
          <div class="profile__container">
            <h1 class="profile__name"></h1>
            <button type="button" class="profile__edit-button" aria-label="Редактировать профиль"></button>
          </div>
          <p class="profile__description"></p>
        </div>
        <button type="button" class="profile__add-button" aria-label="Добавить новую карточку"></button>
      </section>

      <section class="elements">
        <ul class="elements__list">

        </ul>
      </section>

    </main>
  );
}

export default Main;