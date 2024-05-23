// /src/controllers/materias.js

const Materia = require('../models/materia');
const Alumno = require('../models/alumno');

const obtenerMaterias = async (req, res) => {
  try {
    const resultado = await Materia.find({});
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener las materias', detalles: error.message });
  }
};

const obtenerMateriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Materia.findOne({ id });
    if (!resultado) {
      return res.status(404).send({ error: `Materia con id: ${id} no encontrada` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener la materia con ID: ${id}`, detalles: error.message });
  }
};

const crearMaterias = async (req, res) => {
  const materia = req.body;
  try {
    if (Array.isArray(materia)) {
      const resultado = await Materia.insertMany(materia);
      res.status(201).send(resultado);
    } else {
      const resultado = await Materia.create(materia);
      res.status(201).send(resultado);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear una nueva materia', detalles: error.message });
  }
};

const actualizarMateria = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  try {
    const resultado = await Materia.findOneAndUpdate({ id }, datosActualizados, { new: true });
    if (!resultado) {
      return res.status(404).send({ error: `Materia con id: ${id} no encontrada` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar la materia con ID: ${id}`, detalles: error.message });
  }
};

const eliminarMateria = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Materia.findOneAndDelete({ id });
    if (!resultado) {
      return res.status(404).send({ error: `Materia con id: ${id} no encontrada` });
    }
    res.status(200).send({ message: `Materia con id: ${id} eliminada` })
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar la materia con ID: ${id}`, detalles: error.message });
  }
};

const obtenerAlumnosCalificacionSuperior = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let { calificacion_minima } = req.params;
  calificacion_minima = parseInt(calificacion_minima);
  try {
    const resultado = await Alumno.aggregate([
      {
        $project: {
          datos: 1,
          _id: 1,
          nctrl: 1,
          __v: 1,
          createdAt: 1,
          updatedAt: 1,
          'expediente_academico.grupos_cursados': {
            $filter: {
              input: '$expediente_academico.grupos_cursados',
              as: 'cursados',
              cond: { $gt: ['$$cursados.calificacion', calificacion_minima] }
            }
          }
        }
      },
      { $unwind: "$expediente_academico.grupos_cursados" },
      {
        $lookup: {
          from: "grupos",
          localField: "expediente_academico.grupos_cursados.grupo",
          foreignField: "id",
          as: "expediente_academico.grupos_cursados.grupo",
        },
      },
      { $unwind: "$expediente_academico.grupos_cursados.grupo" },
      {
        $match: {
          'expediente_academico.grupos_cursados.grupo.materia.id': id,
        }
      },
      {
        $group: {
          _id: "$expediente_academico.grupos_cursados.grupo.materia.id",
          materia: { $first: "$expediente_academico.grupos_cursados.grupo.materia" },
          alumnos: {
            $push: {
              alumno: "$datos",
              calificacion: "$expediente_academico.grupos_cursados.calificacion"
            }
          }
        }
      }
    ]);    
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los alumnos con calificación superior a ${calificacion_minima} en la materia con ID: ${id}` });
  }
};

module.exports = {
  obtenerMaterias,
  obtenerMateriaPorId,
  crearMateria: crearMaterias,
  actualizarMateria,
  eliminarMateria,
  obtenerAlumnosCalificacionSuperior
};
