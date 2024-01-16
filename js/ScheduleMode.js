// Function to schedule messages based on start times
  function Schedule() {
    // Get start dates and times from the form
    const startDate1 = document.getElementById('dateInputON').value;
    const startTime1 = document.getElementById('timeInputON').value;
    const startDate2 = document.getElementById('dateInputOFF').value;
    const startTime2 = document.getElementById('timeInputOFF').value;

    // Combine start date-time strings
    const startDateTime1 = new Date(startDate1 + ' ' + startTime1);
    const startDateTime2 = new Date(startDate2 + ' ' + startTime2);
    console.log('Schedule Start.')

    // Schedule the first message at the first start date-time
    setTimeout(() => {
        const message = 'forward';                
        client.send('IMP_CONTROL', message);
        console.log('Published IMP_CONTROL:', message);
    }, startDateTime1 - new Date());

    // Schedule the second message at the second start date-time
    setTimeout(() => {
        const message = 'stop';                
        client.send('IMP_CONTROL', message);
        console.log('Published IMP_CONTROL:', message);
    }, startDateTime2 - new Date());
  }


  