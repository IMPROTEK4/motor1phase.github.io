function toggleModes(checkedId, uncheckedId) {
    const checkedCheckbox = document.getElementById(checkedId);
    const uncheckedCheckbox = document.getElementById(uncheckedId);

    if (checkedCheckbox.checked) {
      uncheckedCheckbox.disabled = true;
    } else {
      uncheckedCheckbox.disabled = false;
    }

    toggleModes();
  }

  function toggleModes() {
    const scheduleModeCheckbox = document.getElementById('ScheduleMode');
    const manualModeCheckbox = document.getElementById('ManualMode');
    const schedualDiv = document.getElementById('schedualDiv');
    const manualDiv = document.getElementById('manualDiv');
    const ManualSpeed = document.getElementById('box_Mspeed');

    if (scheduleModeCheckbox.checked) {
      schedualDiv.classList.remove('hidden');
      manualDiv.classList.add('hidden');
      console.log('Hello!');
      ManualSpeed.textContent = '';
    //   clearManualInputs();
    } else if (manualModeCheckbox.checked) {
      schedualDiv.classList.add('hidden');
      manualDiv.classList.remove('hidden');
      console.log('Hi!');
    //   clearSchedualInputs();
    }
  }

