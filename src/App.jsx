import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { Home } from './home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRouter } from './router/AppRouter';

function App() {
 

  return (
    <>
    <AppRouter />
    </>
  )
}

export default App
