import React, { useState, useEffect } from 'react'; // Añade useState y useEffect a los imports
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Busqueda = () => {

    const [articulos, setArticulos] = useState([]); // Declara useState aquí
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
        conseguirArticulos();
    }, []);

    useEffect(() => {
        conseguirArticulos();
    }, [params]);

    const conseguirArticulos = async () => {
        const { datos, cargando } = await Peticion(Global.url + 'buscar/' + params.busqueda, 'GET');

        if (datos.status === "success") {
            setArticulos(datos.articulos);
        } else {
            setArticulos([])
        }

        setCargando(false);
    };

    return (
        <>
            {cargando ? "Cargando..." :
                articulos.length >= 1 ? <Listado articulos={articulos} setArticulos={setArticulos} /> : <h1>No hay artículo</h1>
            }
        </>
    );
};
