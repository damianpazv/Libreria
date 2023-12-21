import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import  { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { NavbarMain } from './NavbarMain';
import sigecoApi from '../api/sigecoAPI';
import Swal from 'sweetalert2';

export const Ventas = () => {

   const [ventasMostradas, setventasMostradas] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [cantidadVentas, setcantidadVentas] = useState(0);
   const [sumaVentas, setsumaVentas] = useState(0);

   useEffect(() => {
 
    ventasDB();
  }, []);
  useEffect(() => {
    // Esto se ejecutará después de que se haya actualizado ventasMostradas
    sumaTotal();
    
  }, [ventasMostradas]); 

  const fecha=new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; 
  const anio = fecha.getFullYear(); 
  const diaDeHoy=dia+"/"+mes+"/"+anio;
  
const ventasDB= async()=>{ try {
      const resp = await sigecoApi.get("/api/ventas")
      setventasMostradas(resp.data.ventas);
       
    } catch (error) {
      console.log(error);
    }
  }
      
const eliminarVentaDB = async(id) => {
        try{
          Swal.fire({
            title: "Está seguro que desea eliminar esta venta?",
            
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            
          }).then (async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              const resp=await sigecoApi.delete(`/api/ventas/${id}`);
              Swal.fire("venta elminada", "", "success");
              ventasDB();
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
          const ventasFiltradas = ventasMostradas.filter(
            (venta) =>
              venta.fecha.toLowerCase().includes(searchTerm.toLowerCase()) 
              //||   venta.codigo.toString().includes(searchTerm)
          );
          setventasMostradas(ventasFiltradas);
          sumaTotal();

        }
        else {
          setSearchTerm(event.target.value);
        }
       
      };

const handleSearchToday = () => {

           

          const ventasFiltradas = ventasMostradas.filter(
            (venta) =>
              venta.fecha.toLowerCase().includes(diaDeHoy)               
          );
          
setventasMostradas(ventasFiltradas);
sumaTotal();
     
      };
      
const sumaTotal=()=>{
    const cantidad=  ventasMostradas.length;
    const suma = ventasMostradas.reduce((acumulador, venta) => acumulador + venta.total, 0);
    setcantidadVentas(cantidad);
    setsumaVentas(suma);
     };
     

     return (
    <div>
     
<NavbarMain/>
<Container fluid="md" className='mt-3'>
  <Row className='justify-content-md-between'>
  <Col className='mt-2'>
  <Table  bordered hover size="sm" variant='primary'>
      <thead className="text-center">
        <tr>
          <th>Cantidad de Ventas</th>
          <th>Recaudación Total</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <td><h5>{cantidadVentas}</h5></td>
          <td><h5>${sumaVentas}</h5></td>
        </tr>
      </tbody>
    </Table>

</Col>
<Col xs={3} className='mt-4'>
<h2 className='text-center'><strong>VENTAS</strong></h2>
</Col>
<Col md="auto"className='mt-4'>
<Button className='ms-2' onClick={()=>ventasDB()}>Todas las ventas</Button>
<Button className='ms-2' onClick={()=>handleSearchToday()}>Hoy</Button>
<input className='ms-2'
        type="text"
        placeholder="Buscar por fecha"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleSearch}/>
</Col>

  </Row>

 

<Row>
<Table striped bordered hover className='mt-3'>
  <thead>
    <tr>
      <th>#</th>
      <th>Detalle</th>
      <th>Total</th>
      <th>Fecha</th>
      <th>Eliminar</th>
    </tr>
  </thead>
  <tbody>
    {ventasMostradas.map((venta, index) => {
      return (
        <tr key={venta._id}>
          <td>{index + 1}</td>
          <td>
            <h6>Productos:</h6>
            {venta.detalle.map((item,index) => (
              <p key={index}>
                {item.nombre}, <b>Cant:</b> {item.cantidad}
              </p>
            ))}
          </td>
          <td>${venta.total}</td>
          <td>{venta.fecha}</td>
          <td>
            <Button onClick={() => eliminarVentaDB(venta._id)} variant='danger'>
              Eliminar
            </Button>
          </td>
        </tr>
      );
    })}
  </tbody>
</Table>

</Row>





</Container>


    </div>
  )
}
