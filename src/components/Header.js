import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../src/images/logo__mesto.svg';

function Header(props) {

  const [linkTo, setLinkTo] = React.useState('');
  const [linkTitle, setLinkTitle] = React.useState('');
  const url = useLocation();

  function handleChangeLink() {
    if (url.pathname === '/signin') {
      setLinkTo('/signup');
      setLinkTitle('Зарегистрироваться')
    } else {
      setLinkTo('/signin');
      setLinkTitle('Войти');
    }
  }

  React.useEffect(() => {
    handleChangeLink();
  });

  return (
    <header className="header">
      <img src={logo} alt="места России" className="header__logo" />
      <div className="header__box">

        {props.loggedIn ?
          <>
            <h3 className="header__user-email">{props.email}</h3>
            <Link to='/signin' onClick={props.signOut} className="header__link">Выйти</Link>
          </>
          : <Link to={linkTo} className="header__link">{linkTitle}</Link>
        }
      </div>
    </header>
  );
}

export default Header;
