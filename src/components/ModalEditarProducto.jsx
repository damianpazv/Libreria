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


    // const  [formDataEdit,setFormDataEdit ]= useState({
    //     name:"",
    //     price: "",
    //     description:"",
    // })

// const handleChangeEdit = (e) => {

// setFormDataEdit({
//     ...formDataEdit,
//     [e.target.name]: e.target.value,
// });

// }

const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log("hola")

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
    cerrarModal()
    
    //cerrarModal
    // const {_id,name,price,description}=formDataEdit

    //validaciones....

//     if(name.trim()===""|| price===""|| description.trim()==="")
// {
//     Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Todos los campos son obligatorios',
        
//       })
// }

// else if(price<0)
// {
//     Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'el precio no puede ser negativo',
        
//       })
// }


    
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

{/* <Button variant="primary" onClick={handleShowEdit} >
        <h5>e</h5>
      </Button> */}

      <Modal show={modalAbierto} onHide={cerrarModal} >
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
              maxLength={20}
                type="text"
                
                name='name'
                 value={datosProducto.nombre}
                autoFocus
                //onChange={handleChangeEdit}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
              
                type="number"
                
                name='price'
                value={datosProducto.precio}
                //onChange={handleChangeEdit}
                
              />
            </Form.Group>



            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control as="textarea" rows={3} 
              name='description' 
              value={datosProducto.cantidad}
             //onChange={handleChangeEdit}
              maxLength={50}
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
