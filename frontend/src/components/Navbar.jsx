import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import routes from '../routes.js';

const NavbarLayout = () => {

    return (
        <Navbar bg="dark" expand="lg" className="shadow-sm">
            <Container>
               <Navbar.Brand href={routes.chatPagePath()} className="atures-font">
                   Station301
               </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavbarLayout;
