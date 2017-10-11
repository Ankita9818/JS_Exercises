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
FormValidator.prototype.init = function() {
  var _this = this;
  this.formElement.addEventListener('submit', function(submitEvent) {
    var validFields = _this.validateAllFields();
    if(!validFields) {
      submitEvent.preventDefault();
      _this.errorMessages.forEach(_this.displayErrors);
    }
  });
};

//Function to check validity constraints
FormValidator.prototype.validateAllFields = function() {
  this.errorMessages = [];
  var validNonEmptyFields = this.validateEmptyFields(),
    validSelectbox= this.validateEmptySelectBox(),
    validCheckbox = this.validateUncheckedNotificationCheckbox(),
    validTextAreaLength = this.validateTextAreaLength(),
    validEmail = this.validateEmail(),
    validUrl = this.validateUrl(),
    valid = validNonEmptyFields && validSelectbox && validCheckbox && validTextAreaLength && validEmail && validUrl;
  return valid;
};

//Function to check for empty fields
FormValidator.prototype.validateEmptyFields = function() {
  var emptyFields = false;
  for(var formField of this.formElement.elements) {
    if (formField.value.trim() == "") {
      this.errorMessages.push(this.capitalizeFirstLetter(formField.name) + ' cant be empty ');
      emptyFields = true;
    }
  }
  return(!emptyFields);
};

//Function to check whether select box is empty or not
FormValidator.prototype.validateEmptySelectBox = function() {
  var timezoneSelectBox = this.formElement[this.selectBoxName];
  if(timezoneSelectBox.selectedIndex <= 0) {
    this.errorMessages.push(this.capitalizeFirstLetter(timezoneSelectBox.name) + ' cant be empty');
    return false;
  }
  return true;
};

//Function to check whether checkbox is checked or not
FormValidator.prototype.validateUncheckedNotificationCheckbox = function() {
  var notificationCheckbox = this.formElement[this.checkboxName];
  if (!notificationCheckbox.checked)  {
    this.errorMessages.push('Please check the checkbox to receive notifications');
    return false;
  }
  return true;
};

//function to check for minimum length of text area content
FormValidator.prototype.validateTextAreaLength = function() {
  var aboutMeTextArea = this.formElement[this.textAreaName];
  if(aboutMeTextArea.value.length != 0) {
    if(aboutMeTextArea.value.length <= this.textAreaMaxLength) {
      this.errorMessages.push('Minimum ' + this.textAreaMaxLength + ' characters should be entered in textarea');
      return false;
    }
    return true;
  }
  return false;
};

//function to validate email format
FormValidator.prototype.validateEmail = function() {
  var email = this.formElement[this.emailFieldName].value.trim(),
    emailRegEx = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-z]{2,4})$/;
  if(email != "" && email.match(emailRegEx)) {
    return true;
  } else {
    this.errorMessages.push('The Email is invalid');
    return false;
  }
};

//function to validate url format
FormValidator.prototype.validateUrl = function() {
  var url = this.formElement[this.urlFieldName].value.trim(),
    urlRegEx = /^(((http[s]?)|(ftp)):\/\/)?(www\.)?[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}[\/]?/;
  if(url != "" && url.match(urlRegEx)) {
    return true;
  } else {
    this.errorMessages.push('The Url is invalid');
    return false;
  }
};

FormValidator.prototype.capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//Funtion to display all errors
FormValidator.prototype.displayErrors = function(errorMessage) {
  alert(errorMessage);
};

//Object intantiated
window.onload = function() {
  var formElementsNames = {
    form: 'form1',
    checkbox: 'notification',
    textArea: 'aboutMe',
    selectBox: 'timezone',
    emailField: 'mail',
    urlField: 'homepage',
    textAreaMaxLength: 50
  };
  var formValidatorObject = new FormValidator(formElementsNames);
  formValidatorObject.init();
};