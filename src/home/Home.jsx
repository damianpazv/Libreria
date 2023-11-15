import React, { useState } from 'react'
import { ModalCobrar } from '../components/ModalCobrar';
import Button from 'react-bootstrap/Button';
import { NavbarMain } from '../components/NavbarMain';
import { Carrito } from '../components/Carrito';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css';


export const Home = () => {

   
        const [modalAbierto, setModalAbierto] = useState(false);
      
        const abrirModal = () => setModalAbierto(true);
        const cerrarModal=() => setModalAbierto(false)

        const total=50;


  return (
    <div className='cuerpo'>
<NavbarMain/>

<Container className='mt-4' >
      <Row>
        <Col > <Carrito/></Col>
       
      </Row>

  <Row>
        <Col >
        <Button variant="warning"  onClick={abrirModal}><h3>Cobrar</h3></Button>
         </Col>
        <Col className='border caja me-2'>
        <h3>Subtotal</h3> 
        <br />
        <h3>Descuento</h3> 
        <br />
        <h2>Total</h2> 
        </Col>
       
      </Row>
    </Container>





      {modalAbierto && <ModalCobrar cerrarModal={cerrarModal} total={total} />}



    </div>
  )
        }
    
