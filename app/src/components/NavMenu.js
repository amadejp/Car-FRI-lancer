import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

function NavMenu() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Car FRI-lancer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Domov</Nav.Link>
          <Nav.Link href="/profile">Profil</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default NavMenu;
