import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

export const NavbarMain = () => {
  return (
    <Navbar expand="lg"  bg="primary" data-bs-theme="dark">
    <Container className='mb-2'>
      <Navbar.Brand href="/"><h1>SyS Library</h1></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-2">
        <NavLink className="m-3" to="/"><h3>Caja</h3></NavLink>
          <NavLink className="m-3" to="/productos"><h3>Productos</h3></NavLink>
     
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
