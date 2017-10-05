function CountryTransfer(formElementsNameHash) {
  this.formName = formElementsNameHash.formName;
  this.formElement = document.forms[this.formName];
  this.initialSelectBox = this.formElement[formElementsNameHash.initialSelectBoxName];
  this.finalSelectBox = this.formElement[formElementsNameHash.finalSelectBoxName];
  this.addButton = this.formElement[formElementsNameHash.addButtonName];
  this.removeButton = this.formElement[formElementsNameHash.removeButtonName];
}

//function to attach Event Handlers
CountryTransfer.prototype.init = function() {
  this.addButton.addEventListener('click', this.transferCountries(this.initialSelectBox, this.finalSelectBox));
  this.removeButton.addEventListener('click', this.transferCountries(this.finalSelectBox, this.initialSelectBox));
};

//Function to transfer countries among selectboxes
CountryTransfer.prototype.transferCountries = function(sourceSelectbox, destinationSelectbox) {
  var _this = this, selectedCountryOptions = [];
  return function() {
    selectedCountryOptions = _this.getSelectedOptions(sourceSelectbox);
    var selectedOptionsIndex = 0;
    while(selectedCountryOptions[selectedOptionsIndex]) {
      destinationSelectbox.add(selectedCountryOptions[selectedOptionsIndex]);
      selectedOptionsIndex++;
    }
  };
};

//Function to get all selected options
CountryTransfer.prototype.getSelectedOptions = function(selectbox){
  var selectedCountryOptions = [], option = null;
  for (var optionIndex = 0, len = selectbox.options.length; optionIndex < len; optionIndex++){
    option = selectbox.options[optionIndex];
    if (option.selected){
      selectedCountryOptions.push(option);
    }
  }
  return selectedCountryOptions;
};

//Object hash for names of Form
var formElementsName = {
  formName: 'formCountries',
  initialSelectBoxName: 'initialSelectbox',
  finalSelectBoxName: 'finalSelectbox',
  addButtonName: 'add',
  removeButtonName: 'remove'
};

//Object instantiated
window.onload = function() {
  var countryTransferObject = new CountryTransfer(formElementsName);
  countryTransferObject.init();
};