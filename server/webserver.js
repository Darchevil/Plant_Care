var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)

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
  var isArrosed = new Boolean(false); //static variable for current status

  socket.emit('news', {hello:'world'}); // Avec emit, le serveur ENVOIE des données sur ce "canal d'événement" appelé 'news'

  socket.on('event', function(data) { //Ici socket.on permet au serveur de recevoir des données sur un canal 'event'
    console.log(data); //affichage des données reçues du client
  })
  
  socket.on('buttonAlert', function(data) { //Lorsque le serveur reçoit l'événement buttonAlert
    console.log(data);
    var state = JSON.stringify(data);
    console.log("state : " + state);
    isArrosed = data; //Il recçoit la donnée data depuis le client
    if (isArrosed == true) { //Si le bouton a été cliqué,
      console.log("Plante arrosée"); // affichage résultat
    }
  });
  
});
