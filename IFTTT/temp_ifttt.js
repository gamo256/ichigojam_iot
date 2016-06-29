// シリアルポートの設定
var serialport = require('serialport');
var port = new serialport.SerialPort(
             'COM31', {           // COMポート
                baudrate: 115200, // ボーレート
              }
            );

var request = require('request');

var event = '<イベント名>';
var key = '<Key>';

var url = 'https://maker.ifttt.com/trigger/' + event + '/with/key/' + key;
var options = {
  uri: url,
  form: {},
  json: true
};


port.on("data", function(data) {
  // 取得データはbufferオブジェクトなので「toString」で文字列に変換
  var reading = data.toString();
  // データ加工
  voltage = reading * 3.3 / 1024
  temperatureC = (voltage - 0.5) * 100
  console.log(temperatureC);

  options.form.value1= temperatureC;

  // データをPOSTメソッドで送信
  request.post(options, function(error, response, body){
    if (!error && response.statusCode == 200) {
      console.log('success');
    } else {
     console.log('error: '+ response.statusCode);
    }
  });
});