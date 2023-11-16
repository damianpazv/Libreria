import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../home/Home'
import { Productos } from '../components/Productos'

export const AppRouter = () => {
    
  return (
    <div>

<BrowserRouter>
<Routes>

<Route  path='/'  element={ <Home />   } />
<Route  path='/productos'  element={ <Productos />   } />


</Routes>
</BrowserRouter>











    </div>
  )
}
