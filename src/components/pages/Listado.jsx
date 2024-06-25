import React from 'react'
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const Listado = ({ articulos, setArticulos }) => {

    const eliminar = async (id) => {
        let { datos } = await Peticion(Global.url + 'articulos/' + id, "DELETE")

        if (datos.status == 'success') {
            let articulosActualizados = articulos.filter(articulo => articulo._id !== id);

            setArticulos(articulosActualizados)
        }
    }
    return (
        articulos.map(articulo => {
            return (
                <article key={articulo._id} className="articulo-item">
                    <div className='mask'>
                        {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
                        {articulo.imagen == "default.png" && <img src='https://react.semantic-ui.com/images/wireframe/image.png' />}

                    </div>
                    <div className='datos'>
                        <h3 className="title"><Link to={"/articulo/" + articulo._id}>{articulo.titulo}</Link></h3>
                        <p className="description">{articulo.contenido}</p>

                        <Link to={'/editar/' + articulo._id} className="edit button">Editar</Link>
                        <Link className="delete button" onClick={() => {
                            eliminar(articulo._id)
                        }}>Borrar</Link>
                    </div>
                </article>
            );
        })
    )
}
