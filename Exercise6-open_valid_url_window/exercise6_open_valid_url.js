function UrlPromptor() {}

//function to prompt user for url
UrlPromptor.prototype.init = function() {
  this.url = prompt('Please enter the url you want to open');
  if(this.url == null || this.url.trim() == "") {
    alert('The url is invalid');
  } else {
    window.open(this.url,'_blank','height=450,width=400,scrollbars=no,status=no,toolbar=no,menubar=no,titlebar=no,location=no');
  }
};

//Object instantiated
window.onload = function() {
  var urlPromptorObject = new UrlPromptor();
  urlPromptorObject.init();
};