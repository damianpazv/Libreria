import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import sigecoApi from '../api/sigecoAPI';

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
     const {_id,codigo,nombre,precio,cantidad}=formDataEdit

    //validaciones....

    if(nombre.trim()===""|| precio===""|| cantidad==="" || codigo==="")
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

EditarProductoDB(_id,codigo,nombre,precio,cantidad);


cerrarModal()
    

    
    };

const EditarProductoDB= async (_id,codigo,nombre,precio,cantidad) =>
{

    try{
        const resp=await sigecoApi.put("/api/productos",{_id,codigo,nombre,precio,cantidad});
        //console.log(resp);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto editado con éxito",
          showConfirmButton: false,
          timer: 1500
        });
    }

    catch(error)
    {
    console.log(error);
    }
}

  return (

    <div>
      <Modal show={modalAbierto} onHide={cerrarModal} >
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>
          <Form.Group className="mb-3" controlId="FormEditar.ControlInput2">
              <Form.Label>codigo</Form.Label>
              <Form.Control
              
                type="number"    
                name='codigo'
                value={formDataEdit.codigo}
                onChange={handleChangeEdit}
                
              />
            </Form.Group>

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
