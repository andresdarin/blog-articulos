import { useState } from 'react'
import { Inicio } from './components/pages/Inicio'
import { Articulos } from './components/pages/Articulos'
import { Crear } from './components/pages/Crear'
import { Rutas } from './routing/Rutas'


function App() {

  return (
    <>
      <div className='layout'>

        <Rutas />
      </div>
    </>
  )
}

export default App
