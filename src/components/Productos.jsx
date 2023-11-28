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
import { ModalAgregarProducto } from './ModalAgregarProducto';

export const Productos = () => {

   const [productosMostrados, setproductosMostrados] = useState([]);
   const [modalAbierto, setModalAbierto] = useState(false);
   const [modalAbiertoAP, setModalAbiertoAP] = useState(false);
   const  [formDataEdit,setFormDataEdit ]= useState({
    name:"",
    price: "",
    description:"",
})
const [searchTerm, setSearchTerm] = useState('');

const abrirModal = () => setModalAbierto(true);
const cerrarModal=() => setModalAbierto(false)

const abrirModalAP = () => setModalAbiertoAP(true);
const cerrarModalAP=() => setModalAbiertoAP(false)

    const productos = [
        { _id: 1, nombre: 'lapicera', precio: 10.99, cantidad: 20 },
        { _id: 2, nombre: 'cartuchera', precio: 25.50, cantidad: 15 },
        { _id: 3, nombre: 'fibron', precio: 5.99, cantidad: 30 },
        { _id: 4, nombre: 'mapa politico', precio: 15.75, cantidad: 25 },
        { _id: 5, nombre: 'pegamento', precio: 8.49, cantidad: 18 },
      ];

      const totalProductos= ()=> setproductosMostrados(productos)

     // setcargarProductos(productos);

     const editarProductoClick = (producto) => {
      abrirModal();
        setFormDataEdit(producto);
      
      }
      
      // const eliminarProductsDB = async(id) => {
      //   try{
      //     const resp=await pruebaApi.delete(`/admin/eliminar/${id}`);
      //     console.log(resp);
          
      // }
    
      // catch(error)
      // {
      // console.log(error);
      // if(error.response.status===401){
      //   localStorage.removeItem("token");
      //   navigate("/login");
      // }
      // }
      // };

      const handleSearch = (event) => {
        if (event.key === 'Enter')
        {
          
          setSearchTerm(event.target.value);
          const productosFiltrados = productos.filter(
            (product) =>
              product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product._id.toString().includes(searchTerm)
          );
          setproductosMostrados(productosFiltrados);

        }
        else {
          setSearchTerm(event.target.value);
        }
       
      };

     

      return (
    <div>
        <NavbarMain/>

<Container className='m-4'>
<h2 className='text-center'>PRODUCTOS</h2>

<Button onClick={()=>abrirModalAP()}>Agregar Producto</Button>
<Button className='ms-2' onClick={()=>totalProductos()}>Todos los Productos</Button>
<input className='ms-2'
        type="text"
        placeholder="Buscar por nombre o id"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleSearch}/>

<Table striped bordered hover className='m-3'>
      <thead>
        <tr>
          <th>Codigo de barras</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>cantidad</th>
          <th>Eliminar</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
{productosMostrados.map((product) =>{
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

{modalAbiertoAP && <ModalAgregarProducto    cerrarModal={cerrarModalAP}    />}













    </div>
  )
}
