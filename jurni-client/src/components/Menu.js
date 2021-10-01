import { Navbar, Nav, Container } from 'react-bootstrap';
import React from 'react';
import { NavLink } from 'react-router-dom'

function Menu(){
    return(
        <div>
            <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Jurni</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <NavLink to = "/home" className="nav-link">Home</NavLink>
        <NavLink to = "/library" className="nav-link">Library</NavLink>
        <NavLink to = "/start-new-journey" className="nav-link">Start New Journey!</NavLink>
        <NavLink to = "/login/register" className="nav-link">Logout</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>

    )
}

export default Menu;