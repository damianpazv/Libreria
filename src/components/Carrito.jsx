import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ModalCobrar } from '../components/ModalCobrar';
import  { useState } from 'react'
import Form from 'react-bootstrap/Form';
import sigecoApi from '../api/sigecoAPI';

export const Carrito = () => {

  const [modalAbierto, setModalAbierto] = useState(false);
  const [descuentoSeleccionado, setdescuentoSeleccionado] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);

const [searchTerm, setSearchTerm] = useState('');
     
  const abrirModal = () => setModalAbierto(true);
  const cerrarModal=() => setModalAbierto(false)
  
  const productosDB= async()=>{ try {
    const resp = await sigecoApi.get("/api/productos")
    setProductos(resp.data.productos);
    
  } catch (error) {
    console.log(error);
  }
}
  // const productos = [
  //   { _id: '11111', nombre: 'Libro de Matemáticas', precio: 20.99, cantidad: 10 },
  //   { _id: '22222', nombre: 'Cuaderno de Dibujo', precio: 8.99, cantidad: 15 },
  //   { _id: '33333', nombre: 'Pluma de Gel', precio: 2.50, cantidad: 50 },
  //   { _id: '44444', nombre: 'Bloc de Notas', precio: 5.75, cantidad: 20 },
  //   { _id: '55555', nombre: 'Set de Lápices de Colores', precio: 12.49, cantidad: 30 },
  // ];

      const subtotal = carrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
      const total=subtotal-subtotal*descuentoSeleccionado/100;

      const handleChange = (event) => {
        let valorSeleccionado =parseInt(event.target.value,10) ;
        setdescuentoSeleccionado(valorSeleccionado);
     };
    

     const handleSearch = (event) => {
        if (event.key === 'Enter')
        {
          productosDB();
          setSearchTerm(event.target.value);
          const productoFiltrado = productos.filter(
            (product) =>
              product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.codigo.toString().includes(searchTerm)
          );
          console.log(productoFiltrado)
          productoFiltrado[0].cantidad=1;
          productoFiltrado[0].importe= productoFiltrado[0].precio;
         
          setCarrito((prevCarrito) => [...prevCarrito,...productoFiltrado]);
         

        }
        else {
          setSearchTerm(event.target.value);
        }
       
      };

      const aumentarCantidad=(id)=>{
        
        const nuevoCarrito = carrito.map(producto => {
          if (producto._id === id) {
            const nuevaCantidad=producto.cantidad +1;
            const nuevoImporte=  nuevaCantidad*producto.precio;
            const importeLimit=parseFloat(nuevoImporte.toFixed(2));
             
            
            return { ...producto, cantidad: nuevaCantidad, importe:importeLimit }
            ;
          }
          return producto
          
      })
      console.log(nuevoCarrito)
      setCarrito(nuevoCarrito);
      
      return nuevoCarrito;
    
      
      

    }

    const disminuirCantidad=(id)=>{
        
      const nuevoCarrito = carrito.map(producto => {
        if (producto._id === id) {
          const nuevaCantidad=producto.cantidad -1;
          const nuevoImporte=nuevaCantidad*producto.precio;
          const importeLimit=parseFloat(nuevoImporte.toFixed(2));
           
          
          return { ...producto, cantidad: nuevaCantidad ,importe:importeLimit}
          ;
        }
        return producto
        
    })
    console.log(nuevoCarrito)
    setCarrito(nuevoCarrito);
    
    return nuevoCarrito;
  
    
    

  }

 const eliminarProducto =(id)=>{

  const nuevoCarrito = carrito.filter(producto => {
    return producto._id !== id;
  });
    
    

console.log(nuevoCarrito)
setCarrito(nuevoCarrito);

return nuevoCarrito;



 }

    return(
    <div>


    <Container className='mt-3' >
      <Row>
        <Col>
        <input className='mb-2'
        type="text"
        placeholder="Buscar por nombre o id"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleSearch}/>
        </Col>
      


      </Row>

      <Row>
        <Col >
        
    
        <Table striped bordered hover >
      <thead>
        <tr className='text-center'>
          <th>Código de Barras</th>
          <th>Nombre</th>
          <th>Precio Unit</th>
          <th>Cantidad</th>
          <th>Importe</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {carrito.map((producto) =>{
           return(
          <tr className='text-center' key={producto._id}>
            <td>{producto.codigo}</td>
            <td>{producto.nombre}</td>
            <td>{producto.precio}</td>
            <td><Button className='me-3 btn btn-block' onClick={()=> disminuirCantidad(producto._id)} variant='info'>-</Button > {producto.cantidad} <Button className='ms-3 btn btn-block' onClick={()=> aumentarCantidad(producto._id)} variant='info'>+</Button > 
           
            </td>
            <td>{producto.importe}</td>
            <td> <Button onClick={()=> eliminarProducto(producto._id)} variant='danger'>Eliminar</Button ></td>
          </tr>
        )})}
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


    {modalAbierto && <ModalCobrar cerrarModal={cerrarModal} Total={total} productos={carrito} />}



    </div>
    )
}
