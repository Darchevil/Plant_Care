var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var shell = require('shelljs'); //Permet d'envoyer des commandes shell
var plugAdress = "e0:e5:cf:1e:9b:05"; //Adresse de la prise.

var Humidite = 0;

http.listen(8080); //listen to port 8080
console.log("listening to port 8080");
function handler (req, res) { //create server
  fs.readFile(__dirname + '/index.html', function(err, data) { //read file index.html 
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}
io.sockets.on('connection', function (socket) {// WebSocket Connection
  var isArrosed; //static variable for current status

  socket.emit('news', {hello:'world'}); // Avec emit, le serveur ENVOIE des données sur ce "canal d'événement" appelé 'news'

  socket.on('event', function(data) { //Ici socket.on permet au serveur de recevoir des données sur un canal 'event'
    console.log(data.welcome); //affichage des données reçues du client

  })

  setTimeout(function(){
    Humidite = Humidite + 1;
    var stringHumidite = Humidite.toString();
    socket.emit('newValue', {value:stringHumidite});
 }, 2000);//wait 2 seconds


  
  socket.on('buttonAlert', function(data) { //Lorsque le serveur reçoit l'événement buttonAlert
    //console.log(data); //affichage de la donnée
    //console.log("Plante arrosée ? " + data.clicked); //On va chercher la donnée située dans le champ JSON "clicked"
    isArrosed = data.clicked; //Il recçoit la donnée data depuis le client
    if (isArrosed == "true") { //Si le bouton a été cliqué,
      shell.exec('sudo smartplugctl ' + plugAdress + ' on');
      setTimeout(function(){
        console.log("Plante arrosée ! "); 
     }, 2000);//wait 2 seconds
      console.log("Arrosage en cours"); // affichage action
      shell.exec('sudo smartplugctl ' + plugAdress + ' off');
    }
  });
  
});
