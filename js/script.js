var connection_status= false;
var subTopic='' ;
var allMqttData = [];


setTimeout(function() {
    ConnectToMQTT();
  }, 2000);
function ConnectToMQTT(){
    // Generate a random number for the client ID
    const randomClientNumber = Math.floor(Math.random() * 1000) + 1;
    const clientID = 'MOTOR 1PHASE' + randomClientNumber;
          host = 'blithesome-chiropractor.cloudmqtt.com';
          port = 443;

    // Create a client instance
    // client = new Paho.MQTT.Client('e8f424ec.emqx.cloud', 8083, "test");
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
      onSuccess: onConnect,
      // onFailure: onFailure,
      useSSL: true,

      userName: 'rwufzabs',
      password: 'kVZNw5Tuj6e5',
      mqttVersion:4
  });
}


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  connection_status = true ;
  // alert("Connect to server is success.");
  setTimeout(() => {
    console.log('Connection successful!');
  }, 2000);

  const subTopic1 = 'STATUS' ;
  const subTopic2 = 'E_DATA' ;
  qos = 0;
  client.subscribe(subTopic1);
  client.subscribe(subTopic2);
  

  //  ---ALLOW BUTTON READ DATA
  ButtonRead = document.getElementById('button_read');
  ButtonRead.disabled = false;
  // ButtonRead.style.backgroundColor = 'green';
}
  
  
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+ responseObject.errorMessage);
    alert("MQTT Connection Lost");
  }

}



// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
    
  const values = message.payloadString.split(',');

  values.forEach(item => {
      // Extract the part after '='
      const keyValue = item.split('=');

      // Check if the split produced a valid key-value pair
      if (keyValue.length === 2) {
          const key = keyValue[0].trim();
          const values = parseFloat(keyValue[1].trim());

          // Assuming you have an input textbox with id 'yourTextboxId'
          if (key === 'v') {
              document.getElementById('box_voltage').value = values.toFixed(2);
          }
          if (key === 'I') {
            document.getElementById('box_current').value = values.toFixed(2);
          }
          if (key === 'Hz') {
            document.getElementById('box_frequency').value = values.toFixed(2);
          }
          if (key === 'speed') {
              document.getElementById('box_Mspeed').value = values;

              document.getElementById('box_Sspeed').value = values;
          }



        const Voltage = document.getElementById('box_voltage').value;
        const Current = document.getElementById('box_current').value;
        const PF = '0.68';

          // if (key === 'dri' & key === 'speed') {
          //   if (values != 0) {
          //     alert("ម៉ូទ័រកំពុងដំណើរការ");
          //     console.log('HELLO');
          //   }else if(document.getElementById('box_Mspeed') == 0){
          //     console.log('HELLOs');
          //     alert("ម៉ូទ័រឈប់ដំណើរការ");
          //   }
          // }
          // Add similar conditions for other keys (V, Hz) if needed
      }
  });

  //  ---ALLOW BUTTON START
  ButtonStart = document.getElementById('button_start');
  ButtonStart.disabled = false;

  //  ---ALLOW BUTTON STOP
  ButtonStop = document.getElementById('button_stop');
  ButtonStop.disabled = false;

  
}



// ---MANUAL BUTTON START 
function button_man_start() {
  const message = 'forward';                
  client.send('IMP_CONTROL', message);
  console.log('Published IMP_CONTROL:', message);

  //  ---ALLOW BUTTON STOP
  // ButtonStop = document.getElementById('button_stop');
  // ButtonStop.disabled = false;

  //  ---LOCK BUTTON STOP
  // ButtonStart = document.getElementById('button_start');
  // ButtonStart.disabled = true;

}       

// ---MANUAL BUTTON STOP 
function button_man_stop() {
  // const InputMspeed = document.getElementById('box_Mspeed');

  const message = 'stop';                
  client.send('IMP_CONTROL', message);
  console.log('Published IMP_CONTROL:', message);

  // InputMspeed.value = '';


  //  ---LOCK BUTTON START
  // ButtonStart = dgocument.getElementById('button_start');
  // ButtonStart.disabled = true;

  //  ---LOCK BUTTON STOP
  // ButtonStop = document.getElementById('button_stop');
  // ButtonStop.disabled = true;


}


// PUBLISH FOR READ DATA
function button_read() {  
  const  message = 'read=1';           
  client.send('IMP_READ', message);
  console.log('Published Manual Speed IMP_CONTROL:', message);

  //  ---LOCK BUTTON READ DATA
  ButtonRead = document.getElementById('button_read');
  // ButtonRead.disabled = true;
  // ButtonRead.style.backgroundColor = 'green';


  const Power = document.getElementById('box_power');
  Power.value = (Voltage * Current * Math.sqrt(3) * PF).toFixed(2);
        
}




  