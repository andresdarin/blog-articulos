import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvindo al Blog desarrollado con React</h1>
      <p>Blog desarrollado con MERN stack (Mongo, Express, React y NodeJS)</p>
      <Link to="/articulos" className='button'>Ver los Articulos</Link>
    </div>
  )
}
