// /src/models/docente.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Definir el esquema de Materia Denormalizada
const materiaDenormalizadaSchema = new Schema({
  id: { type: Number, required: true },
  datos: {
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    descripcion: { type: String, required: true }
  },
  planDeEstudios: { type: String, required: true }
}, { _id: false });

// Definir el esquema de Docente
const docenteSchema = new Schema({
  id_rfc: { type: String, required: true, unique: true },
  datos: {
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    tecnologico: { type: String, required: true }
  },
  materias_impartidas: { type: [materiaDenormalizadaSchema], required: true }
}, {
  timestamps: true
});

// Crear y exportar el modelo Docente basado en docenteSchema
const Docente = model('Docente', docenteSchema);
module.exports = Docente;
