import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const userAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: userAvatar.current.value
    });
    userAvatar.current.value = '';
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        ref={userAvatar}
        placeholder="Ссылка на картинку"
        required className="popup__input"
        id="linkAvatar"
      />
      <span className="popup__input_type_error" id="linkAvatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
