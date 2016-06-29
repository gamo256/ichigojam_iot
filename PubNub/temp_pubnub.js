var publishKey = '<your Publish Key>';
var subscribeKey = '<your Subscribe Key>';

var channel = "<Channel Name>"; // channel名の設定


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
                publish_key : publishKey,
                subscribe_key : subscribeKey
              });

port.on("data", function(data) {
  // 取得データはbufferオブジェクトなので「toString」で文字列に変換
  var reading = data.toString();
  // データ加工
  voltage = reading * 3.3 / 1024;
  temperatureC = (voltage - 0.5) * 100
  console.log(temperatureC);
  // パブリッシュ(送信)するデータを変数dataに格納
  var data = {eon:{'temperature' : temperatureC}};
  // データのパブリッシュ(送信)
  pubnub.publish({
    channel : channel,
    message : data,
    callback : function(message) {
      console.log(message);
    }
  });
});
