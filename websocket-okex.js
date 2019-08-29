var timerVar;
var iter = 1;



function myFunction() {
     
     var mess = document.getElementById('message');
     
     
     var status = document.getElementById('status');
     var timer = document.getElementById('timer');
     
     
     var okxdata = document.getElementById('okxdata');

     var okxprice = document.getElementById('okxprice');

     var object_length = document.getElementById('length');

     var socket = new WebSocket("wss://real.okex.com:8443/ws/v3");

     var uncompr = "";   


socket.onopen = function() {
  
  mess.innerHTML = "Connection established.";
  
  socket.send(JSON.stringify({"op": "subscribe", "args": ["spot/ticker:ETH-USDT"]}));
  
};


  


socket.onclose = function(event) {
  if (event.wasClean) {
 
      mess.innerHTML = 'connection closed cleanly';
  } else {

      mess.innerHTML = 'disconnection';
  }

      mess.innerHTML = 'Code: ' + event.code + ' reason: ' + event.reason;
};




socket.onmessage = function(event) {

  uncompr = pako.ungzip(event.data,{ to: 'string' });

  obj = JSON.parse(uncompr);
  
    okxdata.innerHTML = event.data;    //   No data coming   ???
   
//   okxprice.innerHTML = obj.data.price;
   
   object_length.innerHTML = event.data.length;

};




socket.onerror = function(error) {

   mess.innerHTML = "Error " + error.message;
};



function rdSta() {

     status.innerHTML = socket.readyState;

     timer.innerHTML = iter++;
	}
	
	
timerVar = setInterval(rdSta, 1000);	

}
    
   function stopTimer() {  
    
    clearInterval(timerVar);
}
