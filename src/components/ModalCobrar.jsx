import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

export const ModalCobrar = ({ cerrarModal,total }) => {


const pago=100
const cambio=pago-total


    return (
       
<Modal   show={true} >
        <Modal.Header >
          <Modal.Title>Cobrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Total a cobrar : $ {total}  
        <br />
        pagó con : $ {pago}
        <br />
        su cambio : $ {cambio}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
           Cancelar
          </Button>
          <Button variant="primary" onClick={cerrarModal}>
            Cobrar
          </Button>
        </Modal.Footer>
      </Modal>




      );
}
