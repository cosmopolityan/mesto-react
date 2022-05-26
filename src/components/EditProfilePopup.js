import React, { useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loading, isValid, errorMessage }) {
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleInputChange(e) {
    setName(e.target.value);
  }
  function handleInputDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description
    })
  }

  return (

    <PopupWithForm 
    title={"Редактировать профиль"} 
    name={"edit-profile_form"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>

    <input 
    value={name}
    onChange={handleInputChange}
    type="text" 
    autoComplete="name" 
    autoCapitalize="words" 
    className="popup__input" 
    name="name" 
    id="profile-name" 
    placeholder="Имя"
    minLength="2" 
    maxLength="40" 
    required
    // className={`"popup__error popup__error_type_name" id="profile-name-error"}`}
    />

    <input
    value={description}
    onChange={handleInputDescription} 
    type="text" 
    className="popup__input" 
    name="job" 
    id="job" 
    placeholder="О себе" 
    minLength="2" 
    maxLength="200" 
    required
    // className={`"popup__error popup__error_type_job" id="profile-job-error"}`}
    />
  </PopupWithForm>
  )
}

export default EditProfilePopup;