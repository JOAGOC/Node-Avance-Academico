// /src/controllers/aulas.js

const Aula = require('../models/aula');


const obtenerAulas = async (req, res) => {
  try {
    // Lógica para obtener todas las aulas
    res.send('Obtener todas las aulas');
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener las aulas' });
  }
};

const obtenerAulaPorId = async (req, res) => {
  const { id_aula } = req.params;
  try {
    // Lógica para obtener una aula por su ID (id_aula)
    res.send(`Obtener aula con id_aula: ${id_aula}`);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el aula con id_aula: ${id_aula}` });
  }
};

const crearAulas = async (req, res) => {
  const entrada = req.body; // Puede ser un único objeto o un array de objetos

  try {
    if (Array.isArray(entrada)) {
      // Si es un array, usar insertMany para inserción masiva
      const resultado = await Aula.insertMany(entrada);
      res.status(201).send(resultado);
    } else {
      // Si no es un array, asumir que es un solo objeto y usar create
      const resultado = await Aula.create(entrada);
      res.status(201).send(resultado);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear las aulas', detalles: error.message });
  }
};

const actualizarAula = async (req, res) => {
  const { id_aula } = req.params;
  const datosActualizados = req.body;
  try {
    // Lógica para actualizar una aula por su ID (id_aula)
    res.send(`Actualizar aula con id_aula: ${id_aula}`);
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el aula con id_aula: ${id_aula}` });
  }
};

const eliminarAula = async (req, res) => {
  const { id_aula } = req.params;
  try {
    // Lógica para eliminar una aula por su ID (id_aula)
    res.send(`Eliminar aula con id_aula: ${id_aula}`);
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el aula con id_aula: ${id_aula}` });
  }
};

module.exports = {
  obtenerAulas,
  obtenerAulaPorId,
  crearAulas,
  actualizarAula,
  eliminarAula
};
