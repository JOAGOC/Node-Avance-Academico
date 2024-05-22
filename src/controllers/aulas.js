// /src/controllers/aulas.js

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

const crearAula = async (req, res) => {
  const aula = req.body;
  try {
    // Lógica para crear una nueva aula
    res.send('Crear una nueva aula');
  } catch (error) {
    res.status(500).send({ error: 'Error al crear una nueva aula' });
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
  crearAula,
  actualizarAula,
  eliminarAula
};
