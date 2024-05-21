// /src/routes/materias.js
const express = require('express');
const router = express.Router();
const {
  obtenerMaterias,
  obtenerMateriaPorId,
  crearMateria,
  actualizarMateria,
  eliminarMateria,
  obtenerAlumnosCalificacionSuperior
} = require('../controllers/materias');

// Ruta para obtener todas las materias
router.get('/', obtenerMaterias);

// Ruta para obtener una materia por su ID
router.get('/:id', obtenerMateriaPorId);

// Ruta para crear una nueva materia
router.post('/', crearMateria);

// Ruta para actualizar una materia por su ID
router.put('/:id', actualizarMateria);

// Ruta para eliminar una materia por su ID
router.delete('/:id', eliminarMateria);

// Ruta para obtener los alumnos que han obtenido una calificación superior a 90 en una materia específica
router.get('/:id/alumnos/calificacion_minima/:calificacion_minima', obtenerAlumnosCalificacionSuperior);

module.exports = router;
