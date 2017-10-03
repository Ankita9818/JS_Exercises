function CheckboxEvents(parent_checkboxes, child_checkboxes) {
  this.parent_checkboxes = parent_checkboxes;
  this.child_checkboxes = child_checkboxes;
}

//Funtion to add listeners to each checkbox
CheckboxEvents.prototype.init = function(){
  for(var checkbox of this.parent_checkboxes) {
    checkbox.addEventListener('click', this.eventHandler());
  }
};

//Event Handler Function
CheckboxEvents.prototype.eventHandler = function() {
  var _this = this;
  return function() {
    _this.checkUncheckAll(this);
  };
};

//Function to check or uncheck child lists as per parent element
CheckboxEvents.prototype.checkUncheckAll = function(sender) {
  var _this = this;
  var senderId = sender.getAttribute("id");
  for (var index of _this.child_checkboxes) {
    var parent= index.getAttribute("data-parent");
    if(parent == senderId) {
      index.checked = sender.checked;
      _this.displayChildList(index);
    }
  }
};

//Function to display child lists
CheckboxEvents.prototype.displayChildList = function(sender) {
  if(sender.checked) {
    sender.parentElement.style.display = 'block';
    sender.parentElement.scrollIntoView();
  }
  else {
    sender.parentElement.style.display = 'none';
  }
};

var CheckboxEventsObject = new CheckboxEvents(document.querySelectorAll("[data-role=parents]"), document.querySelectorAll("[data-role=child]"));
CheckboxEventsObject.init();
