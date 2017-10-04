//Object Constructor
function ValidateForm(formName,checkbox,textArea,selectBox) {
  this.formName = formName;
  this.formElement = document.forms[formName];
  this.checkboxName = checkbox;
  this.textAreaName = textArea;
  this.selectBoxName = selectBox;
}

//Function to handle submit event
ValidateForm.prototype.init = function(){
  var _this = this;
  this.formElement.addEventListener('submit', function(submitEvent) {
    var formFieldsValidity = _this.formValidationFunction();
    if(!formFieldsValidity) {
      submitEvent.preventDefault();
    }
  });
};

//Function to check validity constraints
ValidateForm.prototype.formValidationFunction = function(event) {
  if(this.checkForEmptyFields()) {
    if(this.checkForEmptySelectBox()) {
      if(this.checkForUncheckedNotificationCheckbox()) {
        if(this.checkForTextAreaLength()) {
          alert('Successfull Submission');
          return true;
        }
      }
    }
  }
  alert('Unsuccessful Submission');
  return false;
};

//Function to check for empty fields
ValidateForm.prototype.checkForEmptyFields = function() {
  var emptyAlertMessage = '';
  for(var formField of this.formElement.elements) {
    if (formField.value == "")
    {
      emptyAlertMessage = formField.name + ' cant be empty ';
      alert(emptyAlertMessage);
      return false;
    }
  }
  return true;
};

//Function to check whether select box is empty or not
ValidateForm.prototype.checkForEmptySelectBox = function() {
  var timezoneSelectBox = this.formElement[this.selectBoxName];
  if(timezoneSelectBox.selectedIndex <= 0) {
    alert(timezoneSelectBox.name + ' cant be empty');
    return false;
  }
  return true;
};

//Function to check whether checkbox is checked or not
ValidateForm.prototype.checkForUncheckedNotificationCheckbox = function() {
  var notificationCheckbox = this.formElement[this.checkboxName];
  if (!notificationCheckbox.checked)
  {
    alert('Please check the checkbox to receive notifications');
    return false;
  }
  return true;
};

//function to check for minimum length of text area content
ValidateForm.prototype.checkForTextAreaLength = function() {
  var aboutMeTextArea = this.formElement[this.textAreaName];
  if(aboutMeTextArea.value.length <= 50) {
    alert('minimum 50 characters should be entered in textarea');
    return false;
  }
  return true;
};

//Object intantiated
var ValidateFormObject = new ValidateForm("form1","notification","aboutMe","timezone");
ValidateFormObject.init();