// /src/controllers/aulas.js

const Aula = require('../models/aula');


const obtenerAulas = async (req, res) => {
  try {
    const resultado = await Aula.find({});
    res.status(200).send(resultado); // Responder con todas las aulas
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener las aulas', detalles: error.message });
  }
};


const obtenerAulaPorId = async (req, res) => {
  const { id_aula } = req.params; // Obtener id_aula de los parámetros de la URL
  try {
    const resultado = await Aula.findOne({ id_aula }); // Buscar el aula por su id_aula
    if (!resultado) {
      return res.status(404).send({ error: `Aula con id_aula: ${id_aula} no encontrada` });
    }
    res.status(200).send(resultado); // Responder con el aula encontrada
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el aula con id_aula: ${id_aula}`, detalles: error.message });
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
  const { id_aula } = req.params; // Obtener id_aula de los parámetros de la URL
  const datosActualizados = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

  try {
    // Buscar y actualizar el aula por su id_aula
    const resultado = await Aula.findOneAndUpdate({ id_aula }, datosActualizados, { new: true });
    if (!resultado) {
      return res.status(404).send({ error: `Aula con id_aula: ${id_aula} no encontrada` });
    }
    res.status(200).send(resultado); // Responder con el aula actualizada
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el aula con id_aula: ${id_aula}`, detalles: error.message });
  }
};

const eliminarAula = async (req, res) => {
  const { id_aula } = req.params; // Obtener id_aula de los parámetros de la URL
  try {
    // Buscar y eliminar el aula por su id_aula
    const resultado = await Aula.findOneAndDelete({ id_aula });
    if (!resultado) {
      return res.status(404).send({ error: `Aula con id_aula: ${id_aula} no encontrada` });
    }
    res.status(200).send({ message: `Aula con id_aula: ${id_aula} eliminada` }); // Responder con mensaje de éxito
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el aula con id_aula: ${id_aula}`, detalles: error.message });
  }
};

module.exports = {
  obtenerAulas,
  obtenerAulaPorId,
  crearAulas,
  actualizarAula,
  eliminarAula
};
