import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from '../components/Menu/Menu'
import Tarea from '../components/Tareas/Tarea'
import ContainerTemp from '../components/ContainerTemp/ContainerTemp'
const Rutas = () => {
  return (
    <BrowserRouter>
    <Menu />
        <Routes>
            <Route path="/" element={<Tarea />} />
            <Route path="/Temporizador" element={<ContainerTemp />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Rutas