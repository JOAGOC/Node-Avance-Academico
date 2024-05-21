// /src/routes/docentes.js
const express = require('express');
const router = express.Router();
const {
  obtenerDocentes,
  obtenerDocentePorRFC,
  crearDocente,
  actualizarDocente,
  eliminarDocente,
  obtenerMateriasImpartidasPorDocente,
  obtenerDocentesPorMateria
} = require('../controllers/docentes');

// Ruta para obtener todos los docentes
router.get('/', obtenerDocentes);

// Ruta para obtener un docente por su RFC (id_rfc)
router.get('/:id_rfc', obtenerDocentePorRFC);

// Ruta para crear un nuevo docente
router.post('/', crearDocente);

// Ruta para actualizar un docente por su RFC (id_rfc)
router.put('/:id_rfc', actualizarDocente);

// Ruta para eliminar un docente por su RFC (id_rfc)
router.delete('/:id_rfc', eliminarDocente);

// Ruta para obtener las materias impartidas por un docente específico
router.get('/:rfc/grupos', obtenerMateriasImpartidasPorDocente);

// Ruta para obtener los docentes que imparten una materia específica
router.get('/materia/:id', obtenerDocentesPorMateria);

module.exports = router;