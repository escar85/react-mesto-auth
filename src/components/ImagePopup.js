import React from 'react';

function ImagePopup(props) {
  return (
    <figure className={`popup popup_big-image ${props.card && 'popup_opened'}`}>
      <div className="popup__image-box">
        <img alt={props.card ? props.card.name : ''} className="popup__image" src={props.card ? props.card.link : ''} />
        <figcaption className="popup__image-caption">{props.card ? props.card.name : ''}</figcaption>
        <button type="button" aria-label="close" className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </figure>
  );
}

export default ImagePopup;
