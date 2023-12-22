import React, { useEffect } from 'react'
//import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
//import { Footer } from '../../layout/Footer';
import Button from 'react-bootstrap/Button';
//import { useNavigate } from 'react-router';
import  { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { NavbarMain } from './NavbarMain';
import { ModalEditarProducto } from './ModalEditarProducto';
import { ModalAgregarProducto } from './ModalAgregarProducto';
import sigecoApi from '../api/sigecoAPI';
import Swal from 'sweetalert2'
import '../home/Home.css';

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


useEffect(() => {
 
  productosDB();
}, []);

useEffect(() => {
  // Verificar si el modal se ha cerrado
  if (!modalAbierto) {
    // Realizar acciones de reseteo aquí
    productosDB(); // Resetea cualquier otro estado según sea necesario
  }
}, [modalAbierto,modalAbiertoAP]);

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
            cancelButtonText:"Cancelar",
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

     
const pocoStock=()=>{

const productosPocoStock=productosMostrados.filter(
  (product) =>
    product.cantidad<=20
    
);
setproductosMostrados(productosPocoStock);

}


      return (
    <div className='cuerpo'>
     
<NavbarMain/>
<Container  fluid="md" className='mt-3'>


<Row className='justify-content-md-between'>
<Col className='mt-2'>
<Table  bordered hover size="sm" variant='primary'>
      <thead className="text-center">
        <tr>
          <th>Cantidad de productos</th>
          
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <td><h5>{productosMostrados.length}</h5></td>
         
        </tr>
      </tbody>
    </Table>
    <Button className='ms-5' onClick={()=>productosDB()}>Todos los Productos</Button>
    <Button className='ms-3' variant='warning' onClick={()=>pocoStock()}> Poco stock</Button>
</Col>



<Col xs={3} className='mt-4'>
<h2 className='text-center'><strong>PRODUCTOS</strong></h2>
</Col>
<Col className='mt-4'>
<Button onClick={()=>abrirModalAP()}>Agregar Producto</Button>

<input className='mt-2 ms-3'
        type="text"
        placeholder="Buscar por nombre o cod."
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleSearch}/>
</Col>

</Row>



<Row>
<Col>

<Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          <th>Codigo de barras</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
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


</Col>

</Row>










</Container>



{modalAbierto && <ModalEditarProducto  datosProducto={formDataEdit}  cerrarModal={cerrarModal}    />}

{modalAbiertoAP && <ModalAgregarProducto    cerrarModal={cerrarModalAP}    />}













    </div>
  )
}
