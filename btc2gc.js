var bitflyer = require('bitflyer-node');
var streaming = new bitflyer.Streaming();

var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function send(msg) {
        if (connection.connected) {
            connection.sendUTF(msg);
        }
    }
    var prevPrice = 0;
    var price = -1;
    streaming.subscribeTicker(function(err, data) {
        if(err) return console.error(err);

        var d = data;//JSON.parse(data);
        if (d.product_code === 'BTC_JPY'){
    //      console.log(data);

          var f_timestamp = new Date(d.timestamp);
          console.log(f_timestamp);
          console.log(f_timestamp.getTime());
          console.log(d.best_bid); /// これが価格です
          console.log(d.best_bid_size);
          console.log(d.best_ask_size);

          price = int.parse(d.best_bid);
          if (price != prevPrice){
              if (price > prevPrice){
                send("{price:up}");
              }else{
                send("{price:down}");
              }
              prevPrice = price;
          }
        }
    });
});

client.connect('ws://noderedqtest.azurewebsites.net:1880/ws/con');//, 'echo-protocol');
