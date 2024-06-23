import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const Crear = () => {
    const { formulario, cambiado } = useForm({});
    const [resultado, setResultado] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState('');

    const guardarArticulo = async (e) => {
        e.preventDefault();

        try {
            // Enviar datos del formulario al backend
            const { datos, cargando } = await Peticion(Global.url + "crear", "POST", formulario);

            // Verificar si la respuesta contiene datos antes de intentar parsear
            if (datos) {
                try {
                    // Acceder directamente a datos.articulo
                    const articulo = datos.articulo;
                    if (articulo && articulo._id) { // Verificar que haya un ID válido, por ejemplo
                        setResultado(true);

                        //subir la imagen
                        
                    } else {
                        console.error("Error al guardar el artículo:", datos);
                        setErrorMensaje("Error al guardar el artículo: " + JSON.stringify(datos));
                    }
                } catch (parseError) {
                    console.error("Error al parsear la respuesta JSON:", parseError);
                    setErrorMensaje("Error al parsear la respuesta JSON");
                }
            } else {
                console.error("La respuesta del servidor está vacía.");
                setErrorMensaje("La respuesta del servidor está vacía");
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            setErrorMensaje("Error al procesar la solicitud: " + error.message);
        }
    }


    return (
        <div className="jumbo">
            <h1>Crear Artículo</h1>
            <p>Formulario para crear un artículo</p>
            {errorMensaje && <div className="alert alert-danger">{errorMensaje}</div>}
            <strong>{resultado ? "Artículo guardado con éxito" : ""}</strong>

            <form className='formulario' onSubmit={guardarArticulo}>
                <div className="form-group">
                    <input type='text' name='titulo' placeholder='Título' value={formulario.titulo || ''} onChange={cambiado} />
                </div>
                <div className="form-group">
                    <textarea name='contenido' placeholder='Contenido' value={formulario.contenido || ''} onChange={cambiado} />
                </div>
                <div className="form-group">
                    <input type='file' name='file0' id='file' />
                </div>

                <input type='submit' value="Guardar" className='btn btn-success' />
            </form>
        </div>
    )
}
