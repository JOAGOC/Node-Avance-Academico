// /src/controllers/alumnos.js

const Alumno = require('../models/alumno');
const Grupo = require('../models/grupo');

const obtenerAlumnos = async (req, res) => {
  try {
    const resultado = await Alumno.find({});
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los alumnos', detalle: error.message });
  }
};

const obtenerAlumnoNctrl = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.findOne({ nctrl });
    if (!resultado) {
      return res.status(404).send({ error: `Alumno con nctrl: ${nctrl} no encontrado` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const crearAlumno = async (req, res) => {
  const alumno = req.body;
  try {
    if (Array.isArray(alumno)) {
      const resultado = await Alumno.insertMany(alumno);
      res.status(201).send(resultado);
    } else {
      const resultado = await Alumno.create(alumno);
      res.status(201).send(resultado);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear un nuevo alumno', detalle: error.message });
  }
};

const actualizarAlumno = async (req, res) => {
  const { nctrl } = req.params;
  const datosActualizados = req.body;
  try {
    const resultado = await Alumno.findOneAndUpdate({ nctrl }, datosActualizados, { new: true });
    if (!resultado) {
      return res.status(404).send({ error: `Alumno con nctrl: ${nctrl} no encontrado` });
    }
    res.status(201).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const eliminarAlumno = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.findOneAndDelete({ nctrl });
    if (!resultado) {
      return res.status(404).send({ error: `Alumno con nctrl: ${nctrl} no encontrado` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const obtenerCalificacionesAlumno = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.aggregate([
      { $match: { nctrl: nctrl } },
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
        $group: {
          _id: "$nctrl",
          alumno: { $first: "$datos" },
          materias: {
            $push: {
              calificacion: "$expediente_academico.grupos_cursados.calificacion",
              materia: "$expediente_academico.grupos_cursados.grupo.materia",
            },
          },
        },
      },
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las calificaciones del alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const obtenerMateriasAlumno = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.aggregate([
      { $match: { nctrl: nctrl } },
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
        $group: {
          _id: "$nctrl",
          alumno: { $first: "$datos" },
          materias: {
            $push: "$expediente_academico.grupos_cursados.grupo.materia",
          },
        },
      },
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las materias cursadas del alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const obtenerMateriasAlumnoPorHora = async (req, res) => {
  const { nctrl } = req.params;
  let { hora } = req.params;
  hora = parseInt(hora);
  try {
    const resultado = await Alumno.aggregate([
      { $match: { nctrl: nctrl } },
      {
        $lookup: {
          from: "grupos",
          localField: "expediente_academico.grupos_cursados.grupo",
          foreignField: "id",
          as: "expediente_academico.grupos_cursados.grupo",
        },
      },
      { $unwind: '$expediente_academico.grupos_cursados.grupo' },
      { $match: { 'expediente_academico.grupos_cursados.grupo.horario': hora } },
      {
        $group: {
          '_id': '$nctrl',
          'alumno': { $first: '$datos' },
          'materias': {
            $push: {
              'horario': '$expediente_academico.grupos_cursados.grupo.horario',
              'materia': '$expediente_academico.grupos_cursados.grupo.materia',
            }
          }
        }
      }
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las materias del alumno con nctrl: ${nctrl} a la hora: ${hora}`, detalle: error.message });
  }
};

const obtenerMateriasPorCursar = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.aggregate([
      { $match: { nctrl: nctrl } },
      {
        $lookup: {
          from: "grupos",
          localField: "expediente_academico.grupos_cursados.grupo",
          foreignField: "id",
          as: "expediente_academico.grupos_cursados.grupo",
        },
      },
      {
        $project: {
          _id: '$nctrl',
          alumno: '$datos',
          materias: '$expediente_academico.grupos_cursados.grupo.materia',
          reticula: '$expediente_academico.reticula'
        }
      },
      {
        $addFields: {
          // Extraemos los IDs de las materias cursadas
          materiasIds: {
            $map: {
              input: '$materias',
              as: 'materia',
              in: '$$materia.id'
            }
          },
          // Extraemos los IDs de la reticula
          reticulaIds: {
            $map: {
              input: '$reticula',
              as: 'materia',
              in: '$$materia.id'
            }
          }
        }
      },
      {
        $addFields: {
          // Obtenemos los IDs de las materias que están en reticula pero no en materias cursadas
          materiasPorCursarIds: {
            $setDifference: ['$reticulaIds', '$materiasIds']
          }
        }
      },
      {
        $addFields: {
          // Filtramos las materias de la reticula para obtener los subdocumentos completos de las materias por cursar
          materiasPorCursar: {
            $filter: {
              input: '$reticula',
              as: 'materia',
              cond: { $in: ['$$materia.id', '$materiasPorCursarIds'] }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          alumno: 1,
          materiasPorCursar: 1
        }
      }
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las materias por cursar del alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const obtenerAlumnosPorGrupoMateria = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Grupo.findOne({ id }, 'materia alumnos');
    if (!resultado) {
      return res.status(404).send({ error: `El grupo con el id ${id} no fue encontrado` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los alumnos del grupo con id: ${id} que cursan la materia`, detalle: error.message });
  }
};

module.exports = {
  obtenerAlumnos,
  obtenerAlumnoNctrl,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno,
  obtenerCalificacionesAlumno,
  obtenerMateriasAlumno,
  obtenerMateriasAlumnoPorHora,
  obtenerMateriasPorCursar,
  obtenerAlumnosPorGrupoMateria
};