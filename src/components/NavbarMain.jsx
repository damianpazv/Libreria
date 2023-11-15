import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavbarMain = () => {
  return (
    <Navbar expand="lg"  bg="primary" data-bs-theme="dark">
    <Container className='mb-2'>
      <Navbar.Brand href="#home"><h1>SyS Library</h1></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-2">
          <Nav.Link href="#home"><h3>Productos</h3></Nav.Link>
          
     
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
