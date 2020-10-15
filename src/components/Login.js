import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {

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
    props.onLogin({
      password,
      email
    })
  }

  return (
    <form name='login' onSubmit={handleSubmit} method="post" action="#" className="entry-form" noValidate>
      <h3 className="entry-form__title">Вход</h3>
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
      <button type="submit" className="entry-form__submit-button">Войти</button>
      <Link to='/sign-up' className="entry-form__link">Ещё не зарегистрированы? Регистрация</Link>
    </form>
  );
}

export default Login;
