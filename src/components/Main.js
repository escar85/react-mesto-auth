import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__info">
          <img alt="аватар пользователя" src={currentUser.avatar} className="profile__avatar" onClick={props.onEditAvatar} />
          <div className="profile__block">
            <div className="profile__name-area">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" aria-label="edit-profile" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" aria-label="add-card" className="profile__card-add-button" onClick={props.onAddPlace}></button>
      </section>

      <ul className="elements">
        {props.cards.map((item, i) => (
          <Card
            card={item}
            key={i}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </ul>
    </>
  );
}

export default Main;
