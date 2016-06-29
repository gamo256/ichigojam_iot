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

var thingName = "<your thing name>"; //thing nameの設定

port.on("open", function() {
  // データ受信(購読)
  dweetio.listen_for(thingName, function(dweet){
    console.log(dweet.content)
    if(dweet.content.action === 'on') {
      port.write("LED1\r\n");
    } else {
      port.write("LED0\r\n");
    }
  });
})