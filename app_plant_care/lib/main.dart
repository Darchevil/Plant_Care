import 'package:flutter/material.dart';
import 'package:flutterapptest/adding_plant.dart';
import 'fancy_button.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';

class MyScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Plant Care'),
        backgroundColor: Colors.purple[200],
      ),
      body: Center(child: Text('Flutter App')),
      floatingActionButton: SpeedDial(
        animatedIcon: AnimatedIcons.menu_close,
        children: [
          SpeedDialChild(
              child: Icon(Icons.add_circle_outline),
              label: "First Item",
              onTap: () {
                print("You clicked first item");
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => AddingPlant()));
              }
          ),
          SpeedDialChild(
              child: Icon(Icons.add_alert),
              label: "Second Item",
              onTap: () => print("You clicked second item")
          )
        ],
        tooltip: 'Increment Counter',
        child: const Icon(Icons.add),
      ),
    );
  }

  void main() {
    runApp(MaterialApp(
      title: 'My app', // used by the OS task switcher
      home: MyScaffold(),
    ));
  }
}