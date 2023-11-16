import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ModalCobrar } from '../components/ModalCobrar';
import  { useState } from 'react'
import Form from 'react-bootstrap/Form';

export const Carrito = () => {

  const [modalAbierto, setModalAbierto] = useState(false);
  const [descuentoSeleccionado, setdescuentoSeleccionado] = useState(0);
      
  const abrirModal = () => setModalAbierto(true);
  const cerrarModal=() => setModalAbierto(false)
  

    const DatosTabla = [
        { codigoBarras: '12345', nombre: 'Producto A', precio: 10.99, cantidad: 20 },
        { codigoBarras: '67890', nombre: 'Producto B', precio: 25.50, cantidad: 15 },
        { codigoBarras: '13579', nombre: 'Producto C', precio: 5.99, cantidad: 30 },
        { codigoBarras: '24680', nombre: 'Producto D', precio: 15.75, cantidad: 25 },
        { codigoBarras: '98765', nombre: 'Producto E', precio: 8.49, cantidad: 18 },
      ];

      const subtotal = DatosTabla.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);

      const handleChange = (event) => {
        let valorSeleccionado =parseInt(event.target.value,10) ;
        setdescuentoSeleccionado(valorSeleccionado);
    
      
      };
    
    

      const total=subtotal-subtotal*descuentoSeleccionado/100;

  return (
    <div>


    <Container className='mt-4' >
      <Row>
        <Col >
        
    
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Código de Barras</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {DatosTabla.map((producto, index) => (
          <tr key={index}>
            <td>{producto.codigoBarras}</td>
            <td>{producto.nombre}</td>
            <td>{producto.precio}</td>
            <td>{producto.cantidad}</td>
          </tr>
        ))}
      </tbody>
    </Table>
         
         
         
         </Col>
       
      </Row>

  <Row>
        <Col >
        <Button variant="warning"  onClick={abrirModal}><h3>Cobrar</h3></Button>
         </Col>
        <Col className='border caja me-2 pt-2 pb-2 mb-2'>
        <h4>Subtotal: $ {subtotal} </h4> 
        <hr />
        
        <h4>Descuento:
        <Form className='mt-2'>
      <Form.Select aria-label="Selecciona una opción" onChange={handleChange} value={descuentoSeleccionado}>
        <option value="0" >No se aplican descuentos</option>
        <option value="10" >10%</option>
        <option value="20">20%</option>
        <option value="30">30%</option>
      </Form.Select>
    </Form>
           </h4> 
       <hr />
        <h2>Total: $ {total} </h2> 
        </Col>
       
      </Row>
    </Container>


    {modalAbierto && <ModalCobrar cerrarModal={cerrarModal} total={total} />}



    </div>
  )
}
