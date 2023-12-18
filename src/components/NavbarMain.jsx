import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { Reloj } from './Reloj';

export const NavbarMain = () => {



  return (
    <div>

   
   
    <Navbar expand="lg"  bg="primary" data-bs-theme="dark">
    <Container className='mb-1'>
      <Navbar.Brand className='me-5' href="/"><h2>SIGECO</h2><h6>sistema de gestion comecial</h6></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-2">
        <NavLink className="m-3  text-decoration-none text-light" to="/home"><h5>CAJA</h5></NavLink>
          <NavLink className="m-3  text-decoration-none text-light" to="/productos"><h5>PRODUCTOS</h5></NavLink>
          <NavLink className="m-3  text-decoration-none text-light" to="/ventas"><h5>VENTAS</h5></NavLink>
     
        </Nav>
      </Navbar.Collapse>
      <Reloj/>
    </Container>
  </Navbar>

  </div>
  )


}
