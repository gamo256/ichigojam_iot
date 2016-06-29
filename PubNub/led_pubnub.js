var publishKey = '<Publish Key>';
var subscribeKey = '<Subscribe Key>';

var channel = "<Channel Name>"; // // channel名の設定

// シリアルポートの設定
var serialport = require('serialport');
var port = new serialport.SerialPort(
             'COM31', {           // COMポート
                baudrate: 115200, // ボーレート
              }
            );

// PubNub初期化
var pubnub = require("pubnub")({
  ssl : true,
  publish_key	: publishKey,
  subscribe_key	: subscribeKey
});

port.on('open', function () {
  // channel購読(データの受信)
  pubnub.subscribe({
    channel  : channel,
    callback : function(message) {
      console.log('>', message);
      if(message.action === 'on') {
        port.write("LED1\r\n");
      } else {
        port.write("LED0\r\n");
      }
    }
  });
});
