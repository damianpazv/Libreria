import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
import sigecoApi from '../api/sigecoAPI';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const Login = () => {

    const navigate = useNavigate();
  const  [formData,setFormData ]= useState({
   
    nombre:"",
    password: ""
  
})
const handleChange = (e) => {

    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
     }

  const Loginusuario = (e) => {
    e.preventDefault();
     const {nombre,password}=formData

    //validaciones....

    if(nombre.trim()===""|| password==="")
{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios',
        
      })
     
      return; 
}



CheckLoginDB(nombre,password);





  
    
    };

const CheckLoginDB= async (nombre,password) =>
{

    try{
        const resp=await sigecoApi.post("/api/usuarios/login",{nombre,password});
        console.log(resp.data.ok)

       if(resp.data.ok ) 
       { 
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Bienvenido ${nombre}`, 
            showConfirmButton: false,
            timer: 1500
          });

          navigate("/home");
       } 
       else{
        Swal.fire({
            position: "center",
            icon: "error",
            title: "alguno de los datos es incorrecto",
            showConfirmButton: false,
            timer: 1500
          });
       }
  
    }

    catch(error)
    {
    console.log(error);
    }
}


  return (
    <div>


<Container>




      <Form onSubmit={Loginusuario}>
      

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
              <Form.Label>Password</Form.Label>
              <Form.Control
              
                type="password"    
                name='password'
                onChange={handleChange}
                value={formData.password}
               
                
              />
            </Form.Group>

   
          
            <Button variant="primary" type='submit' 
          
          >
            Ingresar
          </Button>
         
          </Form>

          </Container>

    </div>
  )
}
