//Object Constructor
function UrlFeatureList(options) {
  this.formElement = document.forms[options.form];
  this.url = this.formElement[options.urlField];
}

UrlFeatureList.prototype.init = function(){
  var _this = this;
  this.formElement.addEventListener('submit', function(submitEvent) {
    _this.domainExtractor(_this.url.value.trim(),submitEvent);
  });
};

UrlFeatureList.prototype.domainExtractor = function(url,submitEvent) {
  if(this.validateUrl(url)) {
    var domain  = this.extractDomain(url);
    (domain[2]) ? domainMessage = 'Domain : ' + domain[3] + '\nSubdomain : ' + domain[2] : domainMessage = 'Domain : ' + domain[3];
    alert(domainMessage);
  } else {
    alert('Please enter a valid url');
    submitEvent.preventDefault();
  }
}

//Function to extract domain
UrlFeatureList.prototype.extractDomain = function(url) {
  return DOMAIN_REGEX.exec(url);
};

//function to validate url format
UrlFeatureList.prototype.validateUrl = function(url) {
  return (url != "" && URL_REGEX.test(url) && URL_REGEX.exec(url)[1].length <= 253);
};

//Global constant for regular expressions
const URL_REGEX = /^(?:http[s]?:\/\/)?((www\.)?([a-z0-9]{1,63}([\-\.]{1}[a-z0-9]{1,63})*\.[a-z]{2,5}))(:[0-9]{1,5})?(\/(\w+[\-\.\/]?)+)*$/;
const DOMAIN_REGEX = /((\w*)(?:\.))?((\w*(?:\.))+([^\/]*))/;

//Object intantiated
window.addEventListener('load', function() {
  var options = {
    form: 'form1',
    urlField: 'urlInput'
  };
  var urlFeatureListObject = new UrlFeatureList(options);
  urlFeatureListObject.init();
}, false);