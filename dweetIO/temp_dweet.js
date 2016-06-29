// シリアルポートの設定
var serialport = require('serialport');
var port = new serialport.SerialPort(
             'COM31', {           // COMポート
                baudrate: 115200, // ボーレート
              }
            );

// dweet.ioクライアントの作成
var dweetClient = require("node-dweetio");
var dweetio = new dweetClient();

//thing nameの設定
var thingName = "<your thing name>";


port.on("data", function(data) {
  // 取得データはbufferオブジェクトなので「toString」で文字列に変換
  var reading = data.toString();
  // データ加工
  voltage = reading * 3.3 / 1024;
  temperatureC = (voltage - 0.5) * 100
  console.log(temperatureC);
  dweetio.dweet_for(
    thingName,
    {'temperature' : temperatureC},
    function(err, dweet){
      console.log(dweet);
    }
  );
});
