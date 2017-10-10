function CountryTransferManager(formElementsNameHash) {
  this.formName = formElementsNameHash.formName;
  this.formElement = document.forms[this.formName];
  this.initialSelectBox = this.formElement[formElementsNameHash.initialSelectBoxName];
  this.finalSelectBox = this.formElement[formElementsNameHash.finalSelectBoxName];
  this.addButton = this.formElement[formElementsNameHash.addButtonName];
  this.removeButton = this.formElement[formElementsNameHash.removeButtonName];
}

//function to attach Event Handlers
CountryTransferManager.prototype.init = function() {
  var _this = this;
  this.addButton.addEventListener('click', function() {
    _this.transferCountries(_this.initialSelectBox, _this.finalSelectBox);
  });
  this.removeButton.addEventListener('click', function() {
    _this.transferCountries(_this.finalSelectBox, _this.initialSelectBox);
  });
};

CountryTransferManager.prototype.transferCountries = function(sourceSelectbox, destinationSelectbox) {
  while(sourceSelectbox.selectedIndex > -1){
    destinationSelectbox.add(sourceSelectbox.options[sourceSelectbox.selectedIndex]);
  }
};

//Object instantiated
window.addEventListener('load', function() {
  //Object hash for names of Form
  var formElementsName = {
    formName: 'formCountries',
    initialSelectBoxName: 'initialSelectbox',
    finalSelectBoxName: 'finalSelectbox',
    addButtonName: 'add',
    removeButtonName: 'remove'
  };

  var countryTransferManagerObject = new CountryTransferManager(formElementsName);
  countryTransferManagerObject.init();
});