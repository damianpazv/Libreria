import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import sigecoApi from '../api/sigecoAPI';

export const ModalCobrar = ({ cerrarModal,Total,productos }) => {

  const [pagoCliente, setpagoCliente] = useState(0);


const crearVenta=()=>{
  const productosConCantidad = productos.map(producto => ({
    nombre: producto.nombre,
    cantidad: producto.cantidad
  }));
const venta={detalle:productosConCantidad,total:Total,fecha: new Date().toLocaleString()};
console.log(venta);

AgregarVentaDB(venta)

actualizarStock();

cerrarModal();

}

const AgregarVentaDB= async (venta) =>
{

    try{
        const resp=await sigecoApi.post("/api/ventas",venta);
        
        Swal.fire({
          position: "center",
          icon: "success",
          title: "venta realizada con éxito",
          showConfirmButton: false,
          timer: 1500
        });
    }

    catch(error)
    {
    console.log(error);
    }
}


const actualizarStock=()=>{

  
    const productosStock = productos.map((producto) => {
    
      const nuevaCantidad=producto.cantidad - producto.cantidadCompra;
     
       
      
      return { ...producto, cantidad: nuevaCantidad }
      ;
    
    
    
})


productosStock.map(async(producto)=>{

  try {

    const resp = await sigecoApi.put("/api/productos", {
      _id: producto._id,
      cantidad: producto.cantidad,
    });
    
  } catch (error) {
    console.error(error);
  }





})

    
  
  

        
 





}

const handleChange = (event) => {
  let valorSeleccionado =parseFloat(event.target.value,10) ;
  setpagoCliente(valorSeleccionado);


};
    return (
       
<Modal   show={true} onHide={cerrarModal}>
        <Modal.Header closeButton >
          <Modal.Title>Cobrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Total a cobrar : $ {Total}  
        <br />
       
        <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"  onChange={handleChange} value={pagoCliente}>
        <Form.Label > pagó con : $ </Form.Label>
        <Form.Control type="number" placeholder="100" />
      </Form.Group>
    </Form>

        <br />
        su cambio : $ {pagoCliente-Total}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
           Cancelar
          </Button>
          <Button variant="primary" onClick={crearVenta}>
            Cobrar
          </Button>
        </Modal.Footer>
      </Modal>

      );
}
