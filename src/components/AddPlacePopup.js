import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const placeName = React.useRef();
  const placeLink = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: placeName.current.value,
      link: placeLink.current.value
    });
    placeName.current.value = '';
    placeLink.current.value = '';
  }

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Название"
        ref={placeName}
        defaultValue=""
        required
        minLength="1"
        maxLength="30"
        className="popup__input"
        id="cardName"
      />
      <span className="popup__input_type_error" id="cardName-error"></span>
      <input
        type="url"
        name="link"
        ref={placeLink}
        placeholder="Ссылка на картинку"
        defaultValue=""
        required
        className="popup__input"
        id="linkPhoto"
      />
      <span className="popup__input_type_error" id="linkPhoto-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
