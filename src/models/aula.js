// /src/models/aula.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Definir el esquema de Aula
const aulaSchema = new Schema({
  id_aula: {
    type: Number,
    required: true,
    unique: true
  },
  edificio: {
    type: String,
    required: true
  },
  // grupos_atendidos es un arreglo de ObjectIds referenciando al modelo 'Grupo'
  grupos_atendidos: [{
    type: Schema.Types.ObjectId,
    ref: 'Grupo',
    required: true
  }],
  descripcion_equipamiento: {
    type: String,
    required: true
  }
}, {
  // Configuración de opciones del esquema: timestamps agrega createdAt y updatedAt automáticamente
  timestamps: true
});

// Crear y exportar el modelo Aula basado en aulaSchema
const Aula = model('Aula', aulaSchema);
module.exports = Aula;
