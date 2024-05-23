// /src/controllers/grupos.js

const Grupo = require('../models/grupo');

const obtenerGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.find({});
    res.json(grupos);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los grupos', detalles: error.message });
  }
};

const obtenerGrupoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const grupo = await Grupo.findOne({id});
    if (!grupo) {
      return res.status(404).send({ error: `Grupo con id: ${id} no encontrado` });
    }
    res.json(grupo);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el grupo con ID: ${id}`, detalles: error.message });
  }
};

const crearGrupo = async (req, res) => {
  const grupo = req.body;
  try {
    if (Array.isArray(grupo)){
      const respuesta = await Grupo.insertMany(grupo);
      res.status(201).send(respuesta);
    } else {
      const respuesta = await Grupo.create(grupo);
      res.status(201).send(respuesta);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear un nuevo grupo', detalles: error.message });
  }
};

const actualizarGrupo = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  try {
    const grupoActualizado = await Grupo.findOneAndUpdate({id}, datosActualizados, { new: true});
    if (!grupoActualizado) {
      return res.status(404).send({ error: `Grupo con id: ${id} no encontrado` });
    }
    res.json(grupoActualizado);
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el grupo con ID: ${id}`, detalles: error.message });
  }
};

const eliminarGrupo = async (req, res) => {
  const { id } = req.params;
  try {
    const grupoEliminado = await Grupo.findOneAndDelete({id});
    if (!grupoEliminado) {
      return res.status(404).send({ error: `Grupo con id: ${id} no encontrado` });
    }
    res.json({ message: `Grupo con ID: ${id} eliminado` });
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el grupo con ID: ${id}`, detalles: error.message });
  }
};

const obtenerGruposPorMateria = async (req, res) => {
  let { id } = req.params; // Asumiendo que `id` es el ID de la materia
  id = parseInt(id);
  try {
    const grupos = await Grupo.find({ "materia.id": id }); // Asumiendo que el modelo Grupo tiene un campo `materia`
    res.json(grupos);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los grupos de la materia con ID: ${id}`, detalles: error.message });
  }
};

module.exports = {
  obtenerGrupos,
  obtenerGrupoPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
  obtenerGruposPorMateria
};
