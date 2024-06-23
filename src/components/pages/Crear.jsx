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
            let nuevoArticulo = formulario;
            const { datos, cargando, error } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);

            if (error) {
                setErrorMensaje("Error al guardar el artículo: " + error);
                return;
            }

            if (datos) {
                const articulo = datos.articulo;
                if (articulo && articulo._id) {
                    setResultado(true);

                    const fileInput = document.querySelector("#file");

                    if (fileInput.files.length > 0) {
                        const formData = new FormData();
                        formData.append('file0', fileInput.files[0]);

                        const subida = await Peticion(Global.url + "subir-imagen/" + articulo._id, "POST", formData, true);

                        if (subida.error) {
                            setErrorMensaje("Error al subir la imagen: " + subida.error);
                        } else {
                            console.log("Imagen subida correctamente:", subida.datos);
                        }
                    } else {
                        console.log("No se seleccionó ninguna imagen para subir.");
                    }
                } else {
                    setErrorMensaje("Error al guardar el artículo: " + JSON.stringify(datos));
                }
            } else {
                setErrorMensaje("La respuesta del servidor está vacía");
            }
        } catch (error) {
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