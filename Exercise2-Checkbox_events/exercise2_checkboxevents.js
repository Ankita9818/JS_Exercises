//Constructor object
function SelectMaximumCheckbox(weekdaysCheckbox, resetCheckbox, maxCheckboxSelected) {
  this.weekdaysCheckbox = weekdaysCheckbox;
  this.resetCheckbox = resetCheckbox;
  this.maxCheckboxSelected = maxCheckboxSelected;
}

//Funtion to add listeners to each checkbox
SelectMaximumCheckbox.prototype.init = function() {
  for(var checkbox of this.weekdaysCheckbox) {
    checkbox.addEventListener('click', this.maxCheckboxSelectedEventHandler());
  }
  this.resetCheckbox.addEventListener('click', this.resetAllCheckbox());
};

//Event Handler
SelectMaximumCheckbox.prototype.maxCheckboxSelectedEventHandler = function() {
  var _this = this;
  var alertMessage = '';
  return function() {
    var alreadySelectedCheckboxObject = _this.countSelectedCheckbox(this);
    if(alreadySelectedCheckboxObject.noOfSelectedCheckbox > _this.maxCheckboxSelected) {
      this.checked = false;
      for(var eachday of alreadySelectedCheckboxObject.checkedWeekdaysCheckbox) {
        if(eachday != this) {
          alertMessage += eachday.value + ' ';
        }
      }
      alert('Only ' + _this.maxCheckboxSelected + ' days can be selected. You have already selected ' + alertMessage);
    } else {
      _this.resetCheckbox.checked = false;
    }
  };
};

//Function to count selected checkbox
SelectMaximumCheckbox.prototype.countSelectedCheckbox = function() {
  var selectedCheckbox = 0, checkedWeekdaysCheckbox_array = [];
  for(var checkboxIterator of this.weekdaysCheckbox) {
    if(checkboxIterator.checked == 1) {
      checkedWeekdaysCheckbox_array[selectedCheckbox]=checkboxIterator;
      selectedCheckbox++;
    }
  }
  var alreadySelectedCheckboxObject = {noOfSelectedCheckbox : selectedCheckbox, checkedWeekdaysCheckbox : checkedWeekdaysCheckbox_array};
  return alreadySelectedCheckboxObject;
};

//Function to uncheck checkboxes other than none
SelectMaximumCheckbox.prototype.resetAllCheckbox = function() {
  var _this = this;
  return function() {
    for(var checkbox of _this.weekdaysCheckbox) {
      checkbox.checked = false;
    }
  };
};

var selectMaximumCheckboxObject = new SelectMaximumCheckbox(document.querySelectorAll("[data-label=weekday]"), document.querySelector("[data-none=none]"),3);
selectMaximumCheckboxObject.init();
