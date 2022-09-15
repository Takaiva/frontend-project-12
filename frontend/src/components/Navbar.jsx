import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import routes from '../routes.js';
import { useAuth } from '../hooks/';

const NavbarLayout = () => {

    const { user, logOut } = useAuth();
    return (
        <Navbar bg="dark" expand="lg" className="shadow-sm">
            <Container>
               <Navbar.Brand href={routes.chatPagePath()} className="atures-font">
                   Station301
               </Navbar.Brand>
                { user ? <button type="button" className="btn logout" onClick={logOut}>Log out</button> : null }
            </Container>
        </Navbar>
    );
};

export default NavbarLayout;
