// /src/models/materia.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Definir el esquema de Materia
const materiaSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  datos: {
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    descripcion: { type: String, required: true }
  },
  planDeEstudios: { type: String, required: true }
}, {
  timestamps: true
});

// Crear y exportar el modelo Materia basado en materiaSchema
const Materia = model('Materia', materiaSchema);
module.exports = Materia;
