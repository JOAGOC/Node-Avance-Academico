# Indice
- [Indice](#indice)
- [1. Estructura del proyecto](#1-estructura-del-proyecto)
- [2. Modelado de datos](#2-modelado-de-datos)
  - [MongoDB](#mongodb)
- [3. Tabla de Endpoints](#3-tabla-de-endpoints)
  - [3.1 api/alumnos](#31-apialumnos)
    - [JSON de las API de ALUMNOS](#json-de-las-api-de-alumnos)
  - [3.2 api/aulas](#32-apiaulas)
    - [JSON de las API de AULAS](#json-de-las-api-de-aulas)
  - [3.3 api/docentes](#33-apidocentes)
    - [JSON de las API de DOCENTES](#json-de-las-api-de-docentes)
  - [3.4 api/grupos](#34-apigrupos)
    - [JSON de las API de GRUPOS](#json-de-las-api-de-grupos)
  - [3.5 api/materias](#35-apimaterias)
    - [JSON de las API de MATERIAS](#json-de-las-api-de-materias)
- [4. Códigos y Procedimientos](#4-códigos-y-procedimientos)
  - [Procedimientos](#procedimientos)
    - [docker-compose](#docker-compose)
    - [DOCKERFILE](#dockerfile)
      - [.dockerignore](#dockerignore)
    - [.env](#env)
    - [package.json](#packagejson)
      - [Versión para Desarrollo](#versión-para-desarrollo)
    - [Arrancar el escenario](#arrancar-el-escenario)
  - [Código /src](#código-src)
    - [/models](#models)
      - [models/materia.js](#modelsmateriajs)
      - [models/aula.js](#modelsaulajs)
      - [models/docente.js](#modelsdocentejs)
      - [models/alumno.js](#modelsalumnojs)
      - [models/grupo.js](#modelsgrupojs)
    - [/routes](#routes)
      - [routes/aulas.js](#routesaulasjs)
      - [routes/grupos.js](#routesgruposjs)
      - [routes/materias.js](#routesmateriasjs)
      - [routes/docentes.js](#routesdocentesjs)
      - [routes/alumnos.js](#routesalumnosjs)
    - [/config](#config)
      - [config/db.js](#configdbjs)
    - [/middleware](#middleware)
      - [middleware/logger.js](#middlewareloggerjs)
    - [src/server.js](#srcserverjs)
    - [/controllers](#controllers)
      - [controllers/grupos.js](#controllersgruposjs)
      - [controllers/aulas.js](#controllersaulasjs)
      - [controllers/docentes.js](#controllersdocentesjs)
      - [controllers/materias.js](#controllersmateriasjs)
      - [controllers/alumnos.js](#controllersalumnosjs)
- [5. DOCKERFILE](#5-dockerfile)
- [6. docker-compose](#6-docker-compose)
- [7. Escenario de datos](#7-escenario-de-datos)
- [8. JSON postman para probar las querys y montar el escenario de datos.](#8-json-postman-para-probar-las-querys-y-montar-el-escenario-de-datos)


# 1. Estructura del proyecto 
```bash
.
├─ src
    ├── config
    │   └── db.js
    ├── controllers
    │   ├── alumnos.js
    │   ├── aulas.js
    │   ├── docentes.js
    │   ├── grupos.js
    │   └── materias.js
    ├── middleware
    │   └── logger.js
    ├── models
    │   ├── alumno.js
    │   ├── aula.js
    │   ├── docente.js
    │   ├── grupo.js
    │   └── materia.js
    ├── routes
    │   ├── alumnos.js
    │   ├── aulas.js
    │   ├── docentes.js
    │   ├── grupos.js
    │   └── materias.js
    └── server.js
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

# 2. Modelado de datos
## MongoDB
```yaml
Alumno:
  ID_curp
  nctrl
  Nombre
  Carrera
  Tecnológico
  Expediente académico (calificaciones, materias cursadas, avance académico.)

Docente:
  ID_RFC
  Nombre
  Carrera
  Tecnológico
  Materias impartidas en el semestre

Materia:
  ID
  Nombre
  Carrera
  Descripción
  Plan de estudios

Grupo:
  ID_grupo
  Materia
  Docente
  Estudiantes
  Aula
  Horario (hora en que se imparte la clase)

Aula:
  IDaula
  Edificio
  Grupos atendidos en dicha aula
  Descripción de equipamiento
```

# 3. Tabla de Endpoints

## 3.1 api/alumnos
| Método | URL                                     | Params/Body                                           | Descripción                                                                        |
|--------|-----------------------------------------|-------------------------------------------------------|------------------------------------------------------------------------------------|
| POST   | /api/alumnos                            | Body: JSON con los datos del alumno o arreglo de JSON | Inserta un alumno en la colección de alumnos                                       |
| GET    | /api/alumnos                            | Null                                                  | Obtiene la lista de alumnos                                                        |
| GET    | /api/alumnos/:nctrl                     | Param: nctrl en la URL                                | Obtiene la información de un alumno en específico                                  |
| PUT    | /api/alumnos/:nctrl                     | Param: nctrl en la URL, Body: JSON con los datos      | Actualiza la información de un alumno específico                                   |
| DELETE | /api/alumnos/:nctrl                     | Param: nctrl en la URL                                | Elimina un alumno en específico                                                    |
| GET    | /api/alumnos/:nctrl/calificaciones      | Param: nctrl en la URL                                | Lista las calificaciones de un alumno en todas sus materias cursadas               |
| GET    | /api/alumnos/:nctrl/materias            | Param: nctrl en la URL                                | Lista las materias que un alumno ha cursado                                        |
| GET    | /api/alumnos/:nctrl/materias/hora/:hora | Param: nctrl en la URL y hora                         | Lista las materias que cursa un alumno en específico (horario)                     |
| GET    | /api/alumnos/:nctrl/porCursar           | Param: nctrl en la URL                                | Lista las materias que faltan por cursar a un alumno en específico                 |
| GET    | /api/alumnos/grupo/:id                  | Param: id en la URL, Query: materia                   | Lista los alumnos que están cursando una materia específica de un grupo específico |

### JSON de las API de ALUMNOS
```JSON
{
    "datos": {
        "id_curp": "ABC123456XYZ",
        "nombre": "Carlos Gómez Ramírez",
        "carrera": "Ingeniería en Sistemas Computacionales",
        "tecnologico": "Instituto Tecnológico de Tepic"
    },
    "expediente_academico": {
        "reticula": [
            {
                "datos": {
                    "nombre": "NOSQL",
                    "carrera": "Ingeniería en Sistemas Computacionales",
                    "descripcion": "Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación."
                },
                "id": 1,
                "planDeEstudios": "Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas."
            }//{Materias...},
        ],
        "grupos_cursados": [
            {
                "grupo": 2,
                "calificacion": 78
            },
            {
                "grupo": 3,
                "calificacion": 70
            }//{..."grupo":idGrupo,"calificacion":cal}
        ]
    },
    "nctrl": "20400748"
}
```

## 3.2 api/aulas
| Método | URL                 | Params/Body                                                                   | Descripción                                     |
|--------|---------------------|-------------------------------------------------------------------------------|-------------------------------------------------|
| POST   | /api/aulas          | Body: JSON con los datos del aula o un Arreglo de JSON con los datos del aula | Inserta aulas en la colección de aulas          |
| GET    | /api/aulas          | Null                                                                          | Obtiene la lista de las aulas almacenadas       |
| PUT    | /api/aulas/:id_aula | Param: id_aula en la URL, Body: JSON con los datos                            | Actualiza la información de un aula específica  |
| GET    | /api/aulas/:id_aula | Param: id_aula en la URL                                                      | Obtiene la información de un aula en específico |
| DELETE | /api/aulas/:id_aula | Param: id_aula en la URL                                                      | Elimina la información de un aula en específico |

### JSON de las API de AULAS
```JSON
{
    "id_aula": 4,
    "edificio": "Edificio D",
    "grupos_atendidos": [
        8,
        11,
        10
    ],
    "descripcion_equipamiento": "Sala de conferencias con proyector, sillas cómodas y sistema de videoconferencia."
}
```

## 3.3 api/docentes
| Método | URL                       | Params/Body                                                            | Descripción                                                                                                        |
|--------|---------------------------|------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| POST   | /api/docentes             | Body: JSON con los datos del docente o Array con los datos del docente | Inserta un docente en la colección de docentes                                                                     |
| GET    | /api/docentes             | Null                                                                   | Obtiene la lista de docentes almacenados                                                                           |
| GET    | /api/docentes/:id_rfc     | Param: id_rfc en la URL                                                | Obtiene la información de un docente en específico por su RFC                                                      |
| PUT    | /api/docentes/:id_rfc     | Param: id_rfc en la URL, Body: JSON con los datos                      | Actualiza la información de un docente en específico por su RFC                                                    |
| DELETE | /api/docentes/:id_rfc     | Param: id_rfc en la URL                                                | Elimina un docente en específico por su RFC                                                                        |
| GET    | /api/docentes/:rfc/grupos | Param: rfc en la URL                                                   | Lista las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias |
| GET    | /api/docentes/materia/:id | Param: id en la URL                                                    | Lista los docentes que imparten una materia específica                                                             |

### JSON de las API de DOCENTES
```JSON
{
    "datos": {
        "nombre": "José Luis Morales",
        "carrera": "Ingeniería en Sistemas Computacionales",
        "tecnologico": "Instituto Tecnológico de Tepic"
    },
    "id_rfc": "MNOP345678QRS",
    "materias_impartidas": [
        {
            "datos": {
                "nombre": "Bases de Datos",
                "carrera": "Ingeniería en Sistemas Computacionales",
                "descripcion": "Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración."
            },
            "id": 9,
            "planDeEstudios": "Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia."
        }
    ]
}
```

## 3.4 api/grupos
| Método | URL                     | Params/Body                                   | Descripción                                                          |
|--------|-------------------------|-----------------------------------------------|----------------------------------------------------------------------|
| POST   | /api/grupos             | Body: JSON con los datos del grupo o Array    | Inserta un grupo en la colección de grupos                           |
| GET    | /api/grupos             | Null                                          | Obtiene la lista de grupos almacenados                               |
| GET    | /api/grupos/:id         | Param: id en la URL                           | Obtiene la información de un grupo en específico por su ID           |
| PUT    | /api/grupos/:id         | Param: id en la URL, Body: JSON con los datos | Actualiza la información de un grupo en específico por su ID         |
| DELETE | /api/grupos/:id         | Param: id en la URL                           | Elimina un grupo en específico por su ID                             |
| GET    | /api/grupos/materia/:id | Param: id en la URL                           | Lista los grupos que correspondan a una materia específica por su ID |

### JSON de las API de GRUPOS
```JSON
{
    "docente": {
        "datos": {
            "nombre": "Juan Carlos Hernández García",
            "carrera": "Ingeniería en Sistemas Computacionales",
            "tecnologico": "Instituto Tecnológico de Tepic"
        },
        "id_rfc": "ABCD123456EFG"
    },
    "aula": {
        "id_aula": 1,
        "edificio": "Edificio A",
        "descripcion_equipamiento": "Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado."
    },
    "materia": {
        "datos": {
            "nombre": "NOSQL",
            "carrera": "Ingeniería en Sistemas Computacionales",
            "descripcion": "Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación."
        },
        "id": 1,
        "planDeEstudios": "Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas."
    },
    "_id": "664f8b75239228c63a7bb8d2",
    "id": 1,
    "alumnos": [
        {
            "datos": {
                "id_curp": "DEF789012JKL",
                "nombre": "Ana María Torres",
                "carrera": "Ingeniería en Sistemas Computacionales",
                "tecnologico": "Instituto Tecnológico de Tepic"
            },
            "nctrl": "20400749"
        }
    ],
    "horario": 15,
    "__v": 0,
    "createdAt": "2024-05-23T18:31:17.502Z",
    "updatedAt": "2024-05-23T18:31:17.502Z"
}
```

## 3.5 api/materias
| Método | URL                                                                | Params/Body                                                      | Descripción                                                                                                  |
|--------|--------------------------------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| POST   | /api/materias                                                      | Body: JSON con los datos de la materia o un Arreglo con materias | Inserta una materia en la colección de materias                                                              |
| GET    | /api/materias                                                      | Null                                                             | Obtiene la lista de materias almacenadas                                                                     |
| GET    | /api/materias/:id                                                  | Param: id en la URL                                              | Obtiene la información de una materia en específico por su ID                                                |
| PUT    | /api/materias/:id                                                  | Param: id en la URL, Body: JSON con los datos                    | Actualiza la información de una materia en específico por su ID                                              |
| DELETE | /api/materias/:id                                                  | Param: id en la URL                                              | Elimina una materia en específico por su ID                                                                  |
| GET    | /api/materias/:id/alumnos/calificacion_minima/:calificacion_minima | Param: id en la URL, Query: calificacion_minima en URL           | Lista los alumnos que han obtenido una calificación superior a calificacion_minima en una materia específica |

### JSON de las API de MATERIAS
```JSON
{
    "datos": {
        "nombre": "Sistemas Operativos",
        "carrera": "Ingeniería en Sistemas Computacionales",
        "descripcion": "Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos."
    },
    "id": 4,
    "planDeEstudios": "Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración."
}
```

# 4. Códigos y Procedimientos 

## Procedimientos

### docker-compose
Esta es la versión final con la imágen construida de docker-compose para correr el escenario y la aplicación. Se construye de esta forma y ejecuta cuando el proyecto ha finalizado. 
```yaml
version: '3.8'
services:
  app01:
    image: joagocdocker/node-avance-academico:latest
    ports:
      - "3000:3000"
    depends_on:
      - mongo01
      - mongo02
      - mongo03
      - redis01
    environment:
      - MONGO_URI=mongodb://mongo01:27017/avance_academico?replicaSet=replica
      - REDIS_HOST=redis01
      - REDIS_PORT=6379
      - PORT=3000
    networks:
      - red01

  mongo01:
    image: mongo:latest
    command: mongod --replSet replica --bind_ip_all
    ports:
      - "27017:27017"
    networks:
      - red01

  mongo02:
    image: mongo:latest
    command: mongod --replSet replica --bind_ip_all
    ports:
      - "27018:27017"
    networks:
      - red01

  mongo03:
    image: mongo:latest
    command: mongod --replSet replica --bind_ip_all
    ports:
      - "27019:27017"
    networks:
      - red01

  redis01:
    image: redis:latest
    ports:
      - "6379:6379"
    networks:
      - red01
networks:
  red01:
    driver: bridge
```

Mientras la app está en desarrollo y pruebas se puede poner la siguiente configuración en docker-compose para evitar reconstruir la imagen cada que el codigo fuente cambie.

```yaml
app01:
    build: . # <-
    ports:
      - "3000:3000"
    depends_on:
      - mongo01
      - mongo02
      - mongo03
      - redis01
    environment:
      - MONGO_URI=mongodb://mongo01:27017/avance_academico?replicaSet=replica
      - REDIS_HOST=redis01
      - REDIS_PORT=6379
      - PORT=3000
    volumes: # <-
      - .:/app
    networks:
      - red01
```

### DOCKERFILE
El archivo para construir la imágen de nuestra aplicación es el suguiente:

```Dockerfile
# Usar la imagen oficial de Node.js como base
FROM node
# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./
# Instalar las dependencias del proyecto
RUN npm install
# Copiar el resto de los archivos del proyecto al directorio de trabajo
COPY . .
# Exponer el puerto en el que la aplicación va a correr
EXPOSE 3000
# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
```

#### .dockerignore
Si estamos trabajando con .logs, y gestionando con git, debemos omitir lo siguiente:
```Ignore
# Ignorar los módulos de Node.js
node_modules
# Ignorar archivos de registro
*.log
# Ignorar archivos de entorno
.env
# Ignorar archivos de control de versiones
.git
.gitignore
```

### .env 
Debemos manejar este archivo para proporcionar los datos de las variables de entorno de nuestra app con dotenv. De esta forma configuramos  la conexión a MongoDB y a Redis, además de indicar el puerto de ejecución de Express.

```Properties
# URI de conexión a la base de datos MongoDB
# Formato: mongodb://[usuario:contraseña@]host:puerto/baseDeDatos
MONGO_URI=mongodb://mongo01:27017/avance_academico
# Host del servidor Redis
# Generalmente es el nombre del servicio definido en docker-compose o la dirección IP
# del servidor Redis
REDIS_HOST=redis01
# Puerto en el que Redis está escuchando
REDIS_PORT=6379
# Puerto en el que nuestra aplicaci'on Node.js escuchará
PORT=3000
```

### package.json
Las dependencias para este proyecto de node son las siguientes.
```JSON
{
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.4.0",
    "morgan": "^1.10.0",
    "redis": "^4.6.14"
  },
  "scripts": {
    "start": "node src/server.js"
  }
}
```

#### Versión para Desarrollo

Adicionalmente, podemos manejar una dependencia de desarrollo con nodemon, que reinicia el servidor de node cada vez que detecta un cambio en los archivos de la raiz del proyecto.
```JSON
{
  "devDependencies": {
    "nodemon": "^3.1.0"
  },
  "scripts": {
    "start": "nodemon src/server.js"
  }
}
```

### Arrancar el escenario

Suponiendo que ya está listo para iniciar el escenario, debe configurar el replicaSet de mongo de forma manual, ya que en el docker-compose sólo lo dejamos preparado, pero no configurado. Una vez inicie el escenario, debe entrar a cualquier contenedor de mongo mediante:

```bash
docker exec -ti mongo01 mongosh
```

***mongo01 es solo un nombre de ejemplo***

Y ejecutar la siguiente instrucción

```javascript
rs.initiate({
    _id: "replica",
    members: [
        { _id: 0, host: "mongo01:27017" },
        { _id: 1, host: "mongo02:27017" },
        { _id: 2, host: "mongo03:27017" }
    ]   
})
```

Preferiblemente deberá reiniciar su servidor de la app con:
```bash
docker stop app01
docker start app01
```

***app01 es el nombre del contenedor de la app***

De esta forma, la app podrá comunicarse sin problemas con el servidor de Mongo, el cuál ya tendrá configurado el replicaSet.

## Código /src

### /models

Esta sección del código almacena los archivos de estructura o esquema de los JSON de la base de datos. Exportan los modelos para que sean usados, principalmente desde los controladores. Indican la estructura, añadiendo metadatos como los timestamps y definiendo los datos que son requeridos para la estructura esperada del JSON que reciba para crear nuevos elementos en la colección, según el archivo. 

#### models/materia.js
```javascript
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
```

#### models/aula.js
```javascript
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
    type: Number,//ref
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
```

#### models/docente.js
```javascript
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
```

#### models/alumno.js
```javascript
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
      grupo: { type: Number, required: true },
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
```

#### models/grupo.js
```javascript
// /src/models/grupo.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Definir el esquema de Grupo
const grupoSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  docente: {
    id_rfc: { type: String, required: true },
    datos: {
      nombre: { type: String, required: true },
      carrera: { type: String, required: true },
      tecnologico: { type: String, required: true }
    },
    materias_impartidas: [{
      id: { type: Number, required: true },
      datos: {
        nombre: { type: String, required: true },
        carrera: { type: String, required: true },
        descripcion: { type: String, required: true }
      },
      planDeEstudios: { type: String, required: true }
    }]
  },
  aula: {
    id_aula: { type: Number, required: true },
    edificio: { type: String, required: true },
    descripcion_equipamiento: { type: String, required: true }
  },
  materia: {
    id: { type: Number, required: true },
    datos: {
      nombre: { type: String, required: true },
      carrera: { type: String, required: true },
      descripcion: { type: String, required: true }
    },
    planDeEstudios: { type: String, required: true }
  },
  alumnos: [{
    nctrl: { type: String, required: true },
    datos: {
      id_curp: { type: String, required: true },
      nombre: { type: String, required: true },
      carrera: { type: String, required: true },
      tecnologico: { type: String, required: true }
    }
  }],
  horario: { type: Number, required: true }
}, {
  timestamps: true
});

// Crear y exportar el modelo Grupo basado en grupoSchema
const Grupo = model('Grupo', grupoSchema);
module.exports = Grupo;
```

### /routes

Esta sección de la estructura almacena los controladores de las rutas para responder con un recurso según la ruta que se ingrese como solicitud. Son las que indican qué endpoint debe responder con qué comportamiento, obteniendo dicho comportamiento de los controllers.

#### routes/aulas.js
```javascript
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
```

#### routes/grupos.js
```javascript
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
```

#### routes/materias.js
```javascript
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
```

#### routes/docentes.js
```javascript
// /src/routes/docentes.js
const express = require('express');
const router = express.Router();
const {
  obtenerDocentes,
  obtenerDocentePorRFC,
  crearDocente,
  actualizarDocente,
  eliminarDocente,
  obtenerMateriasImpartidasPorDocente,
  obtenerDocentesPorMateria
} = require('../controllers/docentes');

// Ruta para obtener todos los docentes
router.get('/', obtenerDocentes);

// Ruta para obtener un docente por su RFC (id_rfc)
router.get('/:id_rfc', obtenerDocentePorRFC);

// Ruta para crear un nuevo docente
router.post('/', crearDocente);

// Ruta para actualizar un docente por su RFC (id_rfc)
router.put('/:id_rfc', actualizarDocente);

// Ruta para eliminar un docente por su RFC (id_rfc)
router.delete('/:id_rfc', eliminarDocente);

// Ruta para obtener las materias impartidas por un docente específico
router.get('/:rfc/grupos', obtenerMateriasImpartidasPorDocente);

// Ruta para obtener los docentes que imparten una materia específica
router.get('/materia/:id', obtenerDocentesPorMateria);

module.exports = router;
```

#### routes/alumnos.js
```javascript
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
```



### /config

Esta carpeta de la estructura del proyecto almacena los elementos de configuración para la conexión con las bases de datos del escenario.

#### config/db.js

En este archivo cargamos las variables de entorno para conectar mongoose con el replicaSet de Mongo y crear un cliente para la base de datos de redis.

```javascript
// /src/config/db.js
const mongoose = require('mongoose'); // Módulo para interactuar con MongoDB
const redis = require('redis'); // Módulo para interactuar con Redis
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env
// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a MongoDB'); // Mensaje de éxito en la conexión
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error); // Mensaje de error en la conexión
    });
// Configuración de Redis
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
redisClient.on('error', (err) => {
    console.error('Error en la conexión a Redis:', err); // Mensaje de error en la conexión a Redis
});
redisClient.connect().then(() => {
    console.log('Conectado a Redis');
}).catch((err) => {
    console.error('No se pudo conectar a Redis:', err);
});

// Exportamos las instancias de mongoose y redisClient para usarlas en otras partes de la aplicación
module.exports = { mongoose, redisClient };
```

### /middleware

Este middleware es considerado como un testigo para registrar las solicitudes y respuestas de la aplicación. Se usa el cliente de redis y se programa un callback para que una vez entregada la respuesta, se guarde en una nueva clave de redis.

#### middleware/logger.js
```javascript
// /src/middleware/logger.js
// Importar el módulo 'redis' para interactuar con una base de datos Redis
const redis = require('redis');
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
client.on('error', (err) => {
    console.error('Redis error de conexion:', err);
});
client.connect().then(() => {
    console.log('Conectado-->> Redis');
}).catch((err) => {
    console.error('Error conexion a Redis:', err);
});
module.exports = (req, res, next) => {
    const originalSend = res.send;
    let responseBody;

    res.send = function (body) {
        responseBody = body;
        return originalSend.apply(this, arguments);
    };

    res.on('finish', async () => {
        if (!client.isOpen) {
            console.error('Redis client -->> No conectado.');
            return;
        }
        const key = `${req.method}:${Date.now()}:${req.originalUrl}`;
        const logEntry = JSON.stringify({
            time: new Date(),
            req: {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                data: req.body
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                response: responseBody
            }
        });
        try {
            await client.set(key, logEntry, 'EX', 60 * 60 * 24);
        } catch (err) {
            console.error('Error al salvar:', err);
        }
    });
    next();
};
```

### src/server.js
Es el archivo principal de nuestra aplicación. Es la puerta de entrada a los endpoints y contiene la configuración de la app en general para comenzar a utilizar los diversos recursos dentro de la estructura de la app.
```javascript
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express'); // Framework para construir aplicaciones web y APIs
const cors = require('cors'); // Middleware para permitir solicitudes de recursos cruzados
const morgan = require('morgan'); // Middleware para el registro de solicitudes HTTP
const logger = require('./middleware/logger'); // Middleware personalizado para registrar solicitudes en Redis
const { mongoose, redisClient } = require('./config/db'); // Importamos las configuraciones de MongoDB y Redis
const bodyParser = require('body-parser')

// Creamos una instancia de la aplicación Express
const app = express();

// BodyParser
// Configura el límite de tamaño para el análisis JSON (por ejemplo, 10 MB)
app.use(bodyParser.json({ limit: '1mb' }));
// Configura el límite de tamaño para la codificación URL (por ejemplo, 5 MB)
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

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
```

### /controllers

Esta sección contiene los archivos que manejan las solicitudes y respuestas de los endpoints. Se encargan de recuperar, tipear, construir, actualizar y eliminar los datos y documentos de las distintas colecciones.

#### controllers/grupos.js
```javascript
// /src/controllers/grupos.js

const Grupo = require('../models/grupo');

const obtenerGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.find({});
    res.json(grupos);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los grupos', detalles: error.message });
  }
};

const obtenerGrupoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const grupo = await Grupo.findOne({id});
    if (!grupo) {
      return res.status(404).send({ error: `Grupo con id: ${id} no encontrado` });
    }
    res.json(grupo);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el grupo con ID: ${id}`, detalles: error.message });
  }
};

const crearGrupo = async (req, res) => {
  const grupo = req.body;
  try {
    if (Array.isArray(grupo)){
      const respuesta = await Grupo.insertMany(grupo);
      res.status(201).send(respuesta);
    } else {
      const respuesta = await Grupo.create(grupo);
      res.status(201).send(respuesta);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear un nuevo grupo', detalles: error.message });
  }
};

const actualizarGrupo = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  try {
    const grupoActualizado = await Grupo.findOneAndUpdate({id}, datosActualizados, { new: true});
    if (!grupoActualizado) {
      return res.status(404).send({ error: `Grupo con id: ${id} no encontrado` });
    }
    res.json(grupoActualizado);
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el grupo con ID: ${id}`, detalles: error.message });
  }
};

const eliminarGrupo = async (req, res) => {
  const { id } = req.params;
  try {
    const grupoEliminado = await Grupo.findOneAndDelete({id});
    if (!grupoEliminado) {
      return res.status(404).send({ error: `Grupo con id: ${id} no encontrado` });
    }
    res.json({ message: `Grupo con ID: ${id} eliminado` });
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el grupo con ID: ${id}`, detalles: error.message });
  }
};

const obtenerGruposPorMateria = async (req, res) => {
  let { id } = req.params; // Asumiendo que `id` es el ID de la materia
  id = parseInt(id);
  try {
    const grupos = await Grupo.find({ "materia.id": id }); // Asumiendo que el modelo Grupo tiene un campo `materia`
    res.json(grupos);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los grupos de la materia con ID: ${id}`, detalles: error.message });
  }
};

module.exports = {
  obtenerGrupos,
  obtenerGrupoPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
  obtenerGruposPorMateria
};
```

#### controllers/aulas.js
```javascript
// /src/controllers/aulas.js

const Aula = require('../models/aula');


const obtenerAulas = async (req, res) => {
  try {
    const resultado = await Aula.find({});
    res.status(200).send(resultado); // Responder con todas las aulas
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener las aulas', detalles: error.message });
  }
};


const obtenerAulaPorId = async (req, res) => {
  const { id_aula } = req.params; // Obtener id_aula de los parámetros de la URL
  try {
    const resultado = await Aula.findOne({ id_aula }); // Buscar el aula por su id_aula
    if (!resultado) {
      return res.status(404).send({ error: `Aula con id_aula: ${id_aula} no encontrada` });
    }
    res.status(200).send(resultado); // Responder con el aula encontrada
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el aula con id_aula: ${id_aula}`, detalles: error.message });
  }
};

const crearAulas = async (req, res) => {
  const entrada = req.body; // Puede ser un único objeto o un array de objetos

  try {
    if (Array.isArray(entrada)) {
      // Si es un array, usar insertMany para inserción masiva
      const resultado = await Aula.insertMany(entrada);
      res.status(201).send(resultado);
    } else {
      // Si no es un array, asumir que es un solo objeto y usar create
      const resultado = await Aula.create(entrada);
      res.status(201).send(resultado);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear las aulas', detalles: error.message });
  }
};

const actualizarAula = async (req, res) => {
  const { id_aula } = req.params; // Obtener id_aula de los parámetros de la URL
  const datosActualizados = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

  try {
    // Buscar y actualizar el aula por su id_aula
    const resultado = await Aula.findOneAndUpdate({ id_aula }, datosActualizados, { new: true });
    if (!resultado) {
      return res.status(404).send({ error: `Aula con id_aula: ${id_aula} no encontrada` });
    }
    res.status(200).send(resultado); // Responder con el aula actualizada
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el aula con id_aula: ${id_aula}`, detalles: error.message });
  }
};

const eliminarAula = async (req, res) => {
  const { id_aula } = req.params; // Obtener id_aula de los parámetros de la URL
  try {
    // Buscar y eliminar el aula por su id_aula
    const resultado = await Aula.findOneAndDelete({ id_aula });
    if (!resultado) {
      return res.status(404).send({ error: `Aula con id_aula: ${id_aula} no encontrada` });
    }
    res.status(200).send({ message: `Aula con id_aula: ${id_aula} eliminada` }); // Responder con mensaje de éxito
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el aula con id_aula: ${id_aula}`, detalles: error.message });
  }
};

module.exports = {
  obtenerAulas,
  obtenerAulaPorId,
  crearAulas,
  actualizarAula,
  eliminarAula
};
```

#### controllers/docentes.js
```javascript
// /src/controllers/docentes.js

const Docente = require('../models/docente');
const Grupo = require('../models/grupo');

const obtenerDocentes = async (req, res) => {
  try {
    const respuesta = await Docente.find({});
    res.status(200).send(respuesta)
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los docentes', detalles: error.message });
  }
};

const obtenerDocentePorRFC = async (req, res) => {
  const { id_rfc } = req.params;
  try {
    const resultado = await Docente.findOne({ id_rfc });
    if (!resultado) {
      return res.status(404).send({ error: `Docente con rfc: ${id_rfc} no encontrado` })
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el docente con RFC: ${id_rfc}`, detalles: error.message });
  }
};

const crearDocente = async (req, res) => {
  const docente = req.body;
  try {
    if (Array.isArray(docente)) {
      const resultado = await Docente.insertMany(docente);
      res.status(201).send(resultado);
    } else {
      const resultado = await Docente.create(docente);
      res.status(201).send(resultado);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear un nuevo docente', detalles: error.message });
  }
};

const actualizarDocente = async (req, res) => {
  const { id_rfc } = req.params;
  const datosActualizados = req.body;
  try {
    const resultado = await Docente.findOneAndUpdate({ id_rfc }, datosActualizados, { new: true });
    if (!resultado) {
      return res.status(404).send({ error: `Docente con rfc: ${id_rfc} no encontrado` });
    }
    res.status(201).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el docente con RFC: ${id_rfc}`, detalles: error.message });
  }
};

const eliminarDocente = async (req, res) => {
  const { id_rfc } = req.params;
  try {
    const resultado = await Docente.findOneAndDelete({ id_rfc });
    if (!resultado) {
      return res.status(404).send({ error: `Docente con rfc: ${id_rfc} no encontrado` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el docente con RFC: ${id_rfc}`, detalles: error.message });
  }
};

const obtenerMateriasImpartidasPorDocente = async (req, res) => {
  const { rfc } = req.params;
  try {
    const resultado = await Grupo.aggregate([
      {
        $match: {
          "docente.id_rfc": rfc,
        },
      },
      {
        $group: {
          _id: "$docente.id_rfc",
          docente: { $first: "$docente" },
          grupos: {
            $push: {
              horario: "$horario",
              aula: "$aula",
              materia: "$materia",
              alumnos: "$alumnos",
            },
          },
        },
      },
      {
        $project: {'docente.materias_impartidas':0}
      }
    ]);
    res.status(200).json(resultado);
  } catch (error) {
    // Maneja los errores
    res.status(500).json({ message: 'Error en la operación q9', detalle: error.message });
  }
};

const obtenerDocentesPorMateria = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    const resultado = await Docente.aggregate([
      { $unwind: "$materias_impartidas" },
      {
        $match: {
          "materias_impartidas.id": id
        }
      },
      {
        $group: {
          _id: "$materias_impartidas.id",
          materia: { $first: "$materias_impartidas" },
          docentes: { $push: "$datos" },
        },
      }
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los docentes que imparten la materia con ID: ${id}`, detalles: error.message });
  }
};

module.exports = {
  obtenerDocentes,
  obtenerDocentePorRFC,
  crearDocente,
  actualizarDocente,
  eliminarDocente,
  obtenerMateriasImpartidasPorDocente,
  obtenerDocentesPorMateria
};
```

#### controllers/materias.js
```javascript
// /src/controllers/materias.js

const Materia = require('../models/materia');
const Alumno = require('../models/alumno');

const obtenerMaterias = async (req, res) => {
  try {
    const resultado = await Materia.find({});
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener las materias', detalles: error.message });
  }
};

const obtenerMateriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Materia.findOne({ id });
    if (!resultado) {
      return res.status(404).send({ error: `Materia con id: ${id} no encontrada` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener la materia con ID: ${id}`, detalles: error.message });
  }
};

const crearMaterias = async (req, res) => {
  const materia = req.body;
  try {
    if (Array.isArray(materia)) {
      const resultado = await Materia.insertMany(materia);
      res.status(201).send(resultado);
    } else {
      const resultado = await Materia.create(materia);
      res.status(201).send(resultado);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear una nueva materia', detalles: error.message });
  }
};

const actualizarMateria = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  try {
    const resultado = await Materia.findOneAndUpdate({ id }, datosActualizados, { new: true });
    if (!resultado) {
      return res.status(404).send({ error: `Materia con id: ${id} no encontrada` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar la materia con ID: ${id}`, detalles: error.message });
  }
};

const eliminarMateria = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Materia.findOneAndDelete({ id });
    if (!resultado) {
      return res.status(404).send({ error: `Materia con id: ${id} no encontrada` });
    }
    res.status(200).send({ message: `Materia con id: ${id} eliminada` })
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar la materia con ID: ${id}`, detalles: error.message });
  }
};

const obtenerAlumnosCalificacionSuperior = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  let { calificacion_minima } = req.params;
  calificacion_minima = parseInt(calificacion_minima);
  try {
    const resultado = await Alumno.aggregate([
      {
        $project: {
          datos: 1,
          _id: 1,
          nctrl: 1,
          __v: 1,
          createdAt: 1,
          updatedAt: 1,
          'expediente_academico.grupos_cursados': {
            $filter: {
              input: '$expediente_academico.grupos_cursados',
              as: 'cursados',
              cond: { $gt: ['$$cursados.calificacion', calificacion_minima] }
            }
          }
        }
      },
      { $unwind: "$expediente_academico.grupos_cursados" },
      {
        $lookup: {
          from: "grupos",
          localField: "expediente_academico.grupos_cursados.grupo",
          foreignField: "id",
          as: "expediente_academico.grupos_cursados.grupo",
        },
      },
      { $unwind: "$expediente_academico.grupos_cursados.grupo" },
      {
        $match: {
          'expediente_academico.grupos_cursados.grupo.materia.id': id,
        }
      },
      {
        $group: {
          _id: "$expediente_academico.grupos_cursados.grupo.materia.id",
          materia: { $first: "$expediente_academico.grupos_cursados.grupo.materia" },
          alumnos: {
            $push: {
              alumno: "$datos",
              calificacion: "$expediente_academico.grupos_cursados.calificacion"
            }
          }
        }
      }
    ]);    
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los alumnos con calificación superior a ${calificacion_minima} en la materia con ID: ${id}` });
  }
};

module.exports = {
  obtenerMaterias,
  obtenerMateriaPorId,
  crearMateria: crearMaterias,
  actualizarMateria,
  eliminarMateria,
  obtenerAlumnosCalificacionSuperior
};

```

#### controllers/alumnos.js
```javascript
// /src/controllers/alumnos.js

const Alumno = require('../models/alumno');
const Grupo = require('../models/grupo');

const obtenerAlumnos = async (req, res) => {
  try {
    const resultado = await Alumno.find({});
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los alumnos', detalle: error.message });
  }
};

const obtenerAlumnoNctrl = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.findOne({ nctrl });
    if (!resultado) {
      return res.status(404).send({ error: `Alumno con nctrl: ${nctrl} no encontrado` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener el alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const crearAlumno = async (req, res) => {
  const alumno = req.body;
  try {
    if (Array.isArray(alumno)) {
      const resultado = await Alumno.insertMany(alumno);
      res.status(201).send(resultado);
    } else {
      const resultado = await Alumno.create(alumno);
      res.status(201).send(resultado);
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al crear un nuevo alumno', detalle: error.message });
  }
};

const actualizarAlumno = async (req, res) => {
  const { nctrl } = req.params;
  const datosActualizados = req.body;
  try {
    const resultado = await Alumno.findOneAndUpdate({ nctrl }, datosActualizados, { new: true });
    if (!resultado) {
      return res.status(404).send({ error: `Alumno con nctrl: ${nctrl} no encontrado` });
    }
    res.status(201).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al actualizar el alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const eliminarAlumno = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.findOneAndDelete({ nctrl });
    if (!resultado) {
      return res.status(404).send({ error: `Alumno con nctrl: ${nctrl} no encontrado` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al eliminar el alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const obtenerCalificacionesAlumno = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.aggregate([
      { $match: { nctrl: nctrl } },
      { $unwind: "$expediente_academico.grupos_cursados" },
      {
        $lookup: {
          from: "grupos",
          localField: "expediente_academico.grupos_cursados.grupo",
          foreignField: "id",
          as: "expediente_academico.grupos_cursados.grupo",
        },
      },
      { $unwind: "$expediente_academico.grupos_cursados.grupo" },
      {
        $group: {
          _id: "$nctrl",
          alumno: { $first: "$datos" },
          materias: {
            $push: {
              calificacion: "$expediente_academico.grupos_cursados.calificacion",
              materia: "$expediente_academico.grupos_cursados.grupo.materia",
            },
          },
        },
      },
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las calificaciones del alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const obtenerMateriasAlumno = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.aggregate([
      { $match: { nctrl: nctrl } },
      { $unwind: "$expediente_academico.grupos_cursados" },
      {
        $lookup: {
          from: "grupos",
          localField: "expediente_academico.grupos_cursados.grupo",
          foreignField: "id",
          as: "expediente_academico.grupos_cursados.grupo",
        },
      },
      { $unwind: "$expediente_academico.grupos_cursados.grupo" },
      {
        $group: {
          _id: "$nctrl",
          alumno: { $first: "$datos" },
          materias: {
            $push: "$expediente_academico.grupos_cursados.grupo.materia",
          },
        },
      },
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las materias cursadas del alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const obtenerMateriasAlumnoPorHora = async (req, res) => {
  const { nctrl } = req.params;
  let { hora } = req.params;
  hora = parseInt(hora);
  try {
    const resultado = await Alumno.aggregate([
      { $match: { nctrl: nctrl } },
      {
        $lookup: {
          from: "grupos",
          localField: "expediente_academico.grupos_cursados.grupo",
          foreignField: "id",
          as: "expediente_academico.grupos_cursados.grupo",
        },
      },
      { $unwind: '$expediente_academico.grupos_cursados.grupo' },
      { $match: { 'expediente_academico.grupos_cursados.grupo.horario': hora } },
      {
        $group: {
          '_id': '$nctrl',
          'alumno': { $first: '$datos' },
          'materias': {
            $push: {
              'horario': '$expediente_academico.grupos_cursados.grupo.horario',
              'materia': '$expediente_academico.grupos_cursados.grupo.materia',
            }
          }
        }
      }
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las materias del alumno con nctrl: ${nctrl} a la hora: ${hora}`, detalle: error.message });
  }
};

const obtenerMateriasPorCursar = async (req, res) => {
  const { nctrl } = req.params;
  try {
    const resultado = await Alumno.aggregate([
      { $match: { nctrl: nctrl } },
      {
        $lookup: {
          from: "grupos",
          localField: "expediente_academico.grupos_cursados.grupo",
          foreignField: "id",
          as: "expediente_academico.grupos_cursados.grupo",
        },
      },
      {
        $project: {
          _id: '$nctrl',
          alumno: '$datos',
          materias: '$expediente_academico.grupos_cursados.grupo.materia',
          reticula: '$expediente_academico.reticula'
        }
      },
      {
        $addFields: {
          // Extraemos los IDs de las materias cursadas
          materiasIds: {
            $map: {
              input: '$materias',
              as: 'materia',
              in: '$$materia.id'
            }
          },
          // Extraemos los IDs de la reticula
          reticulaIds: {
            $map: {
              input: '$reticula',
              as: 'materia',
              in: '$$materia.id'
            }
          }
        }
      },
      {
        $addFields: {
          // Obtenemos los IDs de las materias que están en reticula pero no en materias cursadas
          materiasPorCursarIds: {
            $setDifference: ['$reticulaIds', '$materiasIds']
          }
        }
      },
      {
        $addFields: {
          // Filtramos las materias de la reticula para obtener los subdocumentos completos de las materias por cursar
          materiasPorCursar: {
            $filter: {
              input: '$reticula',
              as: 'materia',
              cond: { $in: ['$$materia.id', '$materiasPorCursarIds'] }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          alumno: 1,
          materiasPorCursar: 1
        }
      }
    ]);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener las materias por cursar del alumno con nctrl: ${nctrl}`, detalle: error.message });
  }
};

const obtenerAlumnosPorGrupoMateria = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Grupo.findOne({ id }, 'materia alumnos');
    if (!resultado) {
      return res.status(404).send({ error: `El grupo con el id ${id} no fue encontrado` });
    }
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: `Error al obtener los alumnos del grupo con id: ${id} que cursan la materia`, detalle: error.message });
  }
};

module.exports = {
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
};
```

# 5. DOCKERFILE

Recordemos que la forma final en que debe quedar el DOCKERFILE es la siguiente:

```Dockerfile
# Usar la imagen oficial de Node.js como base
FROM node
# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./
# Instalar las dependencias del proyecto
RUN npm install
# Copiar el resto de los archivos del proyecto al directorio de trabajo
COPY . .
# Exponer el puerto en el que la aplicación va a correr
EXPOSE 3000
# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
```

# 6. docker-compose
De igual forma, esta es la versión final con la imágen construida de docker-compose para correr el escenario y la aplicación. Se construye de esta forma y ejecuta cuando el proyecto ha finalizado. 
```yaml
version: '3.8'
services:
  app01:
    image: joagocdocker/node-avance-academico:latest
    ports:
      - "3000:3000"
    depends_on:
      - mongo01
      - mongo02
      - mongo03
      - redis01
    environment:
      - MONGO_URI=mongodb://mongo01:27017/avance_academico?replicaSet=replica
      - REDIS_HOST=redis01
      - REDIS_PORT=6379
      - PORT=3000
    networks:
      - red01

  mongo01:
    image: mongo:latest
    command: mongod --replSet replica --bind_ip_all
    ports:
      - "27017:27017"
    networks:
      - red01

  mongo02:
    image: mongo:latest
    command: mongod --replSet replica --bind_ip_all
    ports:
      - "27018:27017"
    networks:
      - red01

  mongo03:
    image: mongo:latest
    command: mongod --replSet replica --bind_ip_all
    ports:
      - "27019:27017"
    networks:
      - red01

  redis01:
    image: redis:latest
    ports:
      - "6379:6379"
    networks:
      - red01
networks:
  red01:
    driver: bridge
```

# 7. Escenario de datos

El escenario de datos para esta implementación se manejó dentro de la colección de postman en la carpeta de `Escenario`.

# 8. JSON postman para probar las querys y montar el escenario de datos.

```JSON
{
	"info": {
		"_postman_id": "824346f3-8bda-4bb0-87ea-9fd82f1d308e",
		"name": "Node-Avance-Academico",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "31312981"
	},
	"item": [
		{
			"name": "Escenario",
			"item": [
				{
					"name": "crearAlumnos",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "[\n    {\n        \"nctrl\": \"20400748\",\n        \"datos\": {\n            \"id_curp\": \"ABC123456XYZ\",\n            \"nombre\": \"Carlos Gómez Ramírez\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 78\n                },\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 70\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 80\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 93\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 71\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 95\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 98\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 81\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400749\",\n        \"datos\": {\n            \"id_curp\": \"DEF789012JKL\",\n            \"nombre\": \"Ana María Torres\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 100\n                },\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 97\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 91\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 100\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 68\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 70\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400750\",\n        \"datos\": {\n            \"id_curp\": \"GHI345678OPQ\",\n            \"nombre\": \"José Luis Hernández\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 91\n                },\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 80\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 71\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 76\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 96\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 85\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 67\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 86\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400751\",\n        \"datos\": {\n            \"id_curp\": \"JKL012345STU\",\n            \"nombre\": \"Laura Martínez Fernández\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 74\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 68\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 90\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 99\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 99\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 88\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 75\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400752\",\n        \"datos\": {\n            \"id_curp\": \"MNO456789VWX\",\n            \"nombre\": \"Pedro Sánchez García\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 72\n                },\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 96\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 68\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 68\n                },\n                {\n                    \"grupo\": 13,\n                    \"calificacion\": 76\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400753\",\n        \"datos\": {\n            \"id_curp\": \"PQR678901YZA\",\n            \"nombre\": \"María del Carmen Rodríguez\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 82\n                },\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 67\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 81\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 68\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 96\n                },\n                {\n                    \"grupo\": 13,\n                    \"calificacion\": 74\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 66\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400754\",\n        \"datos\": {\n            \"id_curp\": \"STU901234BCD\",\n            \"nombre\": \"Luis Antonio Méndez\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 92\n                },\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 85\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 89\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 99\n                },\n                {\n                    \"grupo\": 13,\n                    \"calificacion\": 90\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 81\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400755\",\n        \"datos\": {\n            \"id_curp\": \"VWX234567FGH\",\n            \"nombre\": \"Sofía García López\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 71\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 91\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 88\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 96\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 67\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 88\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 97\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 76\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 97\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400756\",\n        \"datos\": {\n            \"id_curp\": \"YZA678901IJK\",\n            \"nombre\": \"Daniel Ortega Rivera\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 69\n                },\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 82\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 66\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 99\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 69\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 96\n                },\n                {\n                    \"grupo\": 13,\n                    \"calificacion\": 76\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 94\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400757\",\n        \"datos\": {\n            \"id_curp\": \"BCD345678LMN\",\n            \"nombre\": \"Fernanda Rivas González\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 79\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 86\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 77\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 82\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400758\",\n        \"datos\": {\n            \"id_curp\": \"FGH789012OPQ\",\n            \"nombre\": \"Carlos Delgado\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 81\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 80\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 76\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 82\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 67\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 90\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 89\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400759\",\n        \"datos\": {\n            \"id_curp\": \"IJK012345RST\",\n            \"nombre\": \"Gabriela González\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 91\n                },\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 98\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 83\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 82\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 92\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 84\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400760\",\n        \"datos\": {\n            \"id_curp\": \"LMN678901UVW\",\n            \"nombre\": \"Roberto Medina\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 67\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 84\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 71\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 97\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 70\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 66\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400761\",\n        \"datos\": {\n            \"id_curp\": \"OPQ345678XYZ\",\n            \"nombre\": \"Lucía Pérez\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 76\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 98\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 79\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 75\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 67\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 75\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400762\",\n        \"datos\": {\n            \"id_curp\": \"RST901234ABC\",\n            \"nombre\": \"Héctor Mendoza\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 85\n                },\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 100\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 97\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 73\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 66\n                },\n                {\n                    \"grupo\": 13,\n                    \"calificacion\": 86\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 77\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400763\",\n        \"datos\": {\n            \"id_curp\": \"UVW567890DEF\",\n            \"nombre\": \"Alicia Reyes\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 86\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 98\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 91\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 98\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 90\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 72\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 76\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 68\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400764\",\n        \"datos\": {\n            \"id_curp\": \"XYZ234567GHI\",\n            \"nombre\": \"Jorge Torres\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 85\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 79\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 69\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 95\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 80\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 79\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 75\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 68\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 82\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400765\",\n        \"datos\": {\n            \"id_curp\": \"ABC901234JKL\",\n            \"nombre\": \"Patricia Álvarez\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 78\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 72\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 92\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 78\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 75\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400766\",\n        \"datos\": {\n            \"id_curp\": \"DEF345678LMN\",\n            \"nombre\": \"Miguel Sánchez\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 71\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 79\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 72\n                },\n                {\n                    \"grupo\": 13,\n                    \"calificacion\": 100\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 95\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400767\",\n        \"datos\": {\n            \"id_curp\": \"GHI567890OPQ\",\n            \"nombre\": \"Natalia Flores\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 96\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 81\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 80\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 96\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 82\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 88\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400768\",\n        \"datos\": {\n            \"id_curp\": \"JKL012345RST\",\n            \"nombre\": \"Luis Castro\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 71\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 74\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 91\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 100\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 68\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 93\n                },\n                {\n                    \"grupo\": 12,\n                    \"calificacion\": 78\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 93\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400769\",\n        \"datos\": {\n            \"id_curp\": \"LMN345678UVW\",\n            \"nombre\": \"Carolina Peña\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 72\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 67\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 96\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 98\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 80\n                },\n                {\n                    \"grupo\": 13,\n                    \"calificacion\": 70\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 76\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400770\",\n        \"datos\": {\n            \"id_curp\": \"OPQ789012XYZ\",\n            \"nombre\": \"Juan Pérez\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 80\n                },\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 75\n                },\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 80\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 96\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 98\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 75\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 88\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400771\",\n        \"datos\": {\n            \"id_curp\": \"RST123456ABC\",\n            \"nombre\": \"Ximena López\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 77\n                },\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 67\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 78\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 71\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 75\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 71\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400772\",\n        \"datos\": {\n            \"id_curp\": \"UVW789012DEF\",\n            \"nombre\": \"Oscar García\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 70\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 81\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 84\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 70\n                },\n                {\n                    \"grupo\": 10,\n                    \"calificacion\": 91\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 66\n                },\n                {\n                    \"grupo\": 13,\n                    \"calificacion\": 73\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400773\",\n        \"datos\": {\n            \"id_curp\": \"XYZ567890GHI\",\n            \"nombre\": \"Laura Díaz\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 4,\n                    \"calificacion\": 90\n                },\n                {\n                    \"grupo\": 5,\n                    \"calificacion\": 79\n                },\n                {\n                    \"grupo\": 6,\n                    \"calificacion\": 66\n                },\n                {\n                    \"grupo\": 7,\n                    \"calificacion\": 93\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 89\n                },\n                {\n                    \"grupo\": 14,\n                    \"calificacion\": 82\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 95\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400774\",\n        \"datos\": {\n            \"id_curp\": \"ABC901234JKL\",\n            \"nombre\": \"Andrés Contreras\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"expediente_academico\": {\n            \"reticula\": [\n                {\n                    \"datos\": {\n                        \"nombre\": \"NOSQL\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                    },\n                    \"id\": 1,\n                    \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Programación Web\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                    },\n                    \"id\": 2,\n                    \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Inteligencia Artificial\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                    },\n                    \"id\": 3,\n                    \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Sistemas Operativos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                    },\n                    \"id\": 4,\n                    \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Redes de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                    },\n                    \"id\": 5,\n                    \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Estructuras de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                    },\n                    \"id\": 6,\n                    \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Arquitectura de Computadoras\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                    },\n                    \"id\": 7,\n                    \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Algoritmos Avanzados\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                    },\n                    \"id\": 8,\n                    \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Bases de Datos\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                    },\n                    \"id\": 9,\n                    \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Seguridad Informática\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                    },\n                    \"id\": 10,\n                    \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Desarrollo de Software\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                    },\n                    \"id\": 11,\n                    \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                },\n                {\n                    \"datos\": {\n                        \"nombre\": \"Computación en la Nube\",\n                        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                        \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                    },\n                    \"id\": 12,\n                    \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                }\n            ],\n            \"grupos_cursados\": [\n                {\n                    \"grupo\": 1,\n                    \"calificacion\": 74\n                },\n                {\n                    \"grupo\": 2,\n                    \"calificacion\": 76\n                },\n                {\n                    \"grupo\": 3,\n                    \"calificacion\": 69\n                },\n                {\n                    \"grupo\": 8,\n                    \"calificacion\": 88\n                },\n                {\n                    \"grupo\": 9,\n                    \"calificacion\": 73\n                },\n                {\n                    \"grupo\": 11,\n                    \"calificacion\": 97\n                },\n                {\n                    \"grupo\": 13,\n                    \"calificacion\": 73\n                },\n                {\n                    \"grupo\": 15,\n                    \"calificacion\": 69\n                }\n            ]\n        }\n    },\n    {\n        \"nctrl\": \"20400775\",\n        \"datos\": {\n            \"id_curp\": \"DEF345678LMN\",\n            \"nombre\": \"Camila Ramos\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\",\n            \"expediente_academico\": {\n                \"reticula\": [\n                    {\n                        \"datos\": {\n                            \"nombre\": \"NOSQL\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                        },\n                        \"id\": 1,\n                        \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Programación Web\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                        },\n                        \"id\": 2,\n                        \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Inteligencia Artificial\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                        },\n                        \"id\": 3,\n                        \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Sistemas Operativos\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                        },\n                        \"id\": 4,\n                        \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Redes de Computadoras\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                        },\n                        \"id\": 5,\n                        \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Estructuras de Datos\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                        },\n                        \"id\": 6,\n                        \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Arquitectura de Computadoras\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                        },\n                        \"id\": 7,\n                        \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Algoritmos Avanzados\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                        },\n                        \"id\": 8,\n                        \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Bases de Datos\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                        },\n                        \"id\": 9,\n                        \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Seguridad Informática\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                        },\n                        \"id\": 10,\n                        \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Desarrollo de Software\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                        },\n                        \"id\": 11,\n                        \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"Computación en la Nube\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                        },\n                        \"id\": 12,\n                        \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                    },\n                    {\n                        \"datos\": {\n                            \"nombre\": \"DevOps\",\n                            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                            \"descripcion\": \"Materia que cubre las DevOps requeridas en el mercado laboral.\"\n                        },\n                        \"id\": 13,\n                        \"planDeEstudios\": \"Introducción a DevOps, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n                    }\n                ],\n                \"grupos_cursados\": [\n                    {\n                        \"grupo\": 1,\n                        \"calificacion\": 68\n                    },\n                    {\n                        \"grupo\": 3,\n                        \"calificacion\": 86\n                    },\n                    {\n                        \"grupo\": 5,\n                        \"calificacion\": 98\n                    },\n                    {\n                        \"grupo\": 9,\n                        \"calificacion\": 82\n                    },\n                    {\n                        \"grupo\": 12,\n                        \"calificacion\": 96\n                    },\n                    {\n                        \"grupo\": 14,\n                        \"calificacion\": 70\n                    }\n                ]\n            }\n        }\n    }\n]",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/alumnos",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos"
							]
						}
					},
					"response": []
				},
				{
					"name": "crearGrupos",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "[\n    {\n        \"id\": 1,\n        \"docente\": {\n            \"id_rfc\": \"ABCD123456EFG\",\n            \"datos\": {\n                \"nombre\": \"Juan Carlos Hernández García\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 1,\n            \"edificio\": \"Edificio A\",\n            \"descripcion_equipamiento\": \"Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.\"\n        },\n        \"materia\": {\n            \"id\": 1,\n            \"datos\": {\n                \"nombre\": \"NOSQL\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n            },\n            \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400749\",\n                \"datos\": {\n                    \"id_curp\": \"DEF789012JKL\",\n                    \"nombre\": \"Ana María Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400750\",\n                \"datos\": {\n                    \"id_curp\": \"GHI345678OPQ\",\n                    \"nombre\": \"José Luis Hernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400752\",\n                \"datos\": {\n                    \"id_curp\": \"MNO456789VWX\",\n                    \"nombre\": \"Pedro Sánchez García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400753\",\n                \"datos\": {\n                    \"id_curp\": \"PQR678901YZA\",\n                    \"nombre\": \"María del Carmen Rodríguez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400756\",\n                \"datos\": {\n                    \"id_curp\": \"YZA678901IJK\",\n                    \"nombre\": \"Daniel Ortega Rivera\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400758\",\n                \"datos\": {\n                    \"id_curp\": \"FGH789012OPQ\",\n                    \"nombre\": \"Carlos Delgado\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400762\",\n                \"datos\": {\n                    \"id_curp\": \"RST901234ABC\",\n                    \"nombre\": \"Héctor Mendoza\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400765\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Patricia Álvarez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400767\",\n                \"datos\": {\n                    \"id_curp\": \"GHI567890OPQ\",\n                    \"nombre\": \"Natalia Flores\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400768\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345RST\",\n                    \"nombre\": \"Luis Castro\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400770\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ789012XYZ\",\n                    \"nombre\": \"Juan Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400771\",\n                \"datos\": {\n                    \"id_curp\": \"RST123456ABC\",\n                    \"nombre\": \"Ximena López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400774\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Andrés Contreras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400775\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Camila Ramos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 15\n    },\n    {\n        \"id\": 2,\n        \"docente\": {\n            \"id_rfc\": \"ABCD123456EFG\",\n            \"datos\": {\n                \"nombre\": \"Juan Carlos Hernández García\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 2,\n            \"edificio\": \"Edificio B\",\n            \"descripcion_equipamiento\": \"Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.\"\n        },\n        \"materia\": {\n            \"id\": 2,\n            \"datos\": {\n                \"nombre\": \"Programación Web\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n            },\n            \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400748\",\n                \"datos\": {\n                    \"id_curp\": \"ABC123456XYZ\",\n                    \"nombre\": \"Carlos Gómez Ramírez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400750\",\n                \"datos\": {\n                    \"id_curp\": \"GHI345678OPQ\",\n                    \"nombre\": \"José Luis Hernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400751\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345STU\",\n                    \"nombre\": \"Laura Martínez Fernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400754\",\n                \"datos\": {\n                    \"id_curp\": \"STU901234BCD\",\n                    \"nombre\": \"Luis Antonio Méndez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400755\",\n                \"datos\": {\n                    \"id_curp\": \"VWX234567FGH\",\n                    \"nombre\": \"Sofía García López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400756\",\n                \"datos\": {\n                    \"id_curp\": \"YZA678901IJK\",\n                    \"nombre\": \"Daniel Ortega Rivera\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400757\",\n                \"datos\": {\n                    \"id_curp\": \"BCD345678LMN\",\n                    \"nombre\": \"Fernanda Rivas González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400759\",\n                \"datos\": {\n                    \"id_curp\": \"IJK012345RST\",\n                    \"nombre\": \"Gabriela González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400761\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ345678XYZ\",\n                    \"nombre\": \"Lucía Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400762\",\n                \"datos\": {\n                    \"id_curp\": \"RST901234ABC\",\n                    \"nombre\": \"Héctor Mendoza\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400764\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ234567GHI\",\n                    \"nombre\": \"Jorge Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400771\",\n                \"datos\": {\n                    \"id_curp\": \"RST123456ABC\",\n                    \"nombre\": \"Ximena López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400774\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Andrés Contreras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 17\n    },\n    {\n        \"id\": 3,\n        \"docente\": {\n            \"id_rfc\": \"ABCD123456EFG\",\n            \"datos\": {\n                \"nombre\": \"Juan Carlos Hernández García\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 3,\n            \"edificio\": \"Edificio C\",\n            \"descripcion_equipamiento\": \"Computadoras de última generación, escritorios ergonómicos y proyector.\"\n        },\n        \"materia\": {\n            \"id\": 3,\n            \"datos\": {\n                \"nombre\": \"Inteligencia Artificial\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n            },\n            \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400748\",\n                \"datos\": {\n                    \"id_curp\": \"ABC123456XYZ\",\n                    \"nombre\": \"Carlos Gómez Ramírez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400749\",\n                \"datos\": {\n                    \"id_curp\": \"DEF789012JKL\",\n                    \"nombre\": \"Ana María Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400752\",\n                \"datos\": {\n                    \"id_curp\": \"MNO456789VWX\",\n                    \"nombre\": \"Pedro Sánchez García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400753\",\n                \"datos\": {\n                    \"id_curp\": \"PQR678901YZA\",\n                    \"nombre\": \"María del Carmen Rodríguez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400754\",\n                \"datos\": {\n                    \"id_curp\": \"STU901234BCD\",\n                    \"nombre\": \"Luis Antonio Méndez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400759\",\n                \"datos\": {\n                    \"id_curp\": \"IJK012345RST\",\n                    \"nombre\": \"Gabriela González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400763\",\n                \"datos\": {\n                    \"id_curp\": \"UVW567890DEF\",\n                    \"nombre\": \"Alicia Reyes\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400769\",\n                \"datos\": {\n                    \"id_curp\": \"LMN345678UVW\",\n                    \"nombre\": \"Carolina Peña\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400770\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ789012XYZ\",\n                    \"nombre\": \"Juan Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400774\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Andrés Contreras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400775\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Camila Ramos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 9\n    },\n    {\n        \"id\": 4,\n        \"docente\": {\n            \"id_rfc\": \"ABCD123456EFG\",\n            \"datos\": {\n                \"nombre\": \"Juan Carlos Hernández García\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 1,\n            \"edificio\": \"Edificio A\",\n            \"descripcion_equipamiento\": \"Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.\"\n        },\n        \"materia\": {\n            \"id\": 4,\n            \"datos\": {\n                \"nombre\": \"Sistemas Operativos\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n            },\n            \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400751\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345STU\",\n                    \"nombre\": \"Laura Martínez Fernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400752\",\n                \"datos\": {\n                    \"id_curp\": \"MNO456789VWX\",\n                    \"nombre\": \"Pedro Sánchez García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400753\",\n                \"datos\": {\n                    \"id_curp\": \"PQR678901YZA\",\n                    \"nombre\": \"María del Carmen Rodríguez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400755\",\n                \"datos\": {\n                    \"id_curp\": \"VWX234567FGH\",\n                    \"nombre\": \"Sofía García López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400758\",\n                \"datos\": {\n                    \"id_curp\": \"FGH789012OPQ\",\n                    \"nombre\": \"Carlos Delgado\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400760\",\n                \"datos\": {\n                    \"id_curp\": \"LMN678901UVW\",\n                    \"nombre\": \"Roberto Medina\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400761\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ345678XYZ\",\n                    \"nombre\": \"Lucía Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400762\",\n                \"datos\": {\n                    \"id_curp\": \"RST901234ABC\",\n                    \"nombre\": \"Héctor Mendoza\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400764\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ234567GHI\",\n                    \"nombre\": \"Jorge Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400767\",\n                \"datos\": {\n                    \"id_curp\": \"GHI567890OPQ\",\n                    \"nombre\": \"Natalia Flores\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400768\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345RST\",\n                    \"nombre\": \"Luis Castro\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400769\",\n                \"datos\": {\n                    \"id_curp\": \"LMN345678UVW\",\n                    \"nombre\": \"Carolina Peña\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400770\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ789012XYZ\",\n                    \"nombre\": \"Juan Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400773\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ567890GHI\",\n                    \"nombre\": \"Laura Díaz\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 10\n    },\n    {\n        \"id\": 5,\n        \"docente\": {\n            \"id_rfc\": \"EFGH789012JKL\",\n            \"datos\": {\n                \"nombre\": \"Ana María Gómez Torres\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 1,\n            \"edificio\": \"Edificio A\",\n            \"descripcion_equipamiento\": \"Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.\"\n        },\n        \"materia\": {\n            \"id\": 5,\n            \"datos\": {\n                \"nombre\": \"Redes de Computadoras\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n            },\n            \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400748\",\n                \"datos\": {\n                    \"id_curp\": \"ABC123456XYZ\",\n                    \"nombre\": \"Carlos Gómez Ramírez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400753\",\n                \"datos\": {\n                    \"id_curp\": \"PQR678901YZA\",\n                    \"nombre\": \"María del Carmen Rodríguez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400754\",\n                \"datos\": {\n                    \"id_curp\": \"STU901234BCD\",\n                    \"nombre\": \"Luis Antonio Méndez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400755\",\n                \"datos\": {\n                    \"id_curp\": \"VWX234567FGH\",\n                    \"nombre\": \"Sofía García López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400757\",\n                \"datos\": {\n                    \"id_curp\": \"BCD345678LMN\",\n                    \"nombre\": \"Fernanda Rivas González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400758\",\n                \"datos\": {\n                    \"id_curp\": \"FGH789012OPQ\",\n                    \"nombre\": \"Carlos Delgado\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400761\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ345678XYZ\",\n                    \"nombre\": \"Lucía Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400763\",\n                \"datos\": {\n                    \"id_curp\": \"UVW567890DEF\",\n                    \"nombre\": \"Alicia Reyes\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400764\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ234567GHI\",\n                    \"nombre\": \"Jorge Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400766\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Miguel Sánchez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400770\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ789012XYZ\",\n                    \"nombre\": \"Juan Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400773\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ567890GHI\",\n                    \"nombre\": \"Laura Díaz\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400775\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Camila Ramos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 21\n    },\n    {\n        \"id\": 6,\n        \"docente\": {\n            \"id_rfc\": \"EFGH789012JKL\",\n            \"datos\": {\n                \"nombre\": \"Ana María Gómez Torres\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 1,\n            \"edificio\": \"Edificio A\",\n            \"descripcion_equipamiento\": \"Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.\"\n        },\n        \"materia\": {\n            \"id\": 6,\n            \"datos\": {\n                \"nombre\": \"Estructuras de Datos\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n            },\n            \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400749\",\n                \"datos\": {\n                    \"id_curp\": \"DEF789012JKL\",\n                    \"nombre\": \"Ana María Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400750\",\n                \"datos\": {\n                    \"id_curp\": \"GHI345678OPQ\",\n                    \"nombre\": \"José Luis Hernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400751\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345STU\",\n                    \"nombre\": \"Laura Martínez Fernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400755\",\n                \"datos\": {\n                    \"id_curp\": \"VWX234567FGH\",\n                    \"nombre\": \"Sofía García López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400756\",\n                \"datos\": {\n                    \"id_curp\": \"YZA678901IJK\",\n                    \"nombre\": \"Daniel Ortega Rivera\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400758\",\n                \"datos\": {\n                    \"id_curp\": \"FGH789012OPQ\",\n                    \"nombre\": \"Carlos Delgado\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400759\",\n                \"datos\": {\n                    \"id_curp\": \"IJK012345RST\",\n                    \"nombre\": \"Gabriela González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400760\",\n                \"datos\": {\n                    \"id_curp\": \"LMN678901UVW\",\n                    \"nombre\": \"Roberto Medina\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400763\",\n                \"datos\": {\n                    \"id_curp\": \"UVW567890DEF\",\n                    \"nombre\": \"Alicia Reyes\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400766\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Miguel Sánchez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400769\",\n                \"datos\": {\n                    \"id_curp\": \"LMN345678UVW\",\n                    \"nombre\": \"Carolina Peña\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400770\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ789012XYZ\",\n                    \"nombre\": \"Juan Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400772\",\n                \"datos\": {\n                    \"id_curp\": \"UVW789012DEF\",\n                    \"nombre\": \"Oscar García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400773\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ567890GHI\",\n                    \"nombre\": \"Laura Díaz\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 8\n    },\n    {\n        \"id\": 7,\n        \"docente\": {\n            \"id_rfc\": \"EFGH789012JKL\",\n            \"datos\": {\n                \"nombre\": \"Ana María Gómez Torres\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 3,\n            \"edificio\": \"Edificio C\",\n            \"descripcion_equipamiento\": \"Computadoras de última generación, escritorios ergonómicos y proyector.\"\n        },\n        \"materia\": {\n            \"id\": 7,\n            \"datos\": {\n                \"nombre\": \"Arquitectura de Computadoras\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n            },\n            \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400748\",\n                \"datos\": {\n                    \"id_curp\": \"ABC123456XYZ\",\n                    \"nombre\": \"Carlos Gómez Ramírez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400750\",\n                \"datos\": {\n                    \"id_curp\": \"GHI345678OPQ\",\n                    \"nombre\": \"José Luis Hernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400753\",\n                \"datos\": {\n                    \"id_curp\": \"PQR678901YZA\",\n                    \"nombre\": \"María del Carmen Rodríguez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400755\",\n                \"datos\": {\n                    \"id_curp\": \"VWX234567FGH\",\n                    \"nombre\": \"Sofía García López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400758\",\n                \"datos\": {\n                    \"id_curp\": \"FGH789012OPQ\",\n                    \"nombre\": \"Carlos Delgado\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400760\",\n                \"datos\": {\n                    \"id_curp\": \"LMN678901UVW\",\n                    \"nombre\": \"Roberto Medina\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400762\",\n                \"datos\": {\n                    \"id_curp\": \"RST901234ABC\",\n                    \"nombre\": \"Héctor Mendoza\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400763\",\n                \"datos\": {\n                    \"id_curp\": \"UVW567890DEF\",\n                    \"nombre\": \"Alicia Reyes\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400766\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Miguel Sánchez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400768\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345RST\",\n                    \"nombre\": \"Luis Castro\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400771\",\n                \"datos\": {\n                    \"id_curp\": \"RST123456ABC\",\n                    \"nombre\": \"Ximena López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400772\",\n                \"datos\": {\n                    \"id_curp\": \"UVW789012DEF\",\n                    \"nombre\": \"Oscar García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400773\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ567890GHI\",\n                    \"nombre\": \"Laura Díaz\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 15\n    },\n    {\n        \"id\": 8,\n        \"docente\": {\n            \"id_rfc\": \"EFGH789012JKL\",\n            \"datos\": {\n                \"nombre\": \"Ana María Gómez Torres\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 4,\n            \"edificio\": \"Edificio D\",\n            \"descripcion_equipamiento\": \"Sala de conferencias con proyector, sillas cómodas y sistema de videoconferencia.\"\n        },\n        \"materia\": {\n            \"id\": 8,\n            \"datos\": {\n                \"nombre\": \"Algoritmos Avanzados\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n            },\n            \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400748\",\n                \"datos\": {\n                    \"id_curp\": \"ABC123456XYZ\",\n                    \"nombre\": \"Carlos Gómez Ramírez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400750\",\n                \"datos\": {\n                    \"id_curp\": \"GHI345678OPQ\",\n                    \"nombre\": \"José Luis Hernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400751\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345STU\",\n                    \"nombre\": \"Laura Martínez Fernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400755\",\n                \"datos\": {\n                    \"id_curp\": \"VWX234567FGH\",\n                    \"nombre\": \"Sofía García López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400756\",\n                \"datos\": {\n                    \"id_curp\": \"YZA678901IJK\",\n                    \"nombre\": \"Daniel Ortega Rivera\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400760\",\n                \"datos\": {\n                    \"id_curp\": \"LMN678901UVW\",\n                    \"nombre\": \"Roberto Medina\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400765\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Patricia Álvarez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400767\",\n                \"datos\": {\n                    \"id_curp\": \"GHI567890OPQ\",\n                    \"nombre\": \"Natalia Flores\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400768\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345RST\",\n                    \"nombre\": \"Luis Castro\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400769\",\n                \"datos\": {\n                    \"id_curp\": \"LMN345678UVW\",\n                    \"nombre\": \"Carolina Peña\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400772\",\n                \"datos\": {\n                    \"id_curp\": \"UVW789012DEF\",\n                    \"nombre\": \"Oscar García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400773\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ567890GHI\",\n                    \"nombre\": \"Laura Díaz\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400774\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Andrés Contreras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 14\n    },\n    {\n        \"id\": 9,\n        \"docente\": {\n            \"id_rfc\": \"MNOP345678QRS\",\n            \"datos\": {\n                \"nombre\": \"José Luis Morales\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 2,\n            \"edificio\": \"Edificio B\",\n            \"descripcion_equipamiento\": \"Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.\"\n        },\n        \"materia\": {\n            \"id\": 9,\n            \"datos\": {\n                \"nombre\": \"Bases de Datos\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n            },\n            \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400756\",\n                \"datos\": {\n                    \"id_curp\": \"YZA678901IJK\",\n                    \"nombre\": \"Daniel Ortega Rivera\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400758\",\n                \"datos\": {\n                    \"id_curp\": \"FGH789012OPQ\",\n                    \"nombre\": \"Carlos Delgado\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400759\",\n                \"datos\": {\n                    \"id_curp\": \"IJK012345RST\",\n                    \"nombre\": \"Gabriela González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400761\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ345678XYZ\",\n                    \"nombre\": \"Lucía Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400764\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ234567GHI\",\n                    \"nombre\": \"Jorge Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400767\",\n                \"datos\": {\n                    \"id_curp\": \"GHI567890OPQ\",\n                    \"nombre\": \"Natalia Flores\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400768\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345RST\",\n                    \"nombre\": \"Luis Castro\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400771\",\n                \"datos\": {\n                    \"id_curp\": \"RST123456ABC\",\n                    \"nombre\": \"Ximena López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400772\",\n                \"datos\": {\n                    \"id_curp\": \"UVW789012DEF\",\n                    \"nombre\": \"Oscar García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400774\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Andrés Contreras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400775\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Camila Ramos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 16\n    },\n    {\n        \"id\": 10,\n        \"docente\": {\n            \"id_rfc\": \"MNOP345678QRS\",\n            \"datos\": {\n                \"nombre\": \"José Luis Morales\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 4,\n            \"edificio\": \"Edificio D\",\n            \"descripcion_equipamiento\": \"Sala de conferencias con proyector, sillas cómodas y sistema de videoconferencia.\"\n        },\n        \"materia\": {\n            \"id\": 10,\n            \"datos\": {\n                \"nombre\": \"Seguridad Informática\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n            },\n            \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400748\",\n                \"datos\": {\n                    \"id_curp\": \"ABC123456XYZ\",\n                    \"nombre\": \"Carlos Gómez Ramírez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400750\",\n                \"datos\": {\n                    \"id_curp\": \"GHI345678OPQ\",\n                    \"nombre\": \"José Luis Hernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400752\",\n                \"datos\": {\n                    \"id_curp\": \"MNO456789VWX\",\n                    \"nombre\": \"Pedro Sánchez García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400755\",\n                \"datos\": {\n                    \"id_curp\": \"VWX234567FGH\",\n                    \"nombre\": \"Sofía García López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400756\",\n                \"datos\": {\n                    \"id_curp\": \"YZA678901IJK\",\n                    \"nombre\": \"Daniel Ortega Rivera\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400757\",\n                \"datos\": {\n                    \"id_curp\": \"BCD345678LMN\",\n                    \"nombre\": \"Fernanda Rivas González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400760\",\n                \"datos\": {\n                    \"id_curp\": \"LMN678901UVW\",\n                    \"nombre\": \"Roberto Medina\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400763\",\n                \"datos\": {\n                    \"id_curp\": \"UVW567890DEF\",\n                    \"nombre\": \"Alicia Reyes\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400764\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ234567GHI\",\n                    \"nombre\": \"Jorge Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400765\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Patricia Álvarez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400767\",\n                \"datos\": {\n                    \"id_curp\": \"GHI567890OPQ\",\n                    \"nombre\": \"Natalia Flores\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400770\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ789012XYZ\",\n                    \"nombre\": \"Juan Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400772\",\n                \"datos\": {\n                    \"id_curp\": \"UVW789012DEF\",\n                    \"nombre\": \"Oscar García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 9\n    },\n    {\n        \"id\": 11,\n        \"docente\": {\n            \"id_rfc\": \"TUVW567890XYZ\",\n            \"datos\": {\n                \"nombre\": \"Laura Martínez Fernández\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 3,\n            \"edificio\": \"Edificio C\",\n            \"descripcion_equipamiento\": \"Computadoras de última generación, escritorios ergonómicos y proyector.\"\n        },\n        \"materia\": {\n            \"id\": 11,\n            \"datos\": {\n                \"nombre\": \"Desarrollo de Software\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n            },\n            \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400749\",\n                \"datos\": {\n                    \"id_curp\": \"DEF789012JKL\",\n                    \"nombre\": \"Ana María Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400750\",\n                \"datos\": {\n                    \"id_curp\": \"GHI345678OPQ\",\n                    \"nombre\": \"José Luis Hernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400754\",\n                \"datos\": {\n                    \"id_curp\": \"STU901234BCD\",\n                    \"nombre\": \"Luis Antonio Méndez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400757\",\n                \"datos\": {\n                    \"id_curp\": \"BCD345678LMN\",\n                    \"nombre\": \"Fernanda Rivas González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400763\",\n                \"datos\": {\n                    \"id_curp\": \"UVW567890DEF\",\n                    \"nombre\": \"Alicia Reyes\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400764\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ234567GHI\",\n                    \"nombre\": \"Jorge Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400765\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Patricia Álvarez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400768\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345RST\",\n                    \"nombre\": \"Luis Castro\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400769\",\n                \"datos\": {\n                    \"id_curp\": \"LMN345678UVW\",\n                    \"nombre\": \"Carolina Peña\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400772\",\n                \"datos\": {\n                    \"id_curp\": \"UVW789012DEF\",\n                    \"nombre\": \"Oscar García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400774\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Andrés Contreras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 21\n    },\n    {\n        \"id\": 12,\n        \"docente\": {\n            \"id_rfc\": \"WXYZ123456ABC\",\n            \"datos\": {\n                \"nombre\": \"Pedro Sánchez Ramírez\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 2,\n            \"edificio\": \"Edificio B\",\n            \"descripcion_equipamiento\": \"Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.\"\n        },\n        \"materia\": {\n            \"id\": 12,\n            \"datos\": {\n                \"nombre\": \"Computación en la Nube\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n            },\n            \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400748\",\n                \"datos\": {\n                    \"id_curp\": \"ABC123456XYZ\",\n                    \"nombre\": \"Carlos Gómez Ramírez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400749\",\n                \"datos\": {\n                    \"id_curp\": \"DEF789012JKL\",\n                    \"nombre\": \"Ana María Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400750\",\n                \"datos\": {\n                    \"id_curp\": \"GHI345678OPQ\",\n                    \"nombre\": \"José Luis Hernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400751\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345STU\",\n                    \"nombre\": \"Laura Martínez Fernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400755\",\n                \"datos\": {\n                    \"id_curp\": \"VWX234567FGH\",\n                    \"nombre\": \"Sofía García López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400759\",\n                \"datos\": {\n                    \"id_curp\": \"IJK012345RST\",\n                    \"nombre\": \"Gabriela González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400760\",\n                \"datos\": {\n                    \"id_curp\": \"LMN678901UVW\",\n                    \"nombre\": \"Roberto Medina\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400761\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ345678XYZ\",\n                    \"nombre\": \"Lucía Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400762\",\n                \"datos\": {\n                    \"id_curp\": \"RST901234ABC\",\n                    \"nombre\": \"Héctor Mendoza\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400764\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ234567GHI\",\n                    \"nombre\": \"Jorge Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400765\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Patricia Álvarez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400767\",\n                \"datos\": {\n                    \"id_curp\": \"GHI567890OPQ\",\n                    \"nombre\": \"Natalia Flores\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400768\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345RST\",\n                    \"nombre\": \"Luis Castro\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400775\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Camila Ramos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 7\n    },\n    {\n        \"id\": 13,\n        \"docente\": {\n            \"id_rfc\": \"TUVW567890XYZ\",\n            \"datos\": {\n                \"nombre\": \"Laura Martínez Fernández\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 1,\n            \"edificio\": \"Edificio A\",\n            \"descripcion_equipamiento\": \"Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.\"\n        },\n        \"materia\": {\n            \"id\": 12,\n            \"datos\": {\n                \"nombre\": \"Computación en la Nube\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n            },\n            \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400752\",\n                \"datos\": {\n                    \"id_curp\": \"MNO456789VWX\",\n                    \"nombre\": \"Pedro Sánchez García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400753\",\n                \"datos\": {\n                    \"id_curp\": \"PQR678901YZA\",\n                    \"nombre\": \"María del Carmen Rodríguez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400754\",\n                \"datos\": {\n                    \"id_curp\": \"STU901234BCD\",\n                    \"nombre\": \"Luis Antonio Méndez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400756\",\n                \"datos\": {\n                    \"id_curp\": \"YZA678901IJK\",\n                    \"nombre\": \"Daniel Ortega Rivera\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400762\",\n                \"datos\": {\n                    \"id_curp\": \"RST901234ABC\",\n                    \"nombre\": \"Héctor Mendoza\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400766\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Miguel Sánchez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400769\",\n                \"datos\": {\n                    \"id_curp\": \"LMN345678UVW\",\n                    \"nombre\": \"Carolina Peña\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400772\",\n                \"datos\": {\n                    \"id_curp\": \"UVW789012DEF\",\n                    \"nombre\": \"Oscar García\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400774\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Andrés Contreras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 15\n    },\n    {\n        \"id\": 14,\n        \"docente\": {\n            \"id_rfc\": \"MNOP345678QRS\",\n            \"datos\": {\n                \"nombre\": \"José Luis Morales\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 2,\n            \"edificio\": \"Edificio B\",\n            \"descripcion_equipamiento\": \"Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.\"\n        },\n        \"materia\": {\n            \"id\": 11,\n            \"datos\": {\n                \"nombre\": \"Desarrollo de Software\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n            },\n            \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400748\",\n                \"datos\": {\n                    \"id_curp\": \"ABC123456XYZ\",\n                    \"nombre\": \"Carlos Gómez Ramírez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400751\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345STU\",\n                    \"nombre\": \"Laura Martínez Fernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400755\",\n                \"datos\": {\n                    \"id_curp\": \"VWX234567FGH\",\n                    \"nombre\": \"Sofía García López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400756\",\n                \"datos\": {\n                    \"id_curp\": \"YZA678901IJK\",\n                    \"nombre\": \"Daniel Ortega Rivera\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400758\",\n                \"datos\": {\n                    \"id_curp\": \"FGH789012OPQ\",\n                    \"nombre\": \"Carlos Delgado\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400759\",\n                \"datos\": {\n                    \"id_curp\": \"IJK012345RST\",\n                    \"nombre\": \"Gabriela González\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400762\",\n                \"datos\": {\n                    \"id_curp\": \"RST901234ABC\",\n                    \"nombre\": \"Héctor Mendoza\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400763\",\n                \"datos\": {\n                    \"id_curp\": \"UVW567890DEF\",\n                    \"nombre\": \"Alicia Reyes\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400764\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ234567GHI\",\n                    \"nombre\": \"Jorge Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400770\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ789012XYZ\",\n                    \"nombre\": \"Juan Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400771\",\n                \"datos\": {\n                    \"id_curp\": \"RST123456ABC\",\n                    \"nombre\": \"Ximena López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400773\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ567890GHI\",\n                    \"nombre\": \"Laura Díaz\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400775\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Camila Ramos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 10\n    },\n    {\n        \"id\": 15,\n        \"docente\": {\n            \"id_rfc\": \"WXYZ123456ABC\",\n            \"datos\": {\n                \"nombre\": \"Pedro Sánchez Ramírez\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 3,\n            \"edificio\": \"Edificio C\",\n            \"descripcion_equipamiento\": \"Computadoras de última generación, escritorios ergonómicos y proyector.\"\n        },\n        \"materia\": {\n            \"id\": 10,\n            \"datos\": {\n                \"nombre\": \"Seguridad Informática\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n            },\n            \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n        },\n        \"alumnos\": [\n            {\n                \"nctrl\": \"20400749\",\n                \"datos\": {\n                    \"id_curp\": \"DEF789012JKL\",\n                    \"nombre\": \"Ana María Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400751\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345STU\",\n                    \"nombre\": \"Laura Martínez Fernández\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400753\",\n                \"datos\": {\n                    \"id_curp\": \"PQR678901YZA\",\n                    \"nombre\": \"María del Carmen Rodríguez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400754\",\n                \"datos\": {\n                    \"id_curp\": \"STU901234BCD\",\n                    \"nombre\": \"Luis Antonio Méndez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400761\",\n                \"datos\": {\n                    \"id_curp\": \"OPQ345678XYZ\",\n                    \"nombre\": \"Lucía Pérez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400763\",\n                \"datos\": {\n                    \"id_curp\": \"UVW567890DEF\",\n                    \"nombre\": \"Alicia Reyes\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400764\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ234567GHI\",\n                    \"nombre\": \"Jorge Torres\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400766\",\n                \"datos\": {\n                    \"id_curp\": \"DEF345678LMN\",\n                    \"nombre\": \"Miguel Sánchez\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400768\",\n                \"datos\": {\n                    \"id_curp\": \"JKL012345RST\",\n                    \"nombre\": \"Luis Castro\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400769\",\n                \"datos\": {\n                    \"id_curp\": \"LMN345678UVW\",\n                    \"nombre\": \"Carolina Peña\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400771\",\n                \"datos\": {\n                    \"id_curp\": \"RST123456ABC\",\n                    \"nombre\": \"Ximena López\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400773\",\n                \"datos\": {\n                    \"id_curp\": \"XYZ567890GHI\",\n                    \"nombre\": \"Laura Díaz\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            },\n            {\n                \"nctrl\": \"20400774\",\n                \"datos\": {\n                    \"id_curp\": \"ABC901234JKL\",\n                    \"nombre\": \"Andrés Contreras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n                }\n            }\n        ],\n        \"horario\": 21\n    }\n]",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/grupos/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"grupos",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "crearDocentes",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "[\n    {\n        \"id_rfc\": \"ABCD123456EFG\",\n        \"datos\": {\n            \"nombre\": \"Juan Carlos Hernández García\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"materias_impartidas\": [\n            {\n                \"id\": 2,\n                \"datos\": {\n                    \"nombre\": \"Programación Web\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n                },\n                \"planDeEstudios\": \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n            },\n            {\n                \"id\": 10,\n                \"datos\": {\n                    \"nombre\": \"Seguridad Informática\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n                },\n                \"planDeEstudios\": \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n            },\n            {\n                \"id\": 4,\n                \"datos\": {\n                    \"nombre\": \"Sistemas Operativos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n                },\n                \"planDeEstudios\": \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n            },\n            {\n                \"id\": 8,\n                \"datos\": {\n                    \"nombre\": \"Algoritmos Avanzados\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n                },\n                \"planDeEstudios\": \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n            }\n        ]\n    },\n    {\n        \"id_rfc\": \"EFGH789012JKL\",\n        \"datos\": {\n            \"nombre\": \"Ana María Gómez Torres\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"materias_impartidas\": [\n            {\n                \"id\": 7,\n                \"datos\": {\n                    \"nombre\": \"Arquitectura de Computadoras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n                },\n                \"planDeEstudios\": \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n            },\n            {\n                \"id\": 3,\n                \"datos\": {\n                    \"nombre\": \"Inteligencia Artificial\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n                },\n                \"planDeEstudios\": \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n            },\n            {\n                \"id\": 6,\n                \"datos\": {\n                    \"nombre\": \"Estructuras de Datos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n                },\n                \"planDeEstudios\": \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n            },\n            {\n                \"id\": 5,\n                \"datos\": {\n                    \"nombre\": \"Redes de Computadoras\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n                },\n                \"planDeEstudios\": \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n            }\n        ]\n    },\n    {\n        \"id_rfc\": \"MNOP345678QRS\",\n        \"datos\": {\n            \"nombre\": \"José Luis Morales\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"materias_impartidas\": [\n            {\n                \"id\": 9,\n                \"datos\": {\n                    \"nombre\": \"Bases de Datos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                },\n                \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n            },\n            {\n                \"id\": 12,\n                \"datos\": {\n                    \"nombre\": \"Computación en la Nube\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                },\n                \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n            }\n        ]\n    },\n    {\n        \"id_rfc\": \"TUVW567890XYZ\",\n        \"datos\": {\n            \"nombre\": \"Laura Martínez Fernández\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"materias_impartidas\": [\n            {\n                \"id\": 11,\n                \"datos\": {\n                    \"nombre\": \"Desarrollo de Software\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n                },\n                \"planDeEstudios\": \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n            },\n            {\n                \"id\": 9,\n                \"datos\": {\n                    \"nombre\": \"Bases de Datos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                },\n                \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n            },\n            {\n                \"id\": 12,\n                \"datos\": {\n                    \"nombre\": \"Computación en la Nube\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                },\n                \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n            }\n        ]\n    },\n    {\n        \"id_rfc\": \"WXYZ123456ABC\",\n        \"datos\": {\n            \"nombre\": \"Pedro Sánchez Ramírez\",\n            \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n            \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n        },\n        \"materias_impartidas\": [\n            {\n                \"id\": 1,\n                \"datos\": {\n                    \"nombre\": \"NOSQL\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n                },\n                \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n            },\n            {\n                \"id\": 9,\n                \"datos\": {\n                    \"nombre\": \"Bases de Datos\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n                },\n                \"planDeEstudios\": \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n            },\n            {\n                \"id\": 12,\n                \"datos\": {\n                    \"nombre\": \"Computación en la Nube\",\n                    \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                    \"descripcion\": \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n                },\n                \"planDeEstudios\": \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n            }\n        ]\n    }\n]",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/docentes/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"docentes",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "crearMaterias",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "[\n  {\n    \"id\": 1,\n    \"datos\": {\n      \"nombre\": \"NOSQL\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n  },\n  {\n    \"id\": 2,\n    \"datos\": {\n      \"nombre\": \"Programación Web\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.\"\n    },\n    \"planDeEstudios\":\n      \"Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.\"\n  },\n  {\n    \"id\": 3,\n    \"datos\": {\n      \"nombre\": \"Inteligencia Artificial\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.\"\n  },\n  {\n    \"id\": 4,\n    \"datos\": {\n      \"nombre\": \"Sistemas Operativos\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.\"\n    },\n    \"planDeEstudios\":\n      \"Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.\"\n  },\n  {\n    \"id\": 5,\n    \"datos\": {\n      \"nombre\": \"Redes de Computadoras\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.\"\n  },\n  {\n    \"id\": 6,\n    \"datos\": {\n      \"nombre\": \"Estructuras de Datos\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.\"\n  },\n  {\n    \"id\": 7,\n    \"datos\": {\n      \"nombre\": \"Arquitectura de Computadoras\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.\"\n  },\n  {\n    \"id\": 8,\n    \"datos\": {\n      \"nombre\": \"Algoritmos Avanzados\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.\"\n  },\n  {\n    \"id\": 9,\n    \"datos\": {\n      \"nombre\": \"Bases de Datos\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.\"\n  },\n  {\n    \"id\": 10,\n    \"datos\": {\n      \"nombre\": \"Seguridad Informática\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.\"\n  },\n  {\n    \"id\": 11,\n    \"datos\": {\n      \"nombre\": \"Desarrollo de Software\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.\"\n  },\n  {\n    \"id\": 12,\n    \"datos\": {\n      \"nombre\": \"Computación en la Nube\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n  }\n]",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/materias/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"materias",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "crearAulas",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "[\n  {\n    \"id_aula\": 1,\n    \"edificio\": \"Edificio A\",\n    \"grupos_atendidos\": [6, 13, 5, 4, 1],\n    \"descripcion_equipamiento\":\n      \"Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.\"\n  },\n  {\n    \"id_aula\": 2,\n    \"edificio\": \"Edificio B\",\n    \"grupos_atendidos\": [12, 14, 2, 9],\n    \"descripcion_equipamiento\":\n      \"Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.\"\n  },\n  {\n    \"id_aula\": 3,\n    \"edificio\": \"Edificio C\",\n    \"grupos_atendidos\": [7, 3, 15, 11],\n    \"descripcion_equipamiento\":\n      \"Computadoras de última generación, escritorios ergonómicos y proyector.\"\n  },\n  {\n    \"id_aula\": 4,\n    \"edificio\": \"Edificio D\",\n    \"grupos_atendidos\": [8, 11, 10],\n    \"descripcion_equipamiento\":\n      \"Sala de conferencias con proyector, sillas cómodas y sistema de videoconferencia.\"\n  }\n]",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/aulas/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"aulas",
								""
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Grupos",
			"item": [
				{
					"name": "crearGrupo",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n        \"id\": 10,\n        \"docente\": {\n            \"id_rfc\": \"ABCD123456EFG\",\n            \"datos\": {\n                \"nombre\": \"Juan Carlos Hernández García\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 1,\n            \"edificio\": \"Edificio A\",\n            \"descripcion_equipamiento\": \"Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.\"\n        },\n        \"materia\": {\n            \"id\": 1,\n            \"datos\": {\n                \"nombre\": \"NOSQL\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n            },\n            \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n        },\n        \"alumnos\": [],\n        \"horario\": 15\n    }",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/grupos/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"grupos",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerGrupos",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/grupos/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"grupos",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerGrupoPorId",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/grupos/10",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"grupos",
								"10"
							]
						}
					},
					"response": []
				},
				{
					"name": "actualizarGrupo",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n        \"id\": 10,\n        \"docente\": {\n            \"id_rfc\": \"ABCD123456EFG\",\n            \"datos\": {\n                \"nombre\": \"Juan Carlos Hernández García\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n            }\n        },\n        \"aula\": {\n            \"id_aula\": 1,\n            \"edificio\": \"Edificio A\",\n            \"descripcion_equipamiento\": \"Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.\"\n        },\n        \"materia\": {\n            \"id\": 1,\n            \"datos\": {\n                \"nombre\": \"NOSQL\",\n                \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n                \"descripcion\": \"Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.\"\n            },\n            \"planDeEstudios\": \"Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.\"\n        },\n        \"alumnos\": [],\n        \"horario\": 17\n    }",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/grupos/10",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"grupos",
								"10"
							]
						}
					},
					"response": []
				},
				{
					"name": "eliminarGrupo",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/grupos/10",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"grupos",
								"10"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Aulas",
			"item": [
				{
					"name": "crearAula",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id_aula\": 5,\n    \"edificio\": \"Edificio E\",\n    \"grupos_atendidos\": [],\n    \"descripcion_equipamiento\":\n      \"Laboratorio de computación con ordenadores de última generación, impresoras 3D y software especializado.\"\n}\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/aulas/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"aulas",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerAulas",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/aulas/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"aulas",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerAulaPorId",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/aulas/5",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"aulas",
								"5"
							]
						}
					},
					"response": []
				},
				{
					"name": "actualizarAula",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id_aula\": 5,\n    \"edificio\": \"Edificio F\",\n    \"grupos_atendidos\": [1,2],\n    \"descripcion_equipamiento\":\n      \"Laboratorio de computación con ordenadores de última generación, impresoras 3D y software especializado.\"\n}\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/aulas/5",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"aulas",
								"5"
							]
						}
					},
					"response": []
				},
				{
					"name": "eliminarAula",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/aulas/5",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"aulas",
								"5"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Docentes",
			"item": [
				{
					"name": "crearDocente",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id_rfc\": \"QRST987654LMN\",\n    \"datos\": {\n        \"nombre\": \"María Fernanda López Cruz\",\n        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n        \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n    },\n    \"materias_impartidas\": []\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/docentes/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"docentes",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerDocentes",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/docentes",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"docentes"
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerDocentePorRFC",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/docentes/QRST987654LMN",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"docentes",
								"QRST987654LMN"
							]
						}
					},
					"response": []
				},
				{
					"name": "actualizarDocente",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id_rfc\": \"QRST987654LMN\",\n    \"datos\": {\n        \"nombre\": \"María Fernanda López Fernandez\",\n        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n        \"tecnologico\": \"Instituto Tecnológico de Tepic\"\n    },\n    \"materias_impartidas\": []\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/docentes/QRST987654LMN",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"docentes",
								"QRST987654LMN"
							]
						}
					},
					"response": []
				},
				{
					"name": "eliminarDocente",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/docentes/QRST987654LMN",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"docentes",
								"QRST987654LMN"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Materias",
			"item": [
				{
					"name": "crearMateria",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id\": 13,\n    \"datos\": {\n      \"nombre\": \"DevOps\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que cubre las DevOps requeridas en el mercado laboral.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a DevOps, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/materias/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"materias",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerMaterias",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/materias/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"materias",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerMateriaPorId",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/materias/13",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"materias",
								"13"
							]
						}
					},
					"response": []
				},
				{
					"name": "actualizarMateria",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id\": 13,\n    \"datos\": {\n      \"nombre\": \"DevOps\",\n      \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n      \"descripcion\":\n        \"Materia que cubre las DevOps requeridas en el mercado laboral.\"\n    },\n    \"planDeEstudios\":\n      \"Introducción a DevOps.\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/materias/13",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"materias",
								"13"
							]
						}
					},
					"response": []
				},
				{
					"name": "eliminarMateria",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/materias/13",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"materias",
								"13"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Alumnos",
			"item": [
				{
					"name": "crearAlumno",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"nctrl\": \"20400776\",\n    \"datos\": {\n        \"id_curp\": \"GHI901234OPQ\",\n        \"nombre\": \"Diego Martínez\",\n        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n        \"tecnologico\": \"Instituto Tecnológico de Tepic\",\n        \"expediente_academico\": {\n            \"reticula\": [],\n            \"grupos_cursados\": []\n        }\n    }\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/alumnos",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos"
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerAlumnos",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/alumnos",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos"
							]
						}
					},
					"response": []
				},
				{
					"name": "obtenerAlumnoNctrl",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/alumnos/20400776",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos",
								"20400776"
							]
						}
					},
					"response": []
				},
				{
					"name": "actualizarAlumno",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"nctrl\": \"20400776\",\n    \"datos\": {\n        \"id_curp\": \"GHI901234OPQ\",\n        \"nombre\": \"Diego Ali Martínez\",\n        \"carrera\": \"Ingeniería en Sistemas Computacionales\",\n        \"tecnologico\": \"Instituto Tecnológico de Tepic\",\n        \"expediente_academico\": {\n            \"reticula\": [],\n            \"grupos_cursados\": []\n        }\n    }\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost:3000/api/alumnos/20400776",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos",
								"20400776"
							]
						}
					},
					"response": []
				},
				{
					"name": "eliminarAlumno",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/alumnos/20400776",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos",
								"20400776"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Q's",
			"item": [
				{
					"name": "Q1.obtenerMateriasAlumno",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/alumnos/20400757/materias",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos",
								"20400757",
								"materias"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q2.obtenerAlumnosPorGrupoMateria",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/alumnos/grupo/11",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos",
								"grupo",
								"11"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q3.obtenerCalificacionesAlumno",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/alumnos/20400757/calificaciones",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos",
								"20400757",
								"calificaciones"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q4.obtenerDocentesPorMateria",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/docentes/materia/9",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"docentes",
								"materia",
								"9"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q5.obtenerAlumnosCalificacionSuperior",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/materias/3/alumnos/calificacion_minima/95",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"materias",
								"3",
								"alumnos",
								"calificacion_minima",
								"95"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q6.obtenerGruposPorMateria",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/grupos/materia/4",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"grupos",
								"materia",
								"4"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q7.obtenerMateriasAlumnoPorHora",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/alumnos/20400751/materias/hora/8",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos",
								"20400751",
								"materias",
								"hora",
								"8"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q8.obtenerMateriasPorCursar",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/alumnos/20400748/porCursar",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"alumnos",
								"20400748",
								"porCursar"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q9.obtenerMateriasImpartidasPorDocente",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/docentes/EFGH789012JKL/grupos",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"docentes",
								"EFGH789012JKL",
								"grupos"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}
```