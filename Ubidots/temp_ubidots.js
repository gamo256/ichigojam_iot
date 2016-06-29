// シリアルポートの設定
var serialport = require('serialport');
var port = new serialport.SerialPort(
             'COM31', {            // COMポート
                baudrate: 115200,  // ボーレート
                parser: serialport.parsers.readline('\n') // 区切り文字
              }
            );

// ubidotsクライアントの作成
var ubidots = require('ubidots');
var client = ubidots.createClient('<API Key>');

client.auth(function () {
  this.getDatasources(function (err, data) {
    console.log(data.results);
  });
  // データ保存先のVariableを取得
  var v = this.getVariable('<Variable ID>');

  port.on('data', function (data) {
    // 取得データはbufferオブジェクトなので「toString」で文字列に変換
    var reading = data.toString();
    // データ加工
    voltage = reading * 3.3 / 1024
    temperatureC = (voltage - 0.5) * 100
    console.log(temperatureC);
    v.saveValue(temperatureC); // Variableにデータを保存
   })
});