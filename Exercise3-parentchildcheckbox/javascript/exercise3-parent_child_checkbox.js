function CheckboxEvent(parentCheckboxes, childCheckboxes) {
  this.parentCheckboxes = parentCheckboxes;
  this.childCheckboxes = childCheckboxes;
}

//Funtion to add listeners to each checkbox
CheckboxEvent.prototype.init = function(){
  for(var checkbox of this.parentCheckboxes) {
    checkbox.addEventListener('click', this.checkUncheckAll());
  }
};

//Function to check or uncheck child lists as per parent element
CheckboxEvent.prototype.checkUncheckAll = function() {
  var _this = this;
  return function() {
    var clickedParentCheckboxId = this.getAttribute("data-label");
    for (var checkbox of _this.childCheckboxes) {
      var parent= checkbox.getAttribute("data-parent");
      if(parent == clickedParentCheckboxId) {
        checkbox.checked = this.checked;
        _this.displayChildList(checkbox);
      }
    }
  };
};

//Function to display child lists
CheckboxEvent.prototype.displayChildList = function(checkedChildCheckbox) {
  if(checkedChildCheckbox.checked) {
    checkedChildCheckbox.parentElement.classList.add('visible');
    checkedChildCheckbox.parentElement.scrollIntoView();
  }
  else {
    checkedChildCheckbox.parentElement.classList.remove('visible');
  }
};

var CheckboxEventObject = new CheckboxEvent(document.querySelectorAll("[data-role=parents]"), document.querySelectorAll("[data-role=child]"));
CheckboxEventObject.init();
