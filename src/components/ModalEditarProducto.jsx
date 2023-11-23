import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
//import pruebaApi from '../api/prueba';
import Swal from 'sweetalert2'

export const ModalEditarProducto = ({datosProducto,cerrarModal}) => {

  const [modalAbierto, setModalAbierto] = useState(true);
  const abrirModal1 = () => setModalAbierto(true);
const cerrarModal1=() => setModalAbierto(false)

    const  [formDataEdit,setFormDataEdit ]= useState(datosProducto)

const handleChangeEdit = (e) => {

setFormDataEdit({
    ...formDataEdit,
    [e.target.name]: e.target.value,
});

}

const handleSubmitEdit = (e) => {
    e.preventDefault();
     const {_id,nombre,precio,cantidad}=formDataEdit

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

console.log(formDataEdit)

Swal.fire({
  position: "center",
  icon: "success",
  title: "Producto editado con éxito",
  showConfirmButton: false,
  timer: 1500
});
cerrarModal()
    
  //  EditarProductsDB(_id,name,price,description)
    
    };

// const EditarProductsDB= async (_id,name,price,description) =>
// {

//     try{
//         const resp=await pruebaApi.put("/admin/editar",{_id,name,price,description});
//         console.log(resp);

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
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>

            <Form.Group className="mb-3" controlId="FormEditar.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
              maxLength={20}
                type="text"             
                name='nombre'
                 value={formDataEdit.nombre}
                autoFocus
                onChange={handleChangeEdit}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormEditar.ControlInput2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
              
                type="number"    
                name='precio'
                value={formDataEdit.precio}
                onChange={handleChangeEdit}
                
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="FormEditar.ControlInput3"
            >
              <Form.Label>Cantidad</Form.Label>
              <Form.Control 
              name='cantidad' 
              value={formDataEdit.cantidad}
              type="number"
             onChange={handleChangeEdit}
              
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
