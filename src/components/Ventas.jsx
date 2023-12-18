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

import sigecoApi from '../api/sigecoAPI';

export const Ventas = () => {

   const [ventasMostradas, setventasMostradas] = useState([]);
   const [modalAbierto, setModalAbierto] = useState(false);
   const [modalAbiertoAP, setModalAbiertoAP] = useState(false);
//    const  [formDataEdit,setFormDataEdit ]= useState({
//     _id:"",
//     detalle:[],
//     total:"",
//     fecha: "",
 
// })


const [searchTerm, setSearchTerm] = useState('');

const abrirModal = () => setModalAbierto(true);
const cerrarModal=() => setModalAbierto(false)

const abrirModalAP = () => setModalAbiertoAP(true);
const cerrarModalAP=() => setModalAbiertoAP(false)


    const ventasDB= async()=>{ try {
      const resp = await sigecoApi.get("/api/ventas")
      setventasMostradas(resp.data.ventas);
      
    } catch (error) {
      console.log(error);
    }
  }

    //  const editarProductoClick = (producto) => {
    //   abrirModal();
    //     setFormDataEdit(producto);
      
    //   }
      
      const eliminarVentaDB = async(id) => {
        try{
          const resp=await sigecoApi.delete(`/api/ventas/${id}`);
       
          
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
          const ventasFiltradas = ventasMostradas.filter(
            (venta) =>
              venta.fecha.toLowerCase().includes(searchTerm.toLowerCase()) 
              //||   venta.codigo.toString().includes(searchTerm)
          );
          setventasMostradas(ventasFiltradas);

        }
        else {
          setSearchTerm(event.target.value);
        }
       
      };

     
      return (
    <div>
     
<NavbarMain/>
<Container className='m-4'>
<h2 className='text-center'>VENTAS</h2>


<Button className='ms-2' onClick={()=>ventasDB()}>Todas las ventas</Button>
<input className='ms-2'
        type="text"
        placeholder="Buscar por nombre o id"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleSearch}/>

<Table striped bordered hover className='m-3'>
      <thead>
        <tr>
          <th>Detalle</th>
          <th>Total</th>
          <th>Fecha</th>
          <th>Eliminar</th>
          {/* <th>Editar</th> */}
        </tr>
      </thead>
      <tbody>
{ventasMostradas.map((venta) =>{
return(

    <tr key={venta._id}>
    <td>
    <h6>Productos:</h6>
        {venta.detalle.map((item) =>{ return ( <p> {item.nombre} , <b>Cant:</b> {item.cantidad} </p>
           )     })}
        
      
        </td>
    <td>{venta.total}</td>
    <td>{venta.fecha}</td>
   
    <td><Button onClick={()=> eliminarVentaDB(product._id)} variant='danger'>Eliminar</Button ></td>
    {/* <td><Button onClick={()=> editarProductoClick(product)} variant='info'>Editar</Button ></td> */}
  </tr>
)

})}
    </tbody>
    </Table>


</Container>


{/* 
{modalAbierto && <ModalEditarProducto  datosProducto={formDataEdit}  cerrarModal={cerrarModal}    />}

{modalAbiertoAP && <ModalAgregarProducto    cerrarModal={cerrarModalAP}    />} */}




    </div>
  )
}
