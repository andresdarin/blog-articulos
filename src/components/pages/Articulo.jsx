import { useState, useEffect } from 'react'

import React from 'react'
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Articulo = () => {

    const [articulo, setArticulo] = useState([]);
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirArticulo();
    }, []);

    const conseguirArticulo = async () => {
        const { datos, cargando } = await Peticion(Global.url + 'articulo/' + params.id, 'GET')

        if (datos.status === "success") {
            setArticulo(datos.articulo)

        }

        setCargando(false);
    }

    return (
        <div className='jumbo_article'>
            {cargando ? "Cargando..." :
                <>
                    <div className='mask'>
                        {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
                        {articulo.imagen == "default.png" && <img src='https://react.semantic-ui.com/images/wireframe/image.png' />}
                        <h3 className='polaroid_name'>{articulo.titulo}</h3>
                    </div>
                    <div className='article_text'>
                        <h1>{articulo.titulo}</h1>
                        <p>{articulo.contenido}</p>
                        <span>{new Date(articulo.fecha).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>

                    </div>
                </>
            }
        </div>
    )
}
