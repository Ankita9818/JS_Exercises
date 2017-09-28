var counter = 0, daysSelected = [];
var weekdays = document.getElementsByClassName("weekdays");

//The Event Handler of click event
function eventHandler() {

  if(event.currentTarget.value != 'none' && counter < 3) {
    document.getElementById("none").checked = false;
    daysSelected[counter] = event.currentTarget.value;
    counter++;
  } else if(event.currentTarget.value == 'none') {
    uncheckAll();
  } else {
    alert('Only 3 days can be selected. You have already selected ' + daysSelected[0].toUpperCase() + ', ' + daysSelected[1].toUpperCase() + ' and ' + daysSelected[2].toUpperCase() + '.');
    event.currentTarget.checked = false;
  }
}

//Function to uncheck checkboxes other than none
function uncheckAll() {
  for(var index = 0; index < weekdays.length; index++) {
    weekdays[index].checked = false;
  }
  daysSelected.length = counter = 0;
}
