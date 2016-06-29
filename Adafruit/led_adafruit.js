// シリアルポートの設定
var serialport = require('serialport');
var port = new serialport.SerialPort(
             'COM31', {           // COMポート
                baudrate: 115200, // ボーレート
              }
            );

// MQTTクライアントの作成
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://io.adafruit.com', {
               port:1883,
               username:'<ユーザー名>',
               password:'<APIキー>'
             });

client.on('connect', function () {
  // トピック名を「<user name>/feeds/<feed name>」の形式で指定する
  var feed = '<トピック名>';
  client.subscribe(feed);
  client.publish(feed,'OFF');
});

port.on("open", function() {
  // メッセージの受信
  client.on('message', function (topic, message) {
  console.log(message.toString());
    if(message.toString() === 'ON'){
      port.write("LED1\r\n");
    } else {
      port.write("LED0\r\n");
    }
  });
});