//Object Constructor
function NumericsValidator(formElementsNamesHash) {
  this.formName = formElementsNamesHash.form;
  this.formElement = document.forms[this.formName];
  this.numberFieldElement = this.formElement[formElementsNamesHash.numberField];
  this.resultFieldElement = this.formElement[formElementsNamesHash.resultField];
}

NumericsValidator.prototype.init = function(){
  var _this = this;
  this.formElement.addEventListener('submit', function(submitEvent) {
    var valid = _this.validateNumericalCharacters();
    if(!valid) {
      submitEvent.preventDefault();
    }
  });
};

//Function which validates that input has only numeric characters
NumericsValidator.prototype.validateNumericalCharacters = function() {
  var validNumericRegEx = /^\d+\.?\d+$/;
  var valid = false;
  if(this.numberFieldElement.value.match(validNumericRegEx)) {
    valid = true;
  }
  this.resultFieldElement.value =  valid;
  return valid;
};

var formElementsNames = {
  form: 'form1',
  numberField: 'numberInput',
  resultField: 'result'
};

//Object intantiated
window.onload = function() {
  var numericsValidatorObject = new NumericsValidator(formElementsNames);
  numericsValidatorObject.init();
};