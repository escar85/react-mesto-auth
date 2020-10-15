import React from 'react';

function InfoTooltip(props) {

  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className={`popup__infoTooltip-image_${props.isSuccess ? 'success' : 'error'}`} />
        <h3 className="popup__infoTooltip-title">{` ${props.isSuccess
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Попробуйте еще раз.'}`}
        </h3>
        <button type="button" aria-label="close" className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
