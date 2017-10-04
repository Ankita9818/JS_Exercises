//Object Constructor
function FormValidator(formElementsNamesHash) {
  this.formName = formElementsNamesHash.form;
  this.formElement = document.forms[this.formName];
  this.checkboxName = formElementsNamesHash.checkbox;
  this.textAreaName = formElementsNamesHash.textArea;
  this.selectBoxName = formElementsNamesHash.selectBox;
  this.textAreaMaxLength = formElementsNamesHash.textAreaMaxLength;
}

//Function to handle submit event
FormValidator.prototype.init = function(){
  var _this = this;
  this.formElement.addEventListener('submit', function(submitEvent) {
    var formFieldsValidity = _this.formValidationFunction();
    if(!formFieldsValidity) {
      submitEvent.preventDefault();
    }
  });
};

//Function to check validity constraints
FormValidator.prototype.formValidationFunction = function(event) {
  var valid = true;
  valid = this.validateEmptyFields();
  valid = this.validateEmptySelectBox();
  valid = this.validateUncheckedNotificationCheckbox();
  valid = this.validateTextAreaLength();
  return valid;
};

//Function to check for empty fields
FormValidator.prototype.validateEmptyFields = function() {
  var emptyFields = false;
  var emptyAlertMessage = '';
  for(var formField of this.formElement.elements) {
    if (formField.value == "") {
      emptyAlertMessage = this.capitalizeFirstLetter(formField.name) + ' cant be empty ';
      alert(emptyAlertMessage);
      emptyFields = true;
    }
  }
  return(!emptyFields);
};

//Function to check whether select box is empty or not
FormValidator.prototype.validateEmptySelectBox = function() {
  var timezoneSelectBox = this.formElement[this.selectBoxName];
  if(timezoneSelectBox.selectedIndex <= 0) {
    alert(this.capitalizeFirstLetter(timezoneSelectBox.name) + ' cant be empty');
    return false;
  }
  return true;
};

//Function to check whether checkbox is checked or not
FormValidator.prototype.validateUncheckedNotificationCheckbox = function() {
  var notificationCheckbox = this.formElement[this.checkboxName];
  if (!notificationCheckbox.checked)  {
    alert('Please check the checkbox to receive notifications');
    return false;
  }
  return true;
};

//function to check for minimum length of text area content
FormValidator.prototype.validateTextAreaLength = function() {
  var aboutMeTextArea = this.formElement[this.textAreaName];
  if(aboutMeTextArea.value.length != 0) {
    if(aboutMeTextArea.value.length <= this.textAreaMaxLength) {
      alert('Minimum ' + this.textAreaMaxLength + ' characters should be entered in textarea');
      return false;
    }
    return true;
  }
  return false;
};

FormValidator.prototype.capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var formElementsNames = {
  form: 'form1',
  checkbox: 'notification',
  textArea: 'aboutMe',
  selectBox: 'timezone',
  textAreaMaxLength: 50
};

//Object intantiated
window.onload = function() {
  var formValidatorObject = new FormValidator(formElementsNames);
  formValidatorObject.init();
};