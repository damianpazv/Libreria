import React from 'react'
import Table from 'react-bootstrap/Table';

export const Carrito = () => {

    const DatosTabla = [
        { codigoBarras: '12345', nombre: 'Producto A', precio: 10.99, cantidad: 20 },
        { codigoBarras: '67890', nombre: 'Producto B', precio: 25.50, cantidad: 15 },
        { codigoBarras: '13579', nombre: 'Producto C', precio: 5.99, cantidad: 30 },
        { codigoBarras: '24680', nombre: 'Producto D', precio: 15.75, cantidad: 25 },
        { codigoBarras: '98765', nombre: 'Producto E', precio: 8.49, cantidad: 18 },
      ];



  return (
    <div>


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






    </div>
  )
}
