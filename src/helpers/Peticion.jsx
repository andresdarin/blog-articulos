export const Peticion = async (url, metodo, datosGuardar = null, archivos = false) => {
    let opciones = {
        method: metodo,
    };

    if ((metodo === 'POST' || metodo === 'PUT') && datosGuardar) {
        if (archivos) {
            opciones.body = datosGuardar; // Aquí, datosGuardar es una instancia de FormData
        } else {
            opciones.headers = {
                "Content-Type": "application/json"
            };
            opciones.body = JSON.stringify(datosGuardar);
        }
    }

    try {
        const peticion = await fetch(url, opciones);

        // Verifica que la respuesta sea JSON antes de parsearla
        const contentType = peticion.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("La respuesta no es un JSON válido");
        }

        const datos = await peticion.json();
        return {
            datos,
            cargando: false
        };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {
            datos: null,
            cargando: false,
            error: error.message
        };
    }
}