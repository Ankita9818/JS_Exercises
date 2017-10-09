//Object Constructor
function NumericsValidator(options) {
  this.formName = options.form;
  this.formElement = document.forms[this.formName];
  this.numberFieldElement = this.formElement[options.numberField];
  this.resultFieldElement = this.formElement[options.resultField];
}

NumericsValidator.prototype.init = function(){
  var _this = this;
  this.formElement.addEventListener('submit', function(submitEvent) {
    var valid = _this.validateNumericalCharacters();
    _this.resultFieldElement.value = valid;
    if(!valid) {
      submitEvent.preventDefault();
    }
  });
};

//Function which validates that input has only numeric characters
NumericsValidator.prototype.validateNumericalCharacters = function() {
  var validNumericRegEx = /^\d+\.?\d+$/;
  return (this.numberFieldElement.value.match(validNumericRegEx)) ? true : false;
};

var options = {
  form: 'form1',
  numberField: 'numberInput',
  resultField: 'result'
};

//Object intantiated
window.addEventListener('load', function() {
  var numericsValidatorObject = new NumericsValidator(options);
  numericsValidatorObject.init();
}, false);