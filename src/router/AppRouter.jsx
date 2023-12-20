import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../home/Home'
import { Productos } from '../components/Productos'
import { Ventas } from '../components/Ventas'
import { NavbarMain } from '../components/NavbarMain'
import { Login } from '../components/Login'

export const AppRouter = () => {
    
  return (
    <div>

<BrowserRouter>

<Routes>

{/* <Route  path='/'  element={ <Login />   } /> */}
<Route  path='/productos'  element={ <Productos />   } />
<Route  path='/ventas'  element={ <Ventas />   } />
<Route  path='/'  element={ <Home />   } />

</Routes>
</BrowserRouter>











    </div>
  )
}
