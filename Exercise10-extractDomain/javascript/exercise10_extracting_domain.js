//Object Constructor
function UrlFeatureList(formElementsNamesHash) {
  this.formName = formElementsNamesHash.form;
  this.formElement = document.forms[this.formName];
  this.urlFieldElement = this.formElement[formElementsNamesHash.urlField];
}

UrlFeatureList.prototype.init = function(){
  var _this = this;
  this.formElement.addEventListener('submit', function(submitEvent) {
    if(_this.urlFieldElement.value) {
      var result  = _this.extractDomain();
      if(result.extractedDomain) {
        alert('Domain : ' + result.extractedDomain);
      }
      if(result.extractedSubdomain) {
        alert('Subdomain : ' + result.extractedSubdomain);
      }
    } else {
      alert('Please enter a url');
    }
  });
};

UrlFeatureList.prototype.extractDomain = function() {
  var domain, match,
    url = this.urlFieldElement.value,
    domainRegex = /^[^\.]+\.(.+\..+)$/,
    subdomainRegex = /^[^\.]+/;
    urlRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/g;
  if (match = urlRegex.exec(url)) {
    domain = match[1];
    if (match = domainRegex.exec(domain)) {
      var subdomain = subdomainRegex.exec(domain);
      domain = match[1];
    }
  }
  return { extractedDomain : domain, extractedSubdomain : subdomain };
}

//Object intantiated
window.onload = function() {
  var formElementsNames = {
    form: 'form1',
    urlField: 'urlInput'
  };
  var urlFeatureListObject = new UrlFeatureList(formElementsNames);
  urlFeatureListObject.init();
};