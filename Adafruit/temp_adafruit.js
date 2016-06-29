// シリアルポートの設定
var serialport = require('serialport');
var port = new serialport.SerialPort(
             'COM31', {            // COMポート
                baudrate: 115200,  // ボーレート
                parser: serialport.parsers.readline('\n') // 区切り文字
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
  port.on('data', function (data) {
    // 取得データはbufferオブジェクトなので「toString」で文字列に変換
    var reading = data.toString();
    // データ加工
    voltage = reading * 3.3 / 1024;
    temperatureC = (voltage - 0.5) * 100
    console.log(temperatureC);
    // トピック名を「<user name>/feeds/<feed name>」の形式で指定する
    // 送信データは文字列型に変換する必要がある
    client.publish('<トピック名>',String(temperatureC));
   })
});