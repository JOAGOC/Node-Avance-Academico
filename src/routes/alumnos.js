// /src/routes/alumnos.js
const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/alumnos');

// Ruta para obtener todos los alumnos
router.get('/', obtenerAlumnos);

// Ruta para obtener un alumno por su número de control (nctrl)
router.get('/:nctrl', obtenerAlumnoNctrl);

// Ruta para crear un nuevo alumno
router.post('/', crearAlumno);

// Ruta para actualizar un alumno por su número de control (nctrl)
router.put('/:nctrl', actualizarAlumno);

// Ruta para eliminar un alumno por su número de control (nctrl)
router.delete('/:nctrl', eliminarAlumno);

// Ruta para obtener las calificaciones de un alumno en todas sus materias cursadas
router.get('/:nctrl/calificaciones', obtenerCalificacionesAlumno);

// Ruta para listar las materias que un alumno ha cursado
router.get('/:nctrl/materias', obtenerMateriasAlumno);

// Ruta para listar las materias que cursa un alumno en específico en una hora específica
router.get('/:nctrl/materias/hora/:hora', obtenerMateriasAlumnoPorHora);

// Ruta para listar las materias que faltan por cursar a un alumno en específico
router.get('/:nctrl/porCursar', obtenerMateriasPorCursar);

// Ruta para listar los alumnos que están cursando una materia específica de un grupo específico
router.get('/grupo/:id', obtenerAlumnosPorGrupoMateria);

module.exports = router;