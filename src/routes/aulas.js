// /src/routes/aulas.js
const express = require('express');
const router = express.Router();
const {
    obtenerAulas,
    obtenerAulaPorId,
    crearAulas,
    actualizarAula,
    eliminarAula
} = require('../controllers/aulas');

// Ruta para obtener todas las aulas
router.get('/', obtenerAulas);

// Ruta para obtener una aula por su ID (id_aula)
router.get('/:id_aula', obtenerAulaPorId);

// Ruta para crear una nueva aula
router.post('/', crearAulas);

// Ruta para actualizar una aula por su ID (id_aula)
router.put('/:id_aula', actualizarAula);

// Ruta para eliminar una aula por su ID (id_aula)
router.delete('/:id_aula', eliminarAula);

module.exports = router;
