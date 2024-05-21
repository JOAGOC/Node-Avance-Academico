require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const { mongoose, redisClient } = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// TODO: 
// app.use(logger);

// Importamos las rutas
const alumnosRoutes = require('./routes/alumnos');
const materiasRoutes = require('./routes/materias');
const gruposRoutes = require('./routes/grupos');
const docentesRoutes = require('./routes/docentes');
const aulasRoutes = require('./routes/aulas');

// Usamos las rutas importadas
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/docentes', docentesRoutes);
app.use('/api/aulas', aulasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
