import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';

class AddingPlant extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("New Plant"),
        backgroundColor: Colors.purple[200],
      ),
      floatingActionButton: Align(
        alignment: Alignment.bottomLeft,
        child: RaisedButton(
          onPressed: () {
            Navigator.pop(context);
            // Navigate back to first route when tapped.
          },
          child: Text('Back!'),
          color: Colors.purple[200],
        ),
      ),
      body: Center(
        child: Text("Page to add plant..."),
      ),
      backgroundColor: Colors.white,
    );
  }
}