import React, { useEffect } from 'react'
//import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
//import { Footer } from '../../layout/Footer';
import Button from 'react-bootstrap/Button';
//import { useNavigate } from 'react-router';
import  { useState } from 'react'
import { Container } from 'react-bootstrap';
import { NavbarMain } from './NavbarMain';
import { ModalEditarProducto } from './ModalEditarProducto';
import { ModalAgregarProducto } from './ModalAgregarProducto';
import sigecoApi from '../api/sigecoAPI';
import Swal from 'sweetalert2'


export const Productos = () => {

   const [productosMostrados, setproductosMostrados] = useState([]);
   const [modalAbierto, setModalAbierto] = useState(false);
   const [modalAbiertoAP, setModalAbiertoAP] = useState(false);
   const  [formDataEdit,setFormDataEdit ]= useState({
    _id:"",
    codigo:"",
    nombre:"",
    precio: "",
    cantidad:"",
})


const [searchTerm, setSearchTerm] = useState('');

const abrirModal = () => setModalAbierto(true);
const cerrarModal=() => setModalAbierto(false)

const abrirModalAP = () => setModalAbiertoAP(true);
const cerrarModalAP=() => setModalAbiertoAP(false)

    const productosFake = [
        { codigo: 1, nombre: 'lapicera', precio: 10.99, cantidad: 20 },
        { codigo: 2, nombre: 'cartuchera', precio: 25.50, cantidad: 15 },
        { codigo: 3, nombre: 'fibron', precio: 5.99, cantidad: 30 },
        { codigo: 4, nombre: 'mapa politico', precio: 15.75, cantidad: 25 },
        { codigo: 5, nombre: 'pegamento', precio: 8.49, cantidad: 18 },
      ];

    const productosDB= async()=>{ try {
      const resp = await sigecoApi.get("/api/productos")
      setproductosMostrados(resp.data.productos);
      
    } catch (error) {
      console.log(error);
      setproductosMostrados(productosFake);
    }
  }

     const editarProductoClick = (producto) => {
      abrirModal();
        setFormDataEdit(producto);
      
      }
      
      const eliminarProductoDB = async(id) => {
        try{
          Swal.fire({
            title: "Está seguro que desea eliminar el producto?",
            
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            
          }).then (async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              const resp=await sigecoApi.delete(`/api/productos/${id}`);
              Swal.fire("producto elminado", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Operación cancelada", "", "info");
            }
          });



   
       
          
      }
    
      catch(error)
      {
      console.log(error);
      // if(error.response.status===401){
      //   localStorage.removeItem("token");
      //   navigate("/login");
      // }
      }
      };

      const handleSearch = (event) => {
        if (event.key === 'Enter')
        {
          
          setSearchTerm(event.target.value);
          const productosFiltrados = productosMostrados.filter(
            (product) =>
              product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.codigo.toString().includes(searchTerm)
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
<Button className='ms-2' onClick={()=>productosDB()}>Todos los Productos</Button>
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
    <td>{product.codigo}</td>
    <td>{product.nombre}</td>
    <td>{product.precio}</td>
    <td>{product.cantidad}</td>
    <td><Button onClick={()=> eliminarProductoDB(product._id)} variant='danger'>Eliminar</Button ></td>
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
