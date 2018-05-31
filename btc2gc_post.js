var bitflyer = require('bitflyer-node');
var streaming = new bitflyer.Streaming();
var webclient = require("request");


    function send(msg) {
      webclient.post({
        url: "https://noderedqtest.azurewebsites.net/updownpost",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(msg)
          }, function (error, response, body){
            console.log(body);
          });
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

          price = Number(d.best_bid);
          if (price != prevPrice){
              if (price > prevPrice){
                send({price:"up"});
                console.log("price:up");
              }else{
                send({price:"down"});
                console.log("price:down");
              }
              prevPrice = price;
          }
        }
    });
