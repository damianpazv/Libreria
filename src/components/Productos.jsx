import React from 'react'
//import pruebaApi from '../../api/prueba';
//import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
//import { Footer } from '../../layout/Footer';
//import { ModalForm } from '../../components/ModalForm';
import Button from 'react-bootstrap/Button';
//import { ModalFormEdit } from '../../components/ModalFormEdit';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
//import { useNavigate } from 'react-router';
import  { useState } from 'react'
import { Container } from 'react-bootstrap';
import { NavbarMain } from './NavbarMain';
import { ModalEditarProducto } from './ModalEditarProducto';

export const Productos = () => {

   // const [cargarProductos, setcargarProductos] = useState([]);
   const [modalAbierto, setModalAbierto] = useState(false);



   const  [formDataEdit,setFormDataEdit ]= useState({
    name:"",
    price: "",
    description:"",
})

const abrirModal = () => setModalAbierto(true);
const cerrarModal=() => setModalAbierto(false)

    const productos = [
        { _id: 1, nombre: 'Producto A', precio: 10.99, cantidad: 20 },
        { _id: 2, nombre: 'Producto B', precio: 25.50, cantidad: 15 },
        { _id: 3, nombre: 'Producto C', precio: 5.99, cantidad: 30 },
        { _id: 4, nombre: 'Producto D', precio: 15.75, cantidad: 25 },
        { _id: 5, nombre: 'Producto E', precio: 8.49, cantidad: 18 },
      ];

     // setcargarProductos(productos);

     const editarProductoClick = (producto) => {
      abrirModal();
        setFormDataEdit(producto);
      
      }
      

  return (
    <div>
        <NavbarMain/>

<Container className='m-4'>
<h2 className='text-center'>PRODUCTOS</h2>

<Table striped bordered hover className='m-3'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>cantidad</th>
          <th>Eliminar</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
{productos.map((product) =>{
return(

    <tr key={product._id}>
    <td>{product._id}</td>
    <td>{product.nombre}</td>
    <td>{product.precio}</td>
    <td>{product.cantidad}</td>
    <td><Button onClick={()=> eliminarProductsDB(product._id)} variant='danger'>Eliminar</Button ></td>
    <td><Button onClick={()=> editarProductoClick(product)} variant='info'>Editar</Button ></td>
  </tr>
)

})}
    </tbody>
    </Table>


</Container>



{modalAbierto && <ModalEditarProducto  datosProducto={formDataEdit}  cerrarModal={cerrarModal}    />}













    </div>
  )
}
