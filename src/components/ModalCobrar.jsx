import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export const ModalCobrar = ({ cerrarModal,total }) => {

  const [pagoCliente, setpagoCliente] = useState(0);

const pago=100
const cambio=pago-total

const handleChange = (event) => {
  let valorSeleccionado =parseFloat(event.target.value,10) ;
  setpagoCliente(valorSeleccionado);


};
    return (
       
<Modal   show={true} >
        <Modal.Header >
          <Modal.Title>Cobrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Total a cobrar : $ {total}  
        <br />
       
        <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"  onChange={handleChange} value={pagoCliente}>
        <Form.Label> pagó con : $ </Form.Label>
        <Form.Control type="number" placeholder="100" />
      </Form.Group>
    </Form>





        <br />
        su cambio : $ {pagoCliente-total}
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
