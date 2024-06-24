import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";

export const SideBar = () => {

    const [buscar, setBuscar] = useState("")
    const navegar = useNavigate();

    const hacerBusqueda = (e) => {
        e.preventDefault();
        let miBusqueda = e.target.search_field.value;

        navegar("/buscar/" + miBusqueda, { replace: true })
    }

    return (
        <aside className="lateral">
            <div className="search">
                <form onSubmit={hacerBusqueda}>
                    <input type="text" placeholder='Te ayudo a encontrar un artículo?' id="search_field" />
                    <button type='submit' id="search">Buscar</button>
                </form>
            </div>

            {/*<div className="add">
                <h3 className="title">Añadir pelicula</h3>
                <form>
                    <input type="text" id="title" placeholder="Titulo" />
                    <textarea id="description" placeholder="Descripción"></textarea>
                    <input type="submit" id="save" value="Guardar" />
                </form>
            </div>*/}
        </aside>
    )
}
