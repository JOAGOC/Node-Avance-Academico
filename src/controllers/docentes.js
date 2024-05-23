// /src/controllers/docentes.js

const Docente = require('../models/docente');
const Grupo = require('../models/grupo');

const obtenerDocentes = async (req, res) => {
  try {
    const respuesta = await Docente.find({});
    res.status(200).send(respuesta)
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los docentes', detalles: error.message });
  }
};

const obtenerDocentePorRFC = async (req, res) => {
  const { id_rfc } = req.params;
  try {
    const resultado = await Docente.findOne({ id_rfc });
    if (!resultado) {
      return res.status(404).send({ error: `Docente con rfc: ${id_rfc} no encontrado` })
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el docente con RFC: ${id_rfc}`, detalles: error.message });
  }
};

const crearDocente = async (req, res) => {
  const docente = req.body;
  try {
    if (Array.isArray(docente)) {
      const resultado = await Docente.insertMany(docente);
      res.status(201).send(resultado);
    } else {
      const resultado = await Docente.create(docente);
      res.status(201).send(resultado);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear un nuevo docente', detalles: error.message });
  }
};

const actualizarDocente = async (req, res) => {
  const { id_rfc } = req.params;
  const datosActualizados = req.body;
  try {
    const resultado = await Docente.findOneAndUpdate({ id_rfc }, datosActualizados, { new: true });
    if (!resultado) {
      return res.status(404).send({ error: `Docente con rfc: ${id_rfc} no encontrado` });
    }
    res.status(201).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el docente con RFC: ${id_rfc}`, detalles: error.message });
  }
};

const eliminarDocente = async (req, res) => {
  const { id_rfc } = req.params;
  try {
    const resultado = await Docente.findOneAndDelete({ id_rfc });
    if (!resultado) {
      return res.status(404).send({ error: `Docente con rfc: ${id_rfc} no encontrado` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el docente con RFC: ${id_rfc}`, detalles: error.message });
  }
};

//TODO:
const obtenerMateriasImpartidasPorDocente = async (req, res) => {
  const { rfc } = req.params;
  try {
    const resultado = await Grupo.aggregate([
      {
        $match: {
          "docente.id_rfc": rfc,
        },
      },
      {
        $group: {
          _id: "$docente.id_rfc",
          docente: { $first: "$docente" },
          grupos: {
            $push: {
              horario: "$horario",
              aula: "$aula",
              materia: "$materia",
              alumnos: "$alumnos",
            },
          },
        },
      },
      {
        $project: {'docente.materias_impartidas':0}
      }
    ]);
    res.status(200).json(resultado);
  } catch (error) {
    // Maneja los errores
    res.status(500).json({ message: 'Error en la operación q9', detalle: error.message });
  }
};

const obtenerDocentesPorMateria = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    const resultado = await Docente.aggregate([
      { $unwind: "$materias_impartidas" },
      {
        $match: {
          "materias_impartidas.id": id
        }
      },
      {
        $group: {
          _id: "$materias_impartidas.id",
          materia: { $first: "$materias_impartidas" },
          docentes: { $push: "$datos" },
        },
      }
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los docentes que imparten la materia con ID: ${id}`, detalles: error.message });
  }
};

module.exports = {
  obtenerDocentes,
  obtenerDocentePorRFC,
  crearDocente,
  actualizarDocente,
  eliminarDocente,
  obtenerMateriasImpartidasPorDocente,
  obtenerDocentesPorMateria
};
