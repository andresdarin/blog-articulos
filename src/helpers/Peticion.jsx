// Definición de la función Peticion que realiza una solicitud HTTP a la URL proporcionada
export const Peticion = async (url, metodo, datosGuardar = null) => {
    // Configuración inicial de las opciones de la solicitud
    let opciones = {
        method: metodo, // Método HTTP (GET, POST, PUT, DELETE)
        headers: {
            "Content-Type": "application/json" // Establece el tipo de contenido a JSON
        }
    };

    // Si el método es POST o PUT, agrega el cuerpo de la solicitud
    if (metodo === 'POST' || metodo === 'PUT') {
        opciones.body = JSON.stringify(datosGuardar); // Convierte los datos a una cadena JSON y los agrega al cuerpo
    }

    // Realiza la solicitud fetch con la URL y las opciones configuradas
    const peticion = await fetch(url, opciones);

    // Espera la respuesta y la convierte a formato JSON
    const datos = await peticion.json();

    // Retorna un objeto con los datos obtenidos y el estado de carga
    return {
        datos, // Datos obtenidos de la respuesta
        cargando: false // Indica que la carga ha terminado
    };
}
