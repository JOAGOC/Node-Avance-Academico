// /src/routes/grupos.js
const express = require('express');
const router = express.Router();
const {
  obtenerGrupos,
  obtenerGrupoPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
  obtenerGruposPorMateria
} = require('../controllers/grupos');

// Ruta para obtener todos los grupos
router.get('/', obtenerGrupos);

// Ruta para obtener un grupo por su ID
router.get('/:id', obtenerGrupoPorId);

// Ruta para crear un nuevo grupo
router.post('/', crearGrupo);

// Ruta para actualizar un grupo por su ID
router.put('/:id', actualizarGrupo);

// Ruta para eliminar un grupo por su ID
router.delete('/:id', eliminarGrupo);

// Ruta para obtener los grupos que correspondan a una materia específica
router.get('/materia/:id', obtenerGruposPorMateria);

module.exports = router;
