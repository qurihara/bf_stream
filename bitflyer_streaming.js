var bitflyer = require('bitflyer-node');
var streaming = new bitflyer.Streaming();
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

    }
});
