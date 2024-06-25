import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const Editar = () => {
  const { formulario, cambiado, setFormulario } = useForm({});
  const [resultado, setResultado] = useState(false);
  const [articulo, setArticulo] = useState({});
  const [errorMensaje, setErrorMensaje] = useState('');
  const params = useParams();

  useEffect(() => {
    // Al cargar el componente, obtener los datos del artículo
    conseguirArticulo();
  }, []);

  // Función para obtener los datos del artículo desde el servidor
  const conseguirArticulo = async () => {
    try {
      const { datos, error } = await Peticion(Global.url + 'articulo/' + params.id, 'GET');

      if (error) {
        setErrorMensaje("Error al cargar el artículo: " + error);
        return;
      }

      if (datos.status === "success") {
        // Actualizar el estado del artículo y del formulario con los datos obtenidos
        setArticulo(datos.articulo);
        setFormulario(datos.articulo); // Aquí se actualiza el formulario con los datos del artículo
      } else {
        setErrorMensaje("El artículo no existe");
      }
    } catch (error) {
      setErrorMensaje("Error al procesar la solicitud: " + error.message);
    }
  };

  // Función para guardar los cambios al artículo
  const editarArticulo = async (e) => {
    e.preventDefault();

    try {
      let nuevoArticulo = formulario;
      const { datos, error } = await Peticion(Global.url + "editar/" + params.id, "POST", nuevoArticulo);

      if (error) {
        setErrorMensaje("Error al guardar el artículo: " + error);
        return;
      }

      if (datos) {
        const articulo = datos.articulo;
        if (articulo && articulo._id) {
          setResultado(true);

          const fileInput = document.querySelector("#file-upload");

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
      <h1>Estás editando {articulo.titulo}</h1>
      {errorMensaje && <div className="alert alert-danger">{errorMensaje}</div>}
      <strong>{resultado ? "Artículo guardado con éxito" : ""}</strong>

      <form className='formulario' onSubmit={editarArticulo}>
        <div className="form-group">
          <input
            type='text'
            name='titulo'
            placeholder='Título'
            defaultValue={formulario.titulo || ''}
            onChange={cambiado}
          />
        </div>
        <div className="form-group">
          <textarea
            name='contenido'
            placeholder='Contenido'
            value={formulario.contenido || ''}
            onChange={cambiado}
          />
        </div>
        <div className="form-group">
          <div className='mask'>
            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
            {articulo.imagen == "default.png" && <img src='https://react.semantic-ui.com/images/wireframe/image.png' />}
          </div>
          <input type='file' name='file0' id='file-upload' className='file-upload-input' />
          <label htmlFor="file-upload" className="file-upload-label">Subir Imagen</label>
          <input type='submit' value="Guardar" className='btn btn-success' />
        </div>
      </form>
    </div>
  )
}
