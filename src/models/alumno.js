// /src/models/alumno.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Definir el esquema de Alumno
const alumnoSchema = new Schema({
  nctrl: { type: String, required: true, unique: true },
  datos: {
    id_curp: { type: String, required: true },
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    tecnologico: { type: String, required: true }
  },
  expediente_academico: {
    reticula: [{
      id: { type: Number, required: true },
      datos: {
        nombre: { type: String, required: true },
        carrera: { type: String, required: true },
        descripcion: { type: String, required: true }
      },
      planDeEstudios: { type: String, required: true }
    }],
    grupos_cursados: [{
      grupo: { type: Schema.Types.ObjectId, ref: 'Grupo', required: true },
      calificacion: { type: Number, required: true }
    }]
  }
}, {
  // Configuración de opciones del esquema: timestamps agrega createdAt y updatedAt automáticamente
  timestamps: true
});

// Crear y exportar el modelo Alumno basado en alumnoSchema
const Alumno = model('Alumno', alumnoSchema);
module.exports = Alumno;
