require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express'); // Framework para construir aplicaciones web y APIs
const cors = require('cors'); // Middleware para permitir solicitudes de recursos cruzados
const morgan = require('morgan'); // Middleware para el registro de solicitudes HTTP
const logger = require('./middleware/logger'); // Middleware personalizado para registrar solicitudes en Redis
const { mongoose, redisClient } = require('./config/db'); // Importamos las configuraciones de MongoDB y Redis

// Creamos una instancia de la aplicación Express
const app = express();
// Middleware para parsear solicitudes JSON
app.use(express.json());
// Middleware para permitir solicitudes de recursos cruzados
app.use(cors());
// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));
// Middleware personalizado para registrar solicitudes en Redis
app.use(logger);

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
