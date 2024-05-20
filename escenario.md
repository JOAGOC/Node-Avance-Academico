# 02.3.1 Lab. 03 MongoDB

## No. Ctrl.: 20400748

## Nombre: José Angel González Cruz
---
# Indice


  - [Caso 02 - Avance Académico del TecNM](#caso-02---avance-académico-del-tecnm)
    - [Q0. Crear el escenario de datos con la correspondiente integridad referencial en un único archivo. La ejecución de dicho archivo debe insertar la totalidad de datos en las correspondientes instancias.](#q0-crear-el-escenario-de-datos-con-la-correspondiente-integridad-referencial-en-un-único-archivo-la-ejecución-de-dicho-archivo-debe-insertar-la-totalidad-de-datos-en-las-correspondientes-instancias)
    - [Q1. Listar las materias que un alumno ha cursado.](#q1-listar-las-materias-que-un-alumno-ha-cursado)
    - [Q2. Listar los alumnos que están cursando una materia específica de un grupo específico.](#q2-listar-los-alumnos-que-están-cursando-una-materia-específica-de-un-grupo-específico)
    - [Q3. Listar las calificaciones de un alumno en todas sus materias cursadas.](#q3-listar-las-calificaciones-de-un-alumno-en-todas-sus-materias-cursadas)
    - [Q4. Listar los docentes que imparten una materia específica.](#q4-listar-los-docentes-que-imparten-una-materia-específica)
    - [Q5. Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica.](#q5-listar-los-alumnos-que-han-obtenido-una-calificación-superior-a-90-en-una-materia-específica)
    - [Q6. Listar los grupos que correspondan a una materia específica.](#q6-listar-los-grupos-que-correspondan-a-una-materia-específica)
    - [Q7. Listar las materias que cursa un alumno en específico (horario).](#q7-listar-las-materias-que-cursa-un-alumno-en-específico-horario)
    - [Q8. Listar las materias que faltan por cursar a un alumno en específico.](#q8-listar-las-materias-que-faltan-por-cursar-a-un-alumno-en-específico)
    - [Q9. Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias.](#q9-listar-las-materias-que-imparte-un-docente-en-específico-junto-con-los-alumnos-que-cursan-cada-una-de-las-materias)

---

_Desarrolla un escenario demostrativo que incluya lo siguiente:_

- Realice un planteamiento funcional de modelado considerando las correspondientes Querys del caso.
- Utilizar VSC-Playground
- Implementar un escenario de datos demostrativo
- Las entidades presentadas constituyen una guía, debe de considerar la libertad de agregar entidades adicionales para resolver las Querys del escenario.
- En el caso de las consultas que impliquen dos o más entidades, estructurar un documento de tipo Master(entidad principal) - Detail (entidades secundarias)
- Link del documento

## Caso 02 - Avance Académico del TecNM

_Desarrolla una base de datos en MongoDB para una plataforma que gestione el horario y avance académico de los alumnos del TecNM:_

**Entidades:**

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

Consideraciones

- Un Alumno puede cursar muchas materias y una Materia puede ser cursada por muchos alumnos.
- Una Materia constituye un catálogo de las materias (retícula) asociadas a una determinada carrera
- Un Aula puede ser usada para impartir muchas materias.
- Un Grupo está asociado a una Materia en específico.

**\*Consultas a resolver** en el entorno de VSC-Playground. En el caso de las consultas que impliquen dos o más entidades, estructurar un documento de tipo Master(entidad principal) - Detail (entidades secundarias)\*

### Q0. Crear el escenario de datos con la correspondiente integridad referencial en un único archivo. La ejecución de dicho archivo debe insertar la totalidad de datos en las correspondientes instancias.

```javascript
use("escenario");

const aulas = [
  {
    id_aula: 1,
    edificio: "Edificio A",
    grupos_atendidos: [6, 13, 5, 4, 1],
    descripcion_equipamiento:
      "Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.",
  },
  {
    id_aula: 2,
    edificio: "Edificio B",
    grupos_atendidos: [12, 14, 2, 9],
    descripcion_equipamiento:
      "Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.",
  },
  {
    id_aula: 3,
    edificio: "Edificio C",
    grupos_atendidos: [7, 3, 15, 11],
    descripcion_equipamiento:
      "Computadoras de última generación, escritorios ergonómicos y proyector.",
  },
  {
    id_aula: 4,
    edificio: "Edificio D",
    grupos_atendidos: [8, 11, 10],
    descripcion_equipamiento:
      "Sala de conferencias con proyector, sillas cómodas y sistema de videoconferencia.",
  },
];

db.aula.insertMany(aulas);

const grupos = [
  {
    id: 1,
    docente: {
      id_rfc: "ABCD123456EFG",
      datos: {
        nombre: "Juan Carlos Hernández García",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 1,
      edificio: "Edificio A",
      descripcion_equipamiento:
        "Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.",
    },
    materia: {
      id: 1,
      datos: {
        nombre: "NOSQL",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.",
      },
      planDeEstudios:
        "Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.",
    },
    alumnos: [
      {
        nctrl: "20400749",
        datos: {
          id_curp: "DEF789012JKL",
          nombre: "Ana María Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400750",
        datos: {
          id_curp: "GHI345678OPQ",
          nombre: "José Luis Hernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400752",
        datos: {
          id_curp: "MNO456789VWX",
          nombre: "Pedro Sánchez García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400753",
        datos: {
          id_curp: "PQR678901YZA",
          nombre: "María del Carmen Rodríguez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400756",
        datos: {
          id_curp: "YZA678901IJK",
          nombre: "Daniel Ortega Rivera",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400758",
        datos: {
          id_curp: "FGH789012OPQ",
          nombre: "Carlos Delgado",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400762",
        datos: {
          id_curp: "RST901234ABC",
          nombre: "Héctor Mendoza",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400765",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Patricia Álvarez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400767",
        datos: {
          id_curp: "GHI567890OPQ",
          nombre: "Natalia Flores",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400768",
        datos: {
          id_curp: "JKL012345RST",
          nombre: "Luis Castro",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400770",
        datos: {
          id_curp: "OPQ789012XYZ",
          nombre: "Juan Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400771",
        datos: {
          id_curp: "RST123456ABC",
          nombre: "Ximena López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400774",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Andrés Contreras",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400775",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Camila Ramos",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 15,
  },
  {
    id: 2,
    docente: {
      id_rfc: "ABCD123456EFG",
      datos: {
        nombre: "Juan Carlos Hernández García",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 2,
      edificio: "Edificio B",
      descripcion_equipamiento:
        "Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.",
    },
    materia: {
      id: 2,
      datos: {
        nombre: "Programación Web",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.",
      },
      planDeEstudios:
        "Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.",
    },
    alumnos: [
      {
        nctrl: "20400748",
        datos: {
          id_curp: "ABC123456XYZ",
          nombre: "Carlos Gómez Ramírez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400750",
        datos: {
          id_curp: "GHI345678OPQ",
          nombre: "José Luis Hernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400751",
        datos: {
          id_curp: "JKL012345STU",
          nombre: "Laura Martínez Fernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400754",
        datos: {
          id_curp: "STU901234BCD",
          nombre: "Luis Antonio Méndez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400755",
        datos: {
          id_curp: "VWX234567FGH",
          nombre: "Sofía García López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400756",
        datos: {
          id_curp: "YZA678901IJK",
          nombre: "Daniel Ortega Rivera",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400757",
        datos: {
          id_curp: "BCD345678LMN",
          nombre: "Fernanda Rivas González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400759",
        datos: {
          id_curp: "IJK012345RST",
          nombre: "Gabriela González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400761",
        datos: {
          id_curp: "OPQ345678XYZ",
          nombre: "Lucía Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400762",
        datos: {
          id_curp: "RST901234ABC",
          nombre: "Héctor Mendoza",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400764",
        datos: {
          id_curp: "XYZ234567GHI",
          nombre: "Jorge Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400771",
        datos: {
          id_curp: "RST123456ABC",
          nombre: "Ximena López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400774",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Andrés Contreras",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 17,
  },
  {
    id: 3,
    docente: {
      id_rfc: "ABCD123456EFG",
      datos: {
        nombre: "Juan Carlos Hernández García",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 3,
      edificio: "Edificio C",
      descripcion_equipamiento:
        "Computadoras de última generación, escritorios ergonómicos y proyector.",
    },
    materia: {
      id: 3,
      datos: {
        nombre: "Inteligencia Artificial",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.",
      },
      planDeEstudios:
        "Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.",
    },
    alumnos: [
      {
        nctrl: "20400748",
        datos: {
          id_curp: "ABC123456XYZ",
          nombre: "Carlos Gómez Ramírez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400749",
        datos: {
          id_curp: "DEF789012JKL",
          nombre: "Ana María Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400752",
        datos: {
          id_curp: "MNO456789VWX",
          nombre: "Pedro Sánchez García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400753",
        datos: {
          id_curp: "PQR678901YZA",
          nombre: "María del Carmen Rodríguez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400754",
        datos: {
          id_curp: "STU901234BCD",
          nombre: "Luis Antonio Méndez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400759",
        datos: {
          id_curp: "IJK012345RST",
          nombre: "Gabriela González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400763",
        datos: {
          id_curp: "UVW567890DEF",
          nombre: "Alicia Reyes",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400769",
        datos: {
          id_curp: "LMN345678UVW",
          nombre: "Carolina Peña",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400770",
        datos: {
          id_curp: "OPQ789012XYZ",
          nombre: "Juan Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400774",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Andrés Contreras",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400775",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Camila Ramos",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 9,
  },
  {
    id: 4,
    docente: {
      id_rfc: "ABCD123456EFG",
      datos: {
        nombre: "Juan Carlos Hernández García",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 1,
      edificio: "Edificio A",
      descripcion_equipamiento:
        "Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.",
    },
    materia: {
      id: 4,
      datos: {
        nombre: "Sistemas Operativos",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.",
      },
      planDeEstudios:
        "Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.",
    },
    alumnos: [
      {
        nctrl: "20400751",
        datos: {
          id_curp: "JKL012345STU",
          nombre: "Laura Martínez Fernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400752",
        datos: {
          id_curp: "MNO456789VWX",
          nombre: "Pedro Sánchez García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400753",
        datos: {
          id_curp: "PQR678901YZA",
          nombre: "María del Carmen Rodríguez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400755",
        datos: {
          id_curp: "VWX234567FGH",
          nombre: "Sofía García López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400758",
        datos: {
          id_curp: "FGH789012OPQ",
          nombre: "Carlos Delgado",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400760",
        datos: {
          id_curp: "LMN678901UVW",
          nombre: "Roberto Medina",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400761",
        datos: {
          id_curp: "OPQ345678XYZ",
          nombre: "Lucía Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400762",
        datos: {
          id_curp: "RST901234ABC",
          nombre: "Héctor Mendoza",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400764",
        datos: {
          id_curp: "XYZ234567GHI",
          nombre: "Jorge Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400767",
        datos: {
          id_curp: "GHI567890OPQ",
          nombre: "Natalia Flores",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400768",
        datos: {
          id_curp: "JKL012345RST",
          nombre: "Luis Castro",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400769",
        datos: {
          id_curp: "LMN345678UVW",
          nombre: "Carolina Peña",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400770",
        datos: {
          id_curp: "OPQ789012XYZ",
          nombre: "Juan Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400773",
        datos: {
          id_curp: "XYZ567890GHI",
          nombre: "Laura Díaz",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 10,
  },
  {
    id: 5,
    docente: {
      id_rfc: "EFGH789012JKL",
      datos: {
        nombre: "Ana María Gómez Torres",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 1,
      edificio: "Edificio A",
      descripcion_equipamiento:
        "Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.",
    },
    materia: {
      id: 5,
      datos: {
        nombre: "Redes de Computadoras",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.",
      },
      planDeEstudios:
        "Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.",
    },
    alumnos: [
      {
        nctrl: "20400748",
        datos: {
          id_curp: "ABC123456XYZ",
          nombre: "Carlos Gómez Ramírez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400753",
        datos: {
          id_curp: "PQR678901YZA",
          nombre: "María del Carmen Rodríguez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400754",
        datos: {
          id_curp: "STU901234BCD",
          nombre: "Luis Antonio Méndez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400755",
        datos: {
          id_curp: "VWX234567FGH",
          nombre: "Sofía García López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400757",
        datos: {
          id_curp: "BCD345678LMN",
          nombre: "Fernanda Rivas González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400758",
        datos: {
          id_curp: "FGH789012OPQ",
          nombre: "Carlos Delgado",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400761",
        datos: {
          id_curp: "OPQ345678XYZ",
          nombre: "Lucía Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400763",
        datos: {
          id_curp: "UVW567890DEF",
          nombre: "Alicia Reyes",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400764",
        datos: {
          id_curp: "XYZ234567GHI",
          nombre: "Jorge Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400766",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Miguel Sánchez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400770",
        datos: {
          id_curp: "OPQ789012XYZ",
          nombre: "Juan Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400773",
        datos: {
          id_curp: "XYZ567890GHI",
          nombre: "Laura Díaz",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400775",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Camila Ramos",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 21,
  },
  {
    id: 6,
    docente: {
      id_rfc: "EFGH789012JKL",
      datos: {
        nombre: "Ana María Gómez Torres",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 1,
      edificio: "Edificio A",
      descripcion_equipamiento:
        "Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.",
    },
    materia: {
      id: 6,
      datos: {
        nombre: "Estructuras de Datos",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.",
      },
      planDeEstudios:
        "Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.",
    },
    alumnos: [
      {
        nctrl: "20400749",
        datos: {
          id_curp: "DEF789012JKL",
          nombre: "Ana María Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400750",
        datos: {
          id_curp: "GHI345678OPQ",
          nombre: "José Luis Hernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400751",
        datos: {
          id_curp: "JKL012345STU",
          nombre: "Laura Martínez Fernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400755",
        datos: {
          id_curp: "VWX234567FGH",
          nombre: "Sofía García López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400756",
        datos: {
          id_curp: "YZA678901IJK",
          nombre: "Daniel Ortega Rivera",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400758",
        datos: {
          id_curp: "FGH789012OPQ",
          nombre: "Carlos Delgado",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400759",
        datos: {
          id_curp: "IJK012345RST",
          nombre: "Gabriela González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400760",
        datos: {
          id_curp: "LMN678901UVW",
          nombre: "Roberto Medina",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400763",
        datos: {
          id_curp: "UVW567890DEF",
          nombre: "Alicia Reyes",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400766",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Miguel Sánchez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400769",
        datos: {
          id_curp: "LMN345678UVW",
          nombre: "Carolina Peña",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400770",
        datos: {
          id_curp: "OPQ789012XYZ",
          nombre: "Juan Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400772",
        datos: {
          id_curp: "UVW789012DEF",
          nombre: "Oscar García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400773",
        datos: {
          id_curp: "XYZ567890GHI",
          nombre: "Laura Díaz",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 8,
  },
  {
    id: 7,
    docente: {
      id_rfc: "EFGH789012JKL",
      datos: {
        nombre: "Ana María Gómez Torres",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 3,
      edificio: "Edificio C",
      descripcion_equipamiento:
        "Computadoras de última generación, escritorios ergonómicos y proyector.",
    },
    materia: {
      id: 7,
      datos: {
        nombre: "Arquitectura de Computadoras",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.",
      },
      planDeEstudios:
        "Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.",
    },
    alumnos: [
      {
        nctrl: "20400748",
        datos: {
          id_curp: "ABC123456XYZ",
          nombre: "Carlos Gómez Ramírez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400750",
        datos: {
          id_curp: "GHI345678OPQ",
          nombre: "José Luis Hernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400753",
        datos: {
          id_curp: "PQR678901YZA",
          nombre: "María del Carmen Rodríguez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400755",
        datos: {
          id_curp: "VWX234567FGH",
          nombre: "Sofía García López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400758",
        datos: {
          id_curp: "FGH789012OPQ",
          nombre: "Carlos Delgado",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400760",
        datos: {
          id_curp: "LMN678901UVW",
          nombre: "Roberto Medina",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400762",
        datos: {
          id_curp: "RST901234ABC",
          nombre: "Héctor Mendoza",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400763",
        datos: {
          id_curp: "UVW567890DEF",
          nombre: "Alicia Reyes",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400766",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Miguel Sánchez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400768",
        datos: {
          id_curp: "JKL012345RST",
          nombre: "Luis Castro",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400771",
        datos: {
          id_curp: "RST123456ABC",
          nombre: "Ximena López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400772",
        datos: {
          id_curp: "UVW789012DEF",
          nombre: "Oscar García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400773",
        datos: {
          id_curp: "XYZ567890GHI",
          nombre: "Laura Díaz",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 15,
  },
  {
    id: 8,
    docente: {
      id_rfc: "EFGH789012JKL",
      datos: {
        nombre: "Ana María Gómez Torres",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 4,
      edificio: "Edificio D",
      descripcion_equipamiento:
        "Sala de conferencias con proyector, sillas cómodas y sistema de videoconferencia.",
    },
    materia: {
      id: 8,
      datos: {
        nombre: "Algoritmos Avanzados",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.",
      },
      planDeEstudios:
        "Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.",
    },
    alumnos: [
      {
        nctrl: "20400748",
        datos: {
          id_curp: "ABC123456XYZ",
          nombre: "Carlos Gómez Ramírez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400750",
        datos: {
          id_curp: "GHI345678OPQ",
          nombre: "José Luis Hernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400751",
        datos: {
          id_curp: "JKL012345STU",
          nombre: "Laura Martínez Fernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400755",
        datos: {
          id_curp: "VWX234567FGH",
          nombre: "Sofía García López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400756",
        datos: {
          id_curp: "YZA678901IJK",
          nombre: "Daniel Ortega Rivera",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400760",
        datos: {
          id_curp: "LMN678901UVW",
          nombre: "Roberto Medina",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400765",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Patricia Álvarez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400767",
        datos: {
          id_curp: "GHI567890OPQ",
          nombre: "Natalia Flores",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400768",
        datos: {
          id_curp: "JKL012345RST",
          nombre: "Luis Castro",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400769",
        datos: {
          id_curp: "LMN345678UVW",
          nombre: "Carolina Peña",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400772",
        datos: {
          id_curp: "UVW789012DEF",
          nombre: "Oscar García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400773",
        datos: {
          id_curp: "XYZ567890GHI",
          nombre: "Laura Díaz",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400774",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Andrés Contreras",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 14,
  },
  {
    id: 9,
    docente: {
      id_rfc: "MNOP345678QRS",
      datos: {
        nombre: "José Luis Morales",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 2,
      edificio: "Edificio B",
      descripcion_equipamiento:
        "Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.",
    },
    materia: {
      id: 9,
      datos: {
        nombre: "Bases de Datos",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.",
      },
      planDeEstudios:
        "Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.",
    },
    alumnos: [
      {
        nctrl: "20400756",
        datos: {
          id_curp: "YZA678901IJK",
          nombre: "Daniel Ortega Rivera",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400758",
        datos: {
          id_curp: "FGH789012OPQ",
          nombre: "Carlos Delgado",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400759",
        datos: {
          id_curp: "IJK012345RST",
          nombre: "Gabriela González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400761",
        datos: {
          id_curp: "OPQ345678XYZ",
          nombre: "Lucía Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400764",
        datos: {
          id_curp: "XYZ234567GHI",
          nombre: "Jorge Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400767",
        datos: {
          id_curp: "GHI567890OPQ",
          nombre: "Natalia Flores",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400768",
        datos: {
          id_curp: "JKL012345RST",
          nombre: "Luis Castro",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400771",
        datos: {
          id_curp: "RST123456ABC",
          nombre: "Ximena López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400772",
        datos: {
          id_curp: "UVW789012DEF",
          nombre: "Oscar García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400774",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Andrés Contreras",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400775",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Camila Ramos",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 16,
  },
  {
    id: 10,
    docente: {
      id_rfc: "MNOP345678QRS",
      datos: {
        nombre: "José Luis Morales",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 4,
      edificio: "Edificio D",
      descripcion_equipamiento:
        "Sala de conferencias con proyector, sillas cómodas y sistema de videoconferencia.",
    },
    materia: {
      id: 10,
      datos: {
        nombre: "Seguridad Informática",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.",
      },
      planDeEstudios:
        "Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.",
    },
    alumnos: [
      {
        nctrl: "20400748",
        datos: {
          id_curp: "ABC123456XYZ",
          nombre: "Carlos Gómez Ramírez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400750",
        datos: {
          id_curp: "GHI345678OPQ",
          nombre: "José Luis Hernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400752",
        datos: {
          id_curp: "MNO456789VWX",
          nombre: "Pedro Sánchez García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400755",
        datos: {
          id_curp: "VWX234567FGH",
          nombre: "Sofía García López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400756",
        datos: {
          id_curp: "YZA678901IJK",
          nombre: "Daniel Ortega Rivera",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400757",
        datos: {
          id_curp: "BCD345678LMN",
          nombre: "Fernanda Rivas González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400760",
        datos: {
          id_curp: "LMN678901UVW",
          nombre: "Roberto Medina",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400763",
        datos: {
          id_curp: "UVW567890DEF",
          nombre: "Alicia Reyes",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400764",
        datos: {
          id_curp: "XYZ234567GHI",
          nombre: "Jorge Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400765",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Patricia Álvarez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400767",
        datos: {
          id_curp: "GHI567890OPQ",
          nombre: "Natalia Flores",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400770",
        datos: {
          id_curp: "OPQ789012XYZ",
          nombre: "Juan Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400772",
        datos: {
          id_curp: "UVW789012DEF",
          nombre: "Oscar García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 9,
  },
  {
    id: 11,
    docente: {
      id_rfc: "TUVW567890XYZ",
      datos: {
        nombre: "Laura Martínez Fernández",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 3,
      edificio: "Edificio C",
      descripcion_equipamiento:
        "Computadoras de última generación, escritorios ergonómicos y proyector.",
    },
    materia: {
      id: 11,
      datos: {
        nombre: "Desarrollo de Software",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.",
      },
      planDeEstudios:
        "Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.",
    },
    alumnos: [
      {
        nctrl: "20400749",
        datos: {
          id_curp: "DEF789012JKL",
          nombre: "Ana María Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400750",
        datos: {
          id_curp: "GHI345678OPQ",
          nombre: "José Luis Hernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400754",
        datos: {
          id_curp: "STU901234BCD",
          nombre: "Luis Antonio Méndez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400757",
        datos: {
          id_curp: "BCD345678LMN",
          nombre: "Fernanda Rivas González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400763",
        datos: {
          id_curp: "UVW567890DEF",
          nombre: "Alicia Reyes",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400764",
        datos: {
          id_curp: "XYZ234567GHI",
          nombre: "Jorge Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400765",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Patricia Álvarez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400768",
        datos: {
          id_curp: "JKL012345RST",
          nombre: "Luis Castro",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400769",
        datos: {
          id_curp: "LMN345678UVW",
          nombre: "Carolina Peña",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400772",
        datos: {
          id_curp: "UVW789012DEF",
          nombre: "Oscar García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400774",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Andrés Contreras",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 21,
  },
  {
    id: 12,
    docente: {
      id_rfc: "WXYZ123456ABC",
      datos: {
        nombre: "Pedro Sánchez Ramírez",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 2,
      edificio: "Edificio B",
      descripcion_equipamiento:
        "Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.",
    },
    materia: {
      id: 12,
      datos: {
        nombre: "Computación en la Nube",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.",
      },
      planDeEstudios:
        "Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.",
    },
    alumnos: [
      {
        nctrl: "20400748",
        datos: {
          id_curp: "ABC123456XYZ",
          nombre: "Carlos Gómez Ramírez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400749",
        datos: {
          id_curp: "DEF789012JKL",
          nombre: "Ana María Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400750",
        datos: {
          id_curp: "GHI345678OPQ",
          nombre: "José Luis Hernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400751",
        datos: {
          id_curp: "JKL012345STU",
          nombre: "Laura Martínez Fernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400755",
        datos: {
          id_curp: "VWX234567FGH",
          nombre: "Sofía García López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400759",
        datos: {
          id_curp: "IJK012345RST",
          nombre: "Gabriela González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400760",
        datos: {
          id_curp: "LMN678901UVW",
          nombre: "Roberto Medina",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400761",
        datos: {
          id_curp: "OPQ345678XYZ",
          nombre: "Lucía Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400762",
        datos: {
          id_curp: "RST901234ABC",
          nombre: "Héctor Mendoza",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400764",
        datos: {
          id_curp: "XYZ234567GHI",
          nombre: "Jorge Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400765",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Patricia Álvarez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400767",
        datos: {
          id_curp: "GHI567890OPQ",
          nombre: "Natalia Flores",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400768",
        datos: {
          id_curp: "JKL012345RST",
          nombre: "Luis Castro",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400775",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Camila Ramos",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 7,
  },
  {
    id: 13,
    docente: {
      id_rfc: "TUVW567890XYZ",
      datos: {
        nombre: "Laura Martínez Fernández",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 1,
      edificio: "Edificio A",
      descripcion_equipamiento:
        "Proyector, computadora, pizarra digital, sillas cómodas y aire acondicionado.",
    },
    materia: {
      id: 12,
      datos: {
        nombre: "Computación en la Nube",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.",
      },
      planDeEstudios:
        "Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.",
    },
    alumnos: [
      {
        nctrl: "20400752",
        datos: {
          id_curp: "MNO456789VWX",
          nombre: "Pedro Sánchez García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400753",
        datos: {
          id_curp: "PQR678901YZA",
          nombre: "María del Carmen Rodríguez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400754",
        datos: {
          id_curp: "STU901234BCD",
          nombre: "Luis Antonio Méndez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400756",
        datos: {
          id_curp: "YZA678901IJK",
          nombre: "Daniel Ortega Rivera",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400762",
        datos: {
          id_curp: "RST901234ABC",
          nombre: "Héctor Mendoza",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400766",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Miguel Sánchez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400769",
        datos: {
          id_curp: "LMN345678UVW",
          nombre: "Carolina Peña",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400772",
        datos: {
          id_curp: "UVW789012DEF",
          nombre: "Oscar García",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400774",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Andrés Contreras",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 15,
  },
  {
    id: 14,
    docente: {
      id_rfc: "MNOP345678QRS",
      datos: {
        nombre: "José Luis Morales",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 2,
      edificio: "Edificio B",
      descripcion_equipamiento:
        "Pantalla inteligente, sistema de sonido, mesas modulares y pizarra tradicional.",
    },
    materia: {
      id: 11,
      datos: {
        nombre: "Desarrollo de Software",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.",
      },
      planDeEstudios:
        "Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.",
    },
    alumnos: [
      {
        nctrl: "20400748",
        datos: {
          id_curp: "ABC123456XYZ",
          nombre: "Carlos Gómez Ramírez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400751",
        datos: {
          id_curp: "JKL012345STU",
          nombre: "Laura Martínez Fernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400755",
        datos: {
          id_curp: "VWX234567FGH",
          nombre: "Sofía García López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400756",
        datos: {
          id_curp: "YZA678901IJK",
          nombre: "Daniel Ortega Rivera",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400758",
        datos: {
          id_curp: "FGH789012OPQ",
          nombre: "Carlos Delgado",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400759",
        datos: {
          id_curp: "IJK012345RST",
          nombre: "Gabriela González",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400762",
        datos: {
          id_curp: "RST901234ABC",
          nombre: "Héctor Mendoza",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400763",
        datos: {
          id_curp: "UVW567890DEF",
          nombre: "Alicia Reyes",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400764",
        datos: {
          id_curp: "XYZ234567GHI",
          nombre: "Jorge Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400770",
        datos: {
          id_curp: "OPQ789012XYZ",
          nombre: "Juan Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400771",
        datos: {
          id_curp: "RST123456ABC",
          nombre: "Ximena López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400773",
        datos: {
          id_curp: "XYZ567890GHI",
          nombre: "Laura Díaz",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400775",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Camila Ramos",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 10,
  },
  {
    id: 15,
    docente: {
      id_rfc: "WXYZ123456ABC",
      datos: {
        nombre: "Pedro Sánchez Ramírez",
        carrera: "Ingeniería en Sistemas Computacionales",
        tecnologico: "Instituto Tecnológico de Tepic",
      },
    },
    aula: {
      id_aula: 3,
      edificio: "Edificio C",
      descripcion_equipamiento:
        "Computadoras de última generación, escritorios ergonómicos y proyector.",
    },
    materia: {
      id: 10,
      datos: {
        nombre: "Seguridad Informática",
        carrera: "Ingeniería en Sistemas Computacionales",
        descripcion:
          "Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.",
      },
      planDeEstudios:
        "Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.",
    },
    alumnos: [
      {
        nctrl: "20400749",
        datos: {
          id_curp: "DEF789012JKL",
          nombre: "Ana María Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400751",
        datos: {
          id_curp: "JKL012345STU",
          nombre: "Laura Martínez Fernández",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400753",
        datos: {
          id_curp: "PQR678901YZA",
          nombre: "María del Carmen Rodríguez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400754",
        datos: {
          id_curp: "STU901234BCD",
          nombre: "Luis Antonio Méndez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400761",
        datos: {
          id_curp: "OPQ345678XYZ",
          nombre: "Lucía Pérez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400763",
        datos: {
          id_curp: "UVW567890DEF",
          nombre: "Alicia Reyes",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400764",
        datos: {
          id_curp: "XYZ234567GHI",
          nombre: "Jorge Torres",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400766",
        datos: {
          id_curp: "DEF345678LMN",
          nombre: "Miguel Sánchez",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400768",
        datos: {
          id_curp: "JKL012345RST",
          nombre: "Luis Castro",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400769",
        datos: {
          id_curp: "LMN345678UVW",
          nombre: "Carolina Peña",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400771",
        datos: {
          id_curp: "RST123456ABC",
          nombre: "Ximena López",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400773",
        datos: {
          id_curp: "XYZ567890GHI",
          nombre: "Laura Díaz",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
      {
        nctrl: "20400774",
        datos: {
          id_curp: "ABC901234JKL",
          nombre: "Andrés Contreras",
          carrera: "Ingeniería en Sistemas Computacionales",
          tecnologico: "Instituto Tecnológico de Tepic",
        },
      },
    ],
    horario: 21,
  },
];

db.grupo.insertMany(grupos);

const alumnos = [
  {
    nctrl: "20400748",
    datos: {
      id_curp: "ABC123456XYZ",
      nombre: "Carlos Gómez Ramírez",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 2, calificacion: 78 },
        { grupo: 3, calificacion: 70 },
        { grupo: 5, calificacion: 80 },
        { grupo: 7, calificacion: 93 },
        { grupo: 8, calificacion: 71 },
        { grupo: 10, calificacion: 95 },
        { grupo: 12, calificacion: 98 },
        { grupo: 14, calificacion: 81 },
      ],
    },
  },
  {
    nctrl: "20400749",
    datos: {
      id_curp: "DEF789012JKL",
      nombre: "Ana María Torres",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 100 },
        { grupo: 3, calificacion: 97 },
        { grupo: 6, calificacion: 91 },
        { grupo: 11, calificacion: 100 },
        { grupo: 12, calificacion: 68 },
        { grupo: 15, calificacion: 70 },
      ],
    },
  },
  {
    nctrl: "20400750",
    datos: {
      id_curp: "GHI345678OPQ",
      nombre: "José Luis Hernández",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 91 },
        { grupo: 2, calificacion: 80 },
        { grupo: 6, calificacion: 71 },
        { grupo: 7, calificacion: 76 },
        { grupo: 8, calificacion: 96 },
        { grupo: 10, calificacion: 85 },
        { grupo: 11, calificacion: 67 },
        { grupo: 12, calificacion: 86 },
      ],
    },
  },
  {
    nctrl: "20400751",
    datos: {
      id_curp: "JKL012345STU",
      nombre: "Laura Martínez Fernández",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 2, calificacion: 74 },
        { grupo: 4, calificacion: 68 },
        { grupo: 6, calificacion: 90 },
        { grupo: 8, calificacion: 99 },
        { grupo: 12, calificacion: 99 },
        { grupo: 14, calificacion: 88 },
        { grupo: 15, calificacion: 75 },
      ],
    },
  },
  {
    nctrl: "20400752",
    datos: {
      id_curp: "MNO456789VWX",
      nombre: "Pedro Sánchez García",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 72 },
        { grupo: 3, calificacion: 96 },
        { grupo: 4, calificacion: 68 },
        { grupo: 10, calificacion: 68 },
        { grupo: 13, calificacion: 76 },
      ],
    },
  },
  {
    nctrl: "20400753",
    datos: {
      id_curp: "PQR678901YZA",
      nombre: "María del Carmen Rodríguez",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 82 },
        { grupo: 3, calificacion: 67 },
        { grupo: 4, calificacion: 81 },
        { grupo: 5, calificacion: 68 },
        { grupo: 7, calificacion: 96 },
        { grupo: 13, calificacion: 74 },
        { grupo: 15, calificacion: 66 },
      ],
    },
  },
  {
    nctrl: "20400754",
    datos: {
      id_curp: "STU901234BCD",
      nombre: "Luis Antonio Méndez",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 2, calificacion: 92 },
        { grupo: 3, calificacion: 85 },
        { grupo: 5, calificacion: 89 },
        { grupo: 11, calificacion: 99 },
        { grupo: 13, calificacion: 90 },
        { grupo: 15, calificacion: 81 },
      ],
    },
  },
  {
    nctrl: "20400755",
    datos: {
      id_curp: "VWX234567FGH",
      nombre: "Sofía García López",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 2, calificacion: 71 },
        { grupo: 4, calificacion: 91 },
        { grupo: 5, calificacion: 88 },
        { grupo: 6, calificacion: 96 },
        { grupo: 7, calificacion: 67 },
        { grupo: 8, calificacion: 88 },
        { grupo: 10, calificacion: 97 },
        { grupo: 12, calificacion: 76 },
        { grupo: 14, calificacion: 97 },
      ],
    },
  },
  {
    nctrl: "20400756",
    datos: {
      id_curp: "YZA678901IJK",
      nombre: "Daniel Ortega Rivera",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 69 },
        { grupo: 2, calificacion: 82 },
        { grupo: 6, calificacion: 66 },
        { grupo: 8, calificacion: 99 },
        { grupo: 9, calificacion: 69 },
        { grupo: 10, calificacion: 96 },
        { grupo: 13, calificacion: 76 },
        { grupo: 14, calificacion: 94 },
      ],
    },
  },
  {
    nctrl: "20400757",
    datos: {
      id_curp: "BCD345678LMN",
      nombre: "Fernanda Rivas González",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 2, calificacion: 79 },
        { grupo: 5, calificacion: 86 },
        { grupo: 10, calificacion: 77 },
        { grupo: 11, calificacion: 82 },
      ],
    },
  },
  {
    nctrl: "20400758",
    datos: {
      id_curp: "FGH789012OPQ",
      nombre: "Carlos Delgado",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 81 },
        { grupo: 4, calificacion: 80 },
        { grupo: 5, calificacion: 76 },
        { grupo: 6, calificacion: 82 },
        { grupo: 7, calificacion: 67 },
        { grupo: 9, calificacion: 90 },
        { grupo: 14, calificacion: 89 },
      ],
    },
  },
  {
    nctrl: "20400759",
    datos: {
      id_curp: "IJK012345RST",
      nombre: "Gabriela González",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 2, calificacion: 91 },
        { grupo: 3, calificacion: 98 },
        { grupo: 6, calificacion: 83 },
        { grupo: 9, calificacion: 82 },
        { grupo: 12, calificacion: 92 },
        { grupo: 14, calificacion: 84 },
      ],
    },
  },
  {
    nctrl: "20400760",
    datos: {
      id_curp: "LMN678901UVW",
      nombre: "Roberto Medina",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 4, calificacion: 67 },
        { grupo: 6, calificacion: 84 },
        { grupo: 7, calificacion: 71 },
        { grupo: 8, calificacion: 97 },
        { grupo: 10, calificacion: 70 },
        { grupo: 12, calificacion: 66 },
      ],
    },
  },
  {
    nctrl: "20400761",
    datos: {
      id_curp: "OPQ345678XYZ",
      nombre: "Lucía Pérez",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 2, calificacion: 76 },
        { grupo: 4, calificacion: 98 },
        { grupo: 5, calificacion: 79 },
        { grupo: 9, calificacion: 75 },
        { grupo: 12, calificacion: 67 },
        { grupo: 15, calificacion: 75 },
      ],
    },
  },
  {
    nctrl: "20400762",
    datos: {
      id_curp: "RST901234ABC",
      nombre: "Héctor Mendoza",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 85 },
        { grupo: 2, calificacion: 100 },
        { grupo: 4, calificacion: 97 },
        { grupo: 7, calificacion: 73 },
        { grupo: 12, calificacion: 66 },
        { grupo: 13, calificacion: 86 },
        { grupo: 14, calificacion: 77 },
      ],
    },
  },
  {
    nctrl: "20400763",
    datos: {
      id_curp: "UVW567890DEF",
      nombre: "Alicia Reyes",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 3, calificacion: 86 },
        { grupo: 5, calificacion: 98 },
        { grupo: 6, calificacion: 91 },
        { grupo: 7, calificacion: 98 },
        { grupo: 10, calificacion: 90 },
        { grupo: 11, calificacion: 72 },
        { grupo: 14, calificacion: 76 },
        { grupo: 15, calificacion: 68 },
      ],
    },
  },
  {
    nctrl: "20400764",
    datos: {
      id_curp: "XYZ234567GHI",
      nombre: "Jorge Torres",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 2, calificacion: 85 },
        { grupo: 4, calificacion: 79 },
        { grupo: 5, calificacion: 69 },
        { grupo: 9, calificacion: 95 },
        { grupo: 10, calificacion: 80 },
        { grupo: 11, calificacion: 79 },
        { grupo: 12, calificacion: 75 },
        { grupo: 14, calificacion: 68 },
        { grupo: 15, calificacion: 82 },
      ],
    },
  },
  {
    nctrl: "20400765",
    datos: {
      id_curp: "ABC901234JKL",
      nombre: "Patricia Álvarez",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 78 },
        { grupo: 8, calificacion: 72 },
        { grupo: 10, calificacion: 92 },
        { grupo: 11, calificacion: 78 },
        { grupo: 12, calificacion: 75 },
      ],
    },
  },
  {
    nctrl: "20400766",
    datos: {
      id_curp: "DEF345678LMN",
      nombre: "Miguel Sánchez",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 5, calificacion: 71 },
        { grupo: 6, calificacion: 79 },
        { grupo: 7, calificacion: 72 },
        { grupo: 13, calificacion: 100 },
        { grupo: 15, calificacion: 95 },
      ],
    },
  },
  {
    nctrl: "20400767",
    datos: {
      id_curp: "GHI567890OPQ",
      nombre: "Natalia Flores",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 96 },
        { grupo: 4, calificacion: 81 },
        { grupo: 8, calificacion: 80 },
        { grupo: 9, calificacion: 96 },
        { grupo: 10, calificacion: 82 },
        { grupo: 12, calificacion: 88 },
      ],
    },
  },
  {
    nctrl: "20400768",
    datos: {
      id_curp: "JKL012345RST",
      nombre: "Luis Castro",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 71 },
        { grupo: 4, calificacion: 74 },
        { grupo: 7, calificacion: 91 },
        { grupo: 8, calificacion: 100 },
        { grupo: 9, calificacion: 68 },
        { grupo: 11, calificacion: 93 },
        { grupo: 12, calificacion: 78 },
        { grupo: 15, calificacion: 93 },
      ],
    },
  },
  {
    nctrl: "20400769",
    datos: {
      id_curp: "LMN345678UVW",
      nombre: "Carolina Peña",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 3, calificacion: 72 },
        { grupo: 4, calificacion: 67 },
        { grupo: 6, calificacion: 96 },
        { grupo: 8, calificacion: 98 },
        { grupo: 11, calificacion: 80 },
        { grupo: 13, calificacion: 70 },
        { grupo: 15, calificacion: 76 },
      ],
    },
  },
  {
    nctrl: "20400770",
    datos: {
      id_curp: "OPQ789012XYZ",
      nombre: "Juan Pérez",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 80 },
        { grupo: 3, calificacion: 75 },
        { grupo: 4, calificacion: 80 },
        { grupo: 5, calificacion: 96 },
        { grupo: 6, calificacion: 98 },
        { grupo: 10, calificacion: 75 },
        { grupo: 14, calificacion: 88 },
      ],
    },
  },
  {
    nctrl: "20400771",
    datos: {
      id_curp: "RST123456ABC",
      nombre: "Ximena López",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 77 },
        { grupo: 2, calificacion: 67 },
        { grupo: 7, calificacion: 78 },
        { grupo: 9, calificacion: 71 },
        { grupo: 14, calificacion: 75 },
        { grupo: 15, calificacion: 71 },
      ],
    },
  },
  {
    nctrl: "20400772",
    datos: {
      id_curp: "UVW789012DEF",
      nombre: "Oscar García",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 6, calificacion: 70 },
        { grupo: 7, calificacion: 81 },
        { grupo: 8, calificacion: 84 },
        { grupo: 9, calificacion: 70 },
        { grupo: 10, calificacion: 91 },
        { grupo: 11, calificacion: 66 },
        { grupo: 13, calificacion: 73 },
      ],
    },
  },
  {
    nctrl: "20400773",
    datos: {
      id_curp: "XYZ567890GHI",
      nombre: "Laura Díaz",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 4, calificacion: 90 },
        { grupo: 5, calificacion: 79 },
        { grupo: 6, calificacion: 66 },
        { grupo: 7, calificacion: 93 },
        { grupo: 8, calificacion: 89 },
        { grupo: 14, calificacion: 82 },
        { grupo: 15, calificacion: 95 },
      ],
    },
  },
  {
    nctrl: "20400774",
    datos: {
      id_curp: "ABC901234JKL",
      nombre: "Andrés Contreras",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    expediente_academico: {
      reticula: [],
      grupos_cursados: [
        { grupo: 1, calificacion: 74 },
        { grupo: 2, calificacion: 76 },
        { grupo: 3, calificacion: 69 },
        { grupo: 8, calificacion: 88 },
        { grupo: 9, calificacion: 73 },
        { grupo: 11, calificacion: 97 },
        { grupo: 13, calificacion: 73 },
        { grupo: 15, calificacion: 69 },
      ],
    },
  },
  {
    nctrl: "20400775",
    datos: {
      id_curp: "DEF345678LMN",
      nombre: "Camila Ramos",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
      expediente_academico: {
        reticula: [],
        grupos_cursados: [
          { grupo: 1, calificacion: 68 },
          { grupo: 3, calificacion: 86 },
          { grupo: 5, calificacion: 98 },
          { grupo: 9, calificacion: 82 },
          { grupo: 12, calificacion: 96 },
          { grupo: 14, calificacion: 70 },
        ],
      },
    },
  },
];

db.alumno.insertMany(alumnos);

const materias = [
  {
    id: 1,
    datos: {
      nombre: "NOSQL",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.",
    },
    planDeEstudios:
      "Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.",
  },
  {
    id: 2,
    datos: {
      nombre: "Programación Web",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.",
    },
    planDeEstudios:
      "Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.",
  },
  {
    id: 3,
    datos: {
      nombre: "Inteligencia Artificial",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.",
    },
    planDeEstudios:
      "Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.",
  },
  {
    id: 4,
    datos: {
      nombre: "Sistemas Operativos",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.",
    },
    planDeEstudios:
      "Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.",
  },
  {
    id: 5,
    datos: {
      nombre: "Redes de Computadoras",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.",
    },
    planDeEstudios:
      "Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.",
  },
  {
    id: 6,
    datos: {
      nombre: "Estructuras de Datos",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.",
    },
    planDeEstudios:
      "Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.",
  },
  {
    id: 7,
    datos: {
      nombre: "Arquitectura de Computadoras",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.",
    },
    planDeEstudios:
      "Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.",
  },
  {
    id: 8,
    datos: {
      nombre: "Algoritmos Avanzados",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.",
    },
    planDeEstudios:
      "Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.",
  },
  {
    id: 9,
    datos: {
      nombre: "Bases de Datos",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.",
    },
    planDeEstudios:
      "Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.",
  },
  {
    id: 10,
    datos: {
      nombre: "Seguridad Informática",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.",
    },
    planDeEstudios:
      "Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.",
  },
  {
    id: 11,
    datos: {
      nombre: "Desarrollo de Software",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.",
    },
    planDeEstudios:
      "Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.",
  },
  {
    id: 12,
    datos: {
      nombre: "Computación en la Nube",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.",
    },
    planDeEstudios:
      "Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.",
  },
];

db.alumno.updateMany(
  {},
  {
    $set: {
      "expediente_academico.reticula": materias,
    },
  }
);

const docentes = [
  {
    id_rfc: "ABCD123456EFG",
    datos: {
      nombre: "Juan Carlos Hernández García",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    materias_impartidas: [
      {
        id: 2,
        datos: {
          nombre: "Programación Web",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.",
        },
        planDeEstudios:
          "Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.",
      },
      {
        id: 10,
        datos: {
          nombre: "Seguridad Informática",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.",
        },
        planDeEstudios:
          "Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.",
      },
      {
        id: 4,
        datos: {
          nombre: "Sistemas Operativos",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.",
        },
        planDeEstudios:
          "Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.",
      },
      {
        id: 8,
        datos: {
          nombre: "Algoritmos Avanzados",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.",
        },
        planDeEstudios:
          "Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.",
      },
    ],
  },
  {
    id_rfc: "EFGH789012JKL",
    datos: {
      nombre: "Ana María Gómez Torres",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    materias_impartidas: [
      {
        id: 7,
        datos: {
          nombre: "Arquitectura de Computadoras",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.",
        },
        planDeEstudios:
          "Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.",
      },
      {
        id: 3,
        datos: {
          nombre: "Inteligencia Artificial",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.",
        },
        planDeEstudios:
          "Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.",
      },
      {
        id: 6,
        datos: {
          nombre: "Estructuras de Datos",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.",
        },
        planDeEstudios:
          "Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.",
      },
      {
        id: 5,
        datos: {
          nombre: "Redes de Computadoras",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.",
        },
        planDeEstudios:
          "Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.",
      },
    ],
  },
  {
    id_rfc: "MNOP345678QRS",
    datos: {
      nombre: "José Luis Morales",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    materias_impartidas: [
      {
        id: 9,
        datos: {
          nombre: "Bases de Datos",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.",
        },
        planDeEstudios:
          "Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.",
      },
      {
        id: 12,
        datos: {
          nombre: "Computación en la Nube",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.",
        },
        planDeEstudios:
          "Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.",
      },
    ],
  },
  {
    id_rfc: "TUVW567890XYZ",
    datos: {
      nombre: "Laura Martínez Fernández",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    materias_impartidas: [
      // {"id": 11,"datos": {"nombre": "Desarrollo de Software","carrera": "Ingeniería en Sistemas Computacionales","descripcion": "Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos."},"planDeEstudios": "Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación."}
      {
        id: 11,
        datos: {
          nombre: "Desarrollo de Software",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.",
        },
        planDeEstudios:
          "Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.",
      },
      {
        id: 9,
        datos: {
          nombre: "Bases de Datos",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.",
        },
        planDeEstudios:
          "Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.",
      },
      {
        id: 12,
        datos: {
          nombre: "Computación en la Nube",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.",
        },
        planDeEstudios:
          "Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.",
      },
    ],
  },
  {
    id_rfc: "WXYZ123456ABC",
    datos: {
      nombre: "Pedro Sánchez Ramírez",
      carrera: "Ingeniería en Sistemas Computacionales",
      tecnologico: "Instituto Tecnológico de Tepic",
    },
    materias_impartidas: [
      // {"id": 1,"datos": {"nombre": "NOSQL","carrera": "Ingeniería en Sistemas Computacionales","descripcion": "Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación."},"planDeEstudios": "Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas."}
      {
        id: 1,
        datos: {
          nombre: "NOSQL",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.",
        },
        planDeEstudios:
          "Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.",
      },
      {
        id: 9,
        datos: {
          nombre: "Bases de Datos",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.",
        },
        planDeEstudios:
          "Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.",
      },
      {
        id: 12,
        datos: {
          nombre: "Computación en la Nube",
          carrera: "Ingeniería en Sistemas Computacionales",
          descripcion:
            "Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.",
        },
        planDeEstudios:
          "Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.",
      },
    ],
  },
];

db.docente.insertMany(docentes);

const materias = [
  {
    id: 1,
    datos: {
      nombre: "NOSQL",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia en la que se aborda el estilo de modelado y consultas, así como los entornos más comunes en el mercado de los NOSQL y su integración con los entornos de programación.",
    },
    planDeEstudios:
      "Introducción a bases de datos NoSQL, tipos de bases de datos, modelado, consultas, entornos comunes y aplicaciones prácticas.",
  },
  {
    id: 2,
    datos: {
      nombre: "Programación Web",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que cubre conceptos y técnicas de programación para la creación de sitios web, incluyendo HTML, CSS, JavaScript y frameworks modernos.",
    },
    planDeEstudios:
      "Desarrollo de aplicaciones web, HTML, CSS, JavaScript, frameworks, bases de datos, buenas prácticas de diseño y usabilidad.",
  },
  {
    id: 3,
    datos: {
      nombre: "Inteligencia Artificial",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Estudio de técnicas y algoritmos de inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y aplicaciones prácticas.",
    },
    planDeEstudios:
      "Introducción a la inteligencia artificial, machine learning, deep learning, procesamiento de lenguaje natural, visión por computadora y ética en IA.",
  },
  {
    id: 4,
    datos: {
      nombre: "Sistemas Operativos",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que estudia el diseño, funcionamiento y gestión de sistemas operativos, incluyendo conceptos como procesos, memoria y gestión de dispositivos.",
    },
    planDeEstudios:
      "Fundamentos de sistemas operativos, procesos, hilos, memoria, almacenamiento, sistemas de archivos, seguridad y administración.",
  },
  {
    id: 5,
    datos: {
      nombre: "Redes de Computadoras",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que explora el diseño y funcionamiento de redes de computadoras, protocolos de comunicación y tecnologías de red modernas.",
    },
    planDeEstudios:
      "Introducción a redes de computadoras, topologías, protocolos, TCP/IP, seguridad en redes, tecnologías inalámbricas y redes de área local y amplia.",
  },
  {
    id: 6,
    datos: {
      nombre: "Estructuras de Datos",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Estudio de estructuras de datos como listas, pilas, colas, árboles y grafos, y su aplicación en la solución de problemas de programación.",
    },
    planDeEstudios:
      "Introducción a estructuras de datos, listas, pilas, colas, árboles, grafos, algoritmos de búsqueda y ordenamiento.",
  },
  {
    id: 7,
    datos: {
      nombre: "Arquitectura de Computadoras",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que estudia la arquitectura de los sistemas computacionales, incluyendo conceptos de hardware y software y su interacción.",
    },
    planDeEstudios:
      "Introducción a arquitectura de computadoras, componentes de hardware, instrucciones de CPU, ensamblador, rendimiento y optimización.",
  },
  {
    id: 8,
    datos: {
      nombre: "Algoritmos Avanzados",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que cubre técnicas y estrategias avanzadas de algoritmia, incluyendo diseño y análisis de algoritmos eficientes para la solución de problemas.",
    },
    planDeEstudios:
      "Introducción a algoritmos avanzados, paradigmas de diseño, análisis de complejidad, algoritmos de búsqueda, ordenamiento y optimización.",
  },
  {
    id: 9,
    datos: {
      nombre: "Bases de Datos",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Estudio de conceptos y técnicas relacionadas con bases de datos, incluyendo modelado, diseño, consultas y administración.",
    },
    planDeEstudios:
      "Introducción a bases de datos, modelado de datos, lenguaje SQL, diseño y administración de bases de datos, transacciones y concurrencia.",
  },
  {
    id: 10,
    datos: {
      nombre: "Seguridad Informática",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que trata sobre los conceptos y técnicas de seguridad informática, incluyendo criptografía, autenticación y protección contra amenazas.",
    },
    planDeEstudios:
      "Introducción a seguridad informática, criptografía, autenticación, firewalls, detección de intrusos y protección de sistemas y redes.",
  },
  {
    id: 11,
    datos: {
      nombre: "Desarrollo de Software",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que cubre principios y técnicas para el desarrollo de software, incluyendo metodologías ágiles, diseño de software y gestión de proyectos.",
    },
    planDeEstudios:
      "Introducción al desarrollo de software, metodologías ágiles, diseño de software, pruebas, gestión de proyectos y documentación.",
  },
  {
    id: 12,
    datos: {
      nombre: "Computación en la Nube",
      carrera: "Ingeniería en Sistemas Computacionales",
      descripcion:
        "Materia que cubre conceptos y tecnologías de computación en la nube, incluyendo servicios en la nube, infraestructura y aplicaciones prácticas.",
    },
    planDeEstudios:
      "Introducción a computación en la nube, servicios en la nube, plataformas y modelos de despliegue, seguridad en la nube y aplicaciones prácticas.",
  },
];

db.materia.insertMany(materias);
```

### Q1. Listar las materias que un alumno ha cursado.

```javascript
use("escenario");
/*Q1. Listar las materias que un alumno ha cursado.*/
db.alumno.aggregate([
  { $match: { nctrl: "20400748" } },
  { $unwind: "$expediente_academico.grupos_cursados" },
  {
    $lookup: {
      from: "grupo",
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
```

### Q2. Listar los alumnos que están cursando una materia específica de un grupo específico.

```javascript
use("escenario");
/*Q2. Listar los alumnos que están cursando una materia específica de un grupo específico.*/
db.grupo.findOne({ id: 1 }, { materia: 1, alumnos: 1 });
```

### Q3. Listar las calificaciones de un alumno en todas sus materias cursadas.

```javascript
use("escenario");
/*Q3. Listar las calificaciones de un alumno en todas sus materias cursadas. */
db.alumno.aggregate([
  { $match: { nctrl: "20400748" } },
  { $unwind: "$expediente_academico.grupos_cursados" },
  {
    $lookup: {
      from: "grupo",
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
```

### Q4. Listar los docentes que imparten una materia específica.

```javascript
use("escenario");
/*Q4. Listar los docentes que imparten una materia específica.*/
db.docente.aggregate([
  { $unwind: "$materias_impartidas" },
  {
    $match: {
      "materias_impartidas.id": 12,
    },
  },
  {
    $group: {
      _id: "$materias_impartidas.id",
      materia: { $first: "$materias_impartidas" },
      docentes: { $push: "$datos" },
    },
  },
]);
```

### Q5. Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica.

```javascript
use("escenario");
/*Q5. Listar los alumnos que han obtenido una calificación superior a 90 en una materia específica*/
db.alumno.aggregate([
  { $unwind: "$expediente_academico.grupos_cursados" },
  {
    $lookup: {
      from: "grupo",
      localField: "expediente_academico.grupos_cursados.grupo",
      foreignField: "id",
      as: "expediente_academico.grupos_cursados.grupo",
    },
  },
  { $unwind: "$expediente_academico.grupos_cursados.grupo" },
  { $match: { "expediente_academico.grupos_cursados.grupo.materia.id": 10 } },
  {
    $match: {
      "expediente_academico.grupos_cursados.calificacion": { $gt: 90 },
    },
  },
  {
    $group: {
      _id: "$nctrl",
      alumno: { $first: "$datos" },
      grupos: {
        $push: {
          materia: "$expediente_academico.grupos_cursados.grupo.materia",
          calificacion: "$expediente_academico.grupos_cursados.calificacion",
        },
      },
    },
  },
]);
```

### Q6. Listar los grupos que correspondan a una materia específica.

```javascript
use("escenario");
/*Q6.Listar los grupos que correspondan a una materia específica.*/
db.grupo.find({ "materia.id": 12 }, {});
```

### Q7. Listar las materias que cursa un alumno en específico (horario).

```javascript
use("escenario");
/*Q7.Listar las materias que cursa un alumno en específico(horario).*/
db.alumno.aggregate([
  { $match: { nctrl: "20400749" } },
  { $unwind: "$expediente_academico.grupos_cursados" },
  {
    $lookup: {
      from: "grupo",
      localField: "expediente_academico.grupos_cursados.grupo",
      foreignField: "id",
      as: "expediente_academico.grupos_cursados.grupo",
    },
  },
  { $unwind: "$expediente_academico.grupos_cursados.grupo" },
  { $match: { "expediente_academico.grupos_cursados.grupo.horario": 21 } },
  {
    $group: {
      _id: "$nctrl",
      alumno: { $first: "$datos" },
      materias: {
        $push: "$expediente_academico.grupos_cursados.grupo",
      },
    },
  },
  {
    $project: {
      "materias.alumnos": 0,
      "materias._id": 0,
      "materias.id": 0,
    },
  },
]);
```

### Q8. Listar las materias que faltan por cursar a un alumno en específico.

```javascript
use("escenario");
/*Q8.Listar las materias que faltan por cursar a un alumno en específico.*/
db.alumno.aggregate([
  { $match: { nctrl: "20400750" } },
  { $unwind: "$expediente_academico.grupos_cursados" },
  {
    $lookup: {
      from: "grupo",
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
      reticula: { $first: "$expediente_academico.reticula" },
    },
  },
  {
    $project: {
      _id: 1,
      alumno: 1,
      materiasPorCursar: { $setDifference: ["$reticula", "$materias"] },
    },
  },
]);
```

### Q9. Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias.

```javascript
use("escenario");
/*Q9.Listar las materias que imparte un docente en específico, junto con los alumnos que cursan cada una de las materias.*/
db.grupo.aggregate([
  {
    $match: {
      "docente.id_rfc": "ABCD123456EFG",
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
]);
```