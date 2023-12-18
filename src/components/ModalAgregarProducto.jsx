import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'
import sigecoApi from '../api/sigecoAPI';

export const ModalAgregarProducto = ({cerrarModal}) => {

    const [modalAbierto, setModalAbierto] = useState(true);
    const abrirModal1 = () => setModalAbierto(true);
  const cerrarModal1=() => setModalAbierto(false)

  const  [formData,setFormData ]= useState({
    codigo:"",
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
     const {codigo,nombre,precio,cantidad}=formData

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

AgregarProductoDB(codigo,nombre,precio,cantidad)



cerrarModal()

  
    
    };

const AgregarProductoDB= async (codigo,nombre,precio,cantidad) =>
{

    try{
        const resp=await sigecoApi.post("/api/productos",{codigo,nombre,precio,cantidad});
        
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto agregado con éxito",
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
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AgregarProducto}>
          <Form.Group className="mb-3" controlId="FormEditar.ControlInput2">
              <Form.Label>codigo</Form.Label>
              <Form.Control
              
                type="number"    
                name='codigo'
                onChange={handleChange}
                value={formData.codigo}
               
                
              />
            </Form.Group>

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
