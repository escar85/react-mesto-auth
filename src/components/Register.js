import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] =React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onRegister({
      password,
      email
    })
  }

  return (
    <form name='register' onSubmit={handleSubmit} method="post" action="#" className="entry-form" noValidate>
      <h3 className="entry-form__title">Регистрация</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        defaultValue={email}
        required
        minLength="5"
        maxLength="30"
        className="entry-form__input"
        onChange={handleEmailChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        defaultValue={password}
        required
        minLength="5"
        maxLength="30"
        className="entry-form__input"
        onChange={handlePasswordChange}
      />
      <button type="submit" className="entry-form__submit-button">Зарегистрироваться</button>
      <Link to='/sign-in' className="entry-form__link">Уже зарегистрированы? Войти</Link>
    </form>
  );
}

export default Register;
