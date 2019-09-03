var timerVar;
var iter = 1;



function myFunction() {
     
     var mess = document.getElementById('message');
     
     
     var status = document.getElementById('status');
     
     var otvet  = document.getElementById('otvet');          
     
     var timer = document.getElementById('timer');
     
     
     var huodata = document.getElementById('huodata');

     var huoprice = document.getElementById('huoprice');

     var object_length = document.getElementById('length');

     var socket = new WebSocket("wss://api.huobi.pro/ws/v1");
     
     


     var uncompr = "";   



socket.onopen = function(event) {
  
  mess.innerHTML = "Соединение установлено.";
   
  socket.send(JSON.stringify({"sub": `market.trxusdt.kline.1min`,"id":"id1"}));
        
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

  uncompr = pako.ungzip(event.data,{ to: 'string' });

  obj = JSON.parse(uncompr);
  
    huodata.innerHTML = event.data;    //   No data coming   ???
   
//   huoprice.innerHTML = obj.data.price;
   
   object_length.innerHTML = event.data.length;

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