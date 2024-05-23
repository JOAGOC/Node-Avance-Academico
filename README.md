# Estructura del proyecto 
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
├── package-lock.json
└── README.md
```
# Modelado de datos
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

## Iniciar el replicaSet en los contenedores de mongo 
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