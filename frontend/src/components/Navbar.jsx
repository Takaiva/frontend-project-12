import React from 'react';
import { useTranslation } from 'react-i18next';

import { Navbar, Container } from 'react-bootstrap';

import { useAuth } from '../hooks';
import routes from '../routes.js';

function NavbarLayout() {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();

  return (
    <Navbar
      bg="dark"
      className="shadow-sm"
      expand="lg"
    >
      <Container>
        <Navbar.Brand
          className="atures-font"
          href={routes.chatPagePath()}
        >
          Hexlet Chat
        </Navbar.Brand>

        { (user ? <button
          className="btn logout"
          onClick={logOut}
          type="button"
                  >
          {t('logout')}
        </button> : null) }
      </Container>
    </Navbar>
  );
}

export default NavbarLayout;
