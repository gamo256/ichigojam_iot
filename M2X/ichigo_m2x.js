// シリアルポートの設定
var serialport = require('serialport');
var port = new serialport.SerialPort(
             'COM31', {           // COMポート
                baudrate: 115200, // ボーレート
              }
            );

var request = require('request');

var key = '<API KEY>';
var deviceId = '<DEVICE ID>';
var streamId = '<STREAM ID>'
var url = 'http://api-m2x.att.com/v2/devices/' + deviceId + '/streams/' + streamId +'/value';

var options = {
      uri: url,
      form: {},
      json: true,
      headers: {'X-M2X-KEY': key}
};

port.on("data", function(data) {
  // 取得データはbufferオブジェクトなので「toString」で文字列に変換
  var reading = data.toString();
  // データ加工
  voltage = reading * 3.3 / 1024
  temperatureC = (voltage - 0.5) * 100
  console.log(temperatureC);

  options.form.value= temperatureC;

  // データをPUTメソッドで送信
  request.put(options, function(error, response, body){
    if (!error && response.statusCode == 202) {
      console.log(body.status);
    } else {
      console.log('error: '+ response.statusCode);
    }
  });
});