import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  // проверяем являемся ли мы владельцем карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // переменная учтанавливает видимость кнопки "удаления карточки" в зависимости от владельца карточки
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? '' : 'element__delete-button_hidden'}`
  )

  const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

function handleLikeClick() {
  props.onCardLike(props.card);
}

function handleDeleteClick() {
  props.onCardDelete(props.card);
}

  return (
    <li className="element">
      <img alt={props.card.name} className="element__image" src={props.card.link} onClick={handleClick} />
      <button type="button" aria-label="delete" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-area">
          <button type="button" aria-label="like" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );


}

export default Card;
