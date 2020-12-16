import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import "../styles/NavMenu.css";

function NavMenu() {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand href="/">Car FRI-lancer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Domov</Nav.Link>
          <Nav.Link href="/map">Zemljevid</Nav.Link>
          <Nav.Link href="/cars">Moji avti</Nav.Link>
          <Nav.Link href="/rents">Izposoje</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavMenu;
