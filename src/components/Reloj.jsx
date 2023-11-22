
import React, { useState, useEffect } from 'react';

export const Reloj = () => {
    const [fechaHora, setFechaHora] = useState(new Date());

    // Efecto para actualizar la fecha y hora cada segundo
    useEffect(() => {
      const intervalId = setInterval(() => {
        setFechaHora(new Date());
      }, 1000);
  
      // Limpiar el intervalo al desmontar el componente
      return () => clearInterval(intervalId);
    }, []);
  
    // Obtener partes de la fecha y hora
    const dia = fechaHora.getDate();
    const mes = fechaHora.getMonth() + 1; // Los meses son 0-indexados, por lo que sumamos 1
    const anio = fechaHora.getFullYear();
    const horas = fechaHora.getHours();
    const minutos = fechaHora.getMinutes();
    const segundos = fechaHora.getSeconds();
  
    return (
      <div>
        
        <h5 className='text-light'>{`${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`}</h5>
      </div>
    );
}
