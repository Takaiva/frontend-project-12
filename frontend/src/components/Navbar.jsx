import React from 'react';
import { useTranslation } from 'react-i18next';

import { Navbar, Container } from 'react-bootstrap';

import { useAuth } from '../hooks';
import routes from '../routes.js';

const NavbarLayout = () => {
  const { t } = useTranslation();
  const { user, logOut } = useAuth();

  return (
      <Navbar bg="dark" expand="lg" className="shadow-sm">
          <Container>
              <Navbar.Brand href={routes.chatPagePath()} className="atures-font">
                  Hexlet Chat
              </Navbar.Brand>
              { user ? <button type="button" className="btn logout" onClick={logOut}>{t('logout')}</button> : null }
          </Container>
      </Navbar>
  );
};

export default NavbarLayout;
