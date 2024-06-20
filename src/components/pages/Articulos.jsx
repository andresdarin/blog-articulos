import { useState, useEffect } from 'react'

import React from 'react'

export const Articulos = () => {

    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        let data = [{
            _id: 1,
            titulo: 'titulo 1',
            contenido: 'contenido'
        },
        {
            _id: 2,
            titulo: 'titulo 2',
            contenido: 'contenido'
        },
        {
            _id: 3,
            titulo: 'titulo 3',
            contenido: 'contenido'
        }];

        setArticulos(data)
    }, []);


    return (
        <>
            {articulos.map(articulo => {
                return (
                    <article key={articulo._id} className="articulo-item">
                        <div className='mask'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png' />
                        </div>
                        <div className='datos'>
                            <h3 className="title">{articulo.titulo}</h3>
                            <p className="description">{articulo.contenido}</p>

                            <button className="edit">Editar</button>
                            <button className="delete">Borrar</button>
                        </div>
                    </article>
                )
            })}
        </>
    )
}
