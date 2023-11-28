import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
//import pruebaApi from '../api/prueba';
import Swal from 'sweetalert2'

export const ModalAgregarProducto = ({cerrarModal}) => {

    const [modalAbierto, setModalAbierto] = useState(true);
    const abrirModal1 = () => setModalAbierto(true);
  const cerrarModal1=() => setModalAbierto(false)

  const  [formData,setFormData ]= useState({
    nombre:"",
    precio: "",
    cantidad:"",
})
const handleChange = (e) => {

    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
     }

  const AgregarProducto = (e) => {
    e.preventDefault();
     const {_id,nombre,precio,cantidad}=formData

    //validaciones....

    if(nombre.trim()===""|| precio===""|| cantidad==="")
{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios',
        
      })
      cerrarModal()
      return; 
}

else if(precio<0)
{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'el precio no puede ser negativo',
        
      })
      cerrarModal()
      return; 
}
else if(cantidad<0)
{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'la cantidad no puede ser negativa',
        
      })
      cerrarModal()
      return; 
}

console.log(formData)

Swal.fire({
  position: "center",
  icon: "success",
  title: "Producto agregado con éxito",
  showConfirmButton: false,
  timer: 1500
});

cerrarModal()
// AgregarProductsDB(nombre,precio,cantidad)
  
    
    };

// const AgregarProductsDB= async (nombre,precio,cantidad) =>
// {

//     try{
//         const resp=await pruebaApi.post("/admin/new",{nombre,precio,cantidad});
        

//     }

//     catch(error)
//     {
//     console.log(error);
//     }
// }


  return (
    <div>


<Modal show={modalAbierto} onHide={cerrarModal} >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AgregarProducto}>

            <Form.Group className="mb-3" controlId="FormEditar.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
              maxLength={20}
                type="text"             
                name='nombre'
                autoFocus
                onChange={handleChange}
                value={formData.nombre}
                
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormEditar.ControlInput2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
              
                type="number"    
                name='precio'
                onChange={handleChange}
                value={formData.precio}
               
                
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="FormEditar.ControlInput3"
            >
              <Form.Label>Cantidad</Form.Label>
              <Form.Control 
              name='cantidad' 
             
              type="number"
              onChange={handleChange}
              value={formData.cantidad}
           
              
              />
              
            </Form.Group>
          
            <Button variant="primary" type='submit' 
          onClick={cerrarModal1}
          >
            Confirmar
          </Button>
         
          </Form>
        </Modal.Body>
        <Modal.Footer>       
        </Modal.Footer>
      </Modal>






    </div>
  )
}
