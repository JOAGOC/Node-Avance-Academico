import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MaterialApp(home: ConsumirApi(), debugShowCheckedModeBanner: false,));
}

class ConsumirApi extends StatefulWidget {
  const ConsumirApi({super.key});

  @override
  State<ConsumirApi> createState() => ConsumirApiState();
}

class ConsumirApiState extends State<ConsumirApi> {
  Future<List<dynamic>> fetch() async {
    final response = await http
        .get(Uri.parse('http://localhost:3000/api/alumnos/20400757/materias'));
    if (response.statusCode == 200) {
      List<dynamic> posts = json.decode(response.body);
      print(posts);
      return posts;
    } else {
      throw Exception('Fallo al consumir la api: $response');
    }
  }

  @override
  void initState() {
    super.initState();
    fetch();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Consumir una API'),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: fetch(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error: ${snapshot.error}'),
            );
          } else if (snapshot.hasData) {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                final alumno = snapshot.data![0]['alumno'];
                final materias = snapshot.data![0]['materias'];
                return ListView(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  padding: const EdgeInsets.all(16.0),
                  children: [
                    Text(
                      'Alumno: ${alumno['nombre']}',
                      style: const TextStyle(
                          fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    Text('CURP: ${alumno['id_curp']}'),
                    Text('Carrera: ${alumno['carrera']}'),
                    Text('Tecnológico: ${alumno['tecnologico']}'),
                    const SizedBox(height: 20),
                    const Text(
                      'Materias:',
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    ...materias.map<Widget>((materia) {
                      return Card(
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: ListTile(
                            title: Text(materia['datos']['nombre']),
                            subtitle: Text(materia['datos']['descripcion']),
                            isThreeLine: true,
                            contentPadding:
                                const EdgeInsets.symmetric(vertical: 8.0),
                          ),
                        ),
                      );
                    }).toList(),
                  ],
                );
              },
            );
          } else {
            return const Center(
              child: Text('No hay datos'),
            );
          }
        },
      ),
    );
  }
}
