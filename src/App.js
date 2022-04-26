import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <>
      <body class="page">
        <Header />
        <Main />
        <Footer />

        <div class="popup" id="profile_popup">
          <div class="popup__container">
            <button type="button" class="popup__close-button"></button>
            <h2 class="popup__title">Редактировать профиль</h2>
            <form class="popup__form popup__form_type_edit" name="edit-profile_form" noValidate />
            <input type="text" class="popup__input popup__input_type_name" id="name" name="name" placeholder="Имя"
              minLength="2" maxLength="40" required />
            <p class="popup__error popup__error_type_name" id="profile-name-error"></p>
            <input type="text" class="popup__input popup__input_type_job" id="job" name="job" placeholder="О себе"
              minLength="2" maxLength="20" required />
            <p class="popup__error popup__error_type_job" id="profile-job-error"></p>
            <button type="submit" class="popup__button" id="edit-profile-save-button">Сохранить</button>
          </div>
        </div>

        <div class="popup" id="card_popup">
          <div class="popup__container">
            <button type="button" class="popup__close-button"></button>
            <h2 class="popup__title">Новое место</h2>
            <form class="popup__form popup__form_type_add" name="add-card_form" action="#" method="POST" noValidate />
            <input type="text" id="title" class="popup__input popup__input_type_title" name="title" placeholder="Название"
              minLength="2" maxLength="30" required />
            <p class="popup__error popup__error_type_title" id="element-title-error"></p>
            <input type="url" id="photo-link" class="popup__input popup__input_type_link" name="link"
              placeholder="Ссылка на картинку" required />
            <p class="popup__error popup__error_type_photo-link" id="element-link-error"></p>
            <button type="submit" class="popup__button" id="add-card-button">Создать</button>
          </div>
        </div>

        <div class="popup popup-photo">
          <div class="popup-photo__container">
            <figure class="popup-photo__box">
              <button type="button" class="popup__close-button"></button>
              <img src="#" alt="#" class="popup-photo__image" />
              <figcaption class="popup-photo__caption"></figcaption>
            </figure>
          </div>
        </div>

        <div class="popup" id="confirm-delete-card_popup">
          <div class="popup__container">
            <button type="button" class="popup__close-button"></button>
            <h2 class="popup__title">Вы уверены?</h2>
            <form class="popup__form popup__form_type_del" name="del" action="#" method="DELETE" noValidate>
              <button type="submit" class="popup__button" id="delete-card-button">Да</button>
            </form>
          </div>
        </div>

        <div class="popup" id="confirm-edit-profile-avatar_popup">
          <div class="popup__container">
            <button type="button" class="popup__close-button"></button>
            <h2 class="popup__title">Обновить аватар</h2>
            <form class="popup__form" name="edit-avatar" action="#" method="POST" noValidate>
              <input type="url" name="avatar" placeholder="Вставьте ссылку на изображение" id="avatar"
                class="popup__input popup__input_type_avatar" required />
              <span class="popup__error popup__error_type_avatar"></span>
              <button type="submit" class="popup__button" id="edit-profile-avatar-button">Сохранить</button>
            </form>
          </div>
        </div>

        <template id="element-template">
          <li class="element">
            <img class="element__image" />
            <button type="reset" class="element__trash-button"></button>
            <div class="element__container">
              <h2 class="element__title"></h2>
              <div class="element__like">
                <button type="button" class="element__like-button"></button>
                <span class="element__likecounter"></span>
              </div>
            </div>
          </li>
        </template>
      </body>

    </>
  );
}

export default App;
