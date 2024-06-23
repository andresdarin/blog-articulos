import React from 'react'
import { Global } from '../../helpers/Global';

export const Listado = ({ articulos, setArticulos }) => {
    return (
        articulos.map(articulo => {
            return (
                <article key={articulo._id} className="articulo-item">
                    <div className='mask'>
                        {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
                        {articulo.imagen == "default.png" && <img src='https://react.semantic-ui.com/images/wireframe/image.png' />}

                    </div>
                    <div className='datos'>
                        <h3 className="title">{articulo.titulo}</h3>
                        <p className="description">{articulo.contenido}</p>

                        <button className="edit">Editar</button>
                        <button className="delete">Borrar</button>
                    </div>
                </article>
            );
        })
    )
}
