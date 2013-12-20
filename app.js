//サーバーサイドで実行されるjs

var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");
var exec = require('child_process').exec;


//var変数を宣言
var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});//200
     var output = fs.readFileSync("./index.html", "utf-8");//indexを出力
     res.end(output);
}).listen(process.env.VMC_APP_PORT || 3000);
 
var io = socketio.listen(server);
 
io.sockets.on("connection", function (socket) {
 
  // メッセージ送信（送信者にも送られる）
  socket.on("C_to_S_message", function (data) {
    //io.sockets.emit("S_to_C_message", {value:data.value});
    exec('rc_controll.exe '+data.value);
  });

  // 切断したときに送信
  socket.on("disconnect", function () {
//    io.sockets.emit("S_to_C_message", {value:"user disconnected"});
  });
});
