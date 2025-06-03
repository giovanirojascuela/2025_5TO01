// Controlador para obtener todos los países
export const getPaises = (req, res) => {
    res.send("funcion para retornar todos los países");
};

// Controlador para obtener un solo país
export const getPais = (req, res) => {
    res.send(`funcion para retornar un país con id ${req.params.id}`);
};

// Controlador para crear un país
export const crearPais = (req, res) => {
    res.send("funcion para crear un nuevo país");
};

// Controlador para modificar un país
export const modificarPais = (req, res) => {
    res.send(`funcion para modificar un país con id ${req.params.id}`);
};

// Controlador para eliminar un país
export const eliminarPais = (req, res) => {
    res.send(`funcion para eliminar un país con id ${req.params.id}`);
};
