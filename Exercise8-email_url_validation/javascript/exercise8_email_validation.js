//Object Constructor
function FormValidator(formElementsNamesHash) {
  this.formName = formElementsNamesHash.form;
  this.formElement = document.forms[this.formName];
  this.checkboxName = formElementsNamesHash.checkbox;
  this.textAreaName = formElementsNamesHash.textArea;
  this.selectBoxName = formElementsNamesHash.selectBox;
  this.urlFieldName = formElementsNamesHash.urlField;
  this.emailFieldName = formElementsNamesHash.emailField;
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
  var validFields = this.validateEmptyFields();
  var validSelectbox= this.validateEmptySelectBox();
  var validCheckbox = this.validateUncheckedNotificationCheckbox();
  var validTextAreaLength = this.validateTextAreaLength();
  var validEmail = this.validateEmail();
  var validUrl = this.validateUrl();
  var valid = validFields && validSelectbox && validCheckbox && validTextAreaLength && validEmail && validUrl;
  return valid;
};

//Function to check for empty fields
FormValidator.prototype.validateEmptyFields = function() {
  var emptyFields = false;
  var emptyAlertMessage = '';
  for(var formField of this.formElement.elements) {
    if (formField.value.trim() == "") {
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

//function to validate email format
FormValidator.prototype.validateEmail = function() {
  var emailElement = this.formElement[this.emailFieldName];
  var emailValid = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-z]{2,4})$/;
  if(emailElement.value.trim() != "") {
    if(emailElement.value.match(emailValid)) {
      alert("The Email is valid");
      return true;
    } else {
      alert("The Email is invalid");
      return false;
    }
  }
};

//function to validate url format
FormValidator.prototype.validateUrl = function() {
  var urlElement = this.formElement[this.urlFieldName];
  var urlvalid = /^(((http[s]?)|(ftp)):\/\/)?(www\.)?[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}[\/]?/;
  if(urlElement.value.trim() != "") {
    if(urlElement.value.match(urlvalid)) {
      alert("The Url is valid");
      return true;
    } else {
      alert("The Url is invalid");
      return false;
    }
  }
};

FormValidator.prototype.capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var formElementsNames = {
  form: 'form1',
  checkbox: 'notification',
  textArea: 'aboutMe',
  selectBox: 'timezone',
  emailField: 'mail',
  urlField: 'homepage',
  textAreaMaxLength: 50
};

//Object intantiated
window.onload = function() {
  var formValidatorObject = new FormValidator(formElementsNames);
  formValidatorObject.init();
};