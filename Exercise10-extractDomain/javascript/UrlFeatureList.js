//Object Constructor
function UrlFeatureList(options) {
  this.formElement = document.forms[options.form];
  this.url = this.formElement[options.urlField];
}

UrlFeatureList.prototype.init = function(){
  var _this = this;
  this.formElement.addEventListener('submit', function(submitEvent) {
    var url = _this.url.value.trim();
    if(_this.validateUrl(url)) {
      var domain  = _this.extractDomain(url);
      alert('Domain : ' + domain[3]);
      (domain[2]) ? alert('Subdomain : ' + domain[2]) : alert('Url does not have subdomain');
    } else {
      alert('Please enter a valid url');
      submitEvent.preventDefault();
    }
  });
};

//Function to extract domain
UrlFeatureList.prototype.extractDomain = function(url) {
  return domainRegex.exec(url);
}

//function to validate url format
UrlFeatureList.prototype.validateUrl = function(url) {
  return (url != "" && url.match(urlRegEx));
};

//Global constant for regular expressions
const urlRegEx = /^(((http[s]?)|(ftp)):\/\/)?(www\.)?[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}[\/]?/;
const domainRegex = /(?:www\.)?((\w*)(?:\.))?((\w*(?:\.))+([^\/]*))/;

//Object intantiated
window.addEventListener('load', function() {
  var options = {
    form: 'form1',
    urlField: 'urlInput'
  };
  var urlFeatureListObject = new UrlFeatureList(options);
  urlFeatureListObject.init();
}, false);