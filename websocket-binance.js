var timerVar;
var iter = 1;



function myFunction() {
     
     var mess = document.getElementById('message');
     
     
     var status = document.getElementById('status');
     
     
     var timer = document.getElementById('timer');
     
     
     var bindata = document.getElementById('bindata');


     var dataline = document.getElementById('dataline');


     var socket = new WebSocket("wss://stream.binance.com:9443/stream?streams=trxusdt@depth5");
     


socket.onopen = function(event) {
  
  mess.innerHTML = "Соединение установлено.";
  
};


  


socket.onclose = function(event) {
  if (event.wasClean) {
 
      mess.innerHTML = 'Соединение закрыто чисто';
  } else {

      mess.innerHTML = 'Обрыв соединения';
  }

      mess.innerHTML = 'Код: ' + event.code + ' причина: ' + event.reason;
};




socket.onmessage = function(event) {

  obj = JSON.parse(event.data)
  
  bindata.innerHTML = obj.data.asks[0][0] + " - " +  obj.data.bids[0][0];
  
  dataline.innerHTML = event.data;
  

};




socket.onerror = function(error) {

   mess.innerHTML = "Ошибка " + error.message;
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