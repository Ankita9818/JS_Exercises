//Constructor object
function CheckboxEvents(days_of_week, elementNone, maxCheckboxSelected) {
  this.days_of_week = days_of_week;
  this.elementNone = elementNone;
  this.maxCheckboxSelected = maxCheckboxSelected;
}

//Funtion to add listeners to each checkbox
CheckboxEvents.prototype.init = function(){
  for(var checkbox of this.days_of_week) {
    checkbox.addEventListener('click', this.eventHandler());
  }
  this.elementNone[0].addEventListener('click', this.eventHandler());
};

//Event Handler
CheckboxEvents.prototype.eventHandler = function() {
  var _this = this;
  var alertMessage = '';
  return function() {
    var returnArray = _this.countSelectedCheckbox(this);
    if(this.value == _this.elementNone[0].value) {
      _this.resetAll();
    } else if(returnArray.selectedCheckbox > _this.maxCheckboxSelected) {
      //returnArray.selected_days.length -= 1;
      this.checked = false;
      for(var eachday of returnArray.selected_days) {
        if(eachday != this) {
          alertMessage += eachday.value + ' ';
        }
      }
      alert('Only 3 days can be selected. You have already selected ' + alertMessage);
    } else {
      _this.elementNone[0].checked = false;
    }
  }
}

//Function to count selected checkbox
CheckboxEvents.prototype.countSelectedCheckbox = function() {
  var counter = 0, selected_days_array = [], str ='';
  for(var index of this.days_of_week) {
    if(index.checked == 1) {
      selected_days_array[counter]=index;
      counter++;
    }
  }
  var returnArray = {selectedCheckbox : counter, selected_days : selected_days_array};
  return returnArray;
}

//Function to uncheck checkboxes other than none
CheckboxEvents.prototype.resetAll = function() {
  var _this = this;
  for(var checkbox of _this.days_of_week) {
    checkbox.checked = false;
  }
}

var CheckboxEventsObject = new CheckboxEvents(document.querySelectorAll("[data-label=weekday]"), document.querySelectorAll("[data-none=none]"),3);
CheckboxEventsObject.init();
