function PromptUserName(showContentElement) {
  this.showContentElement = showContentElement;
  this.firstName = "";
  this.lastName = "";
}

//function to prompt user
PromptUserName.prototype.promptUser = function() {
  do {
    this.firstName = prompt('Please enter your First name ','');
  } while(!this.firstName || (this.firstName = this.firstName.trim()) == "");

  do {
    this.lastName = prompt('Please enter your Last name ','');
  } while(!this.lastName || (this.lastName = this.lastName.trim()) == "");
  this.showContent();
};

//Function to show alert and welcome content in page
PromptUserName.prototype.showContent = function() {
  var welcomeContent = 'Hello ' + this.capitalizeFirstLetter(this.firstName) + ' ' + this.capitalizeFirstLetter(this.lastName);
  alert(welcomeContent);
  this.showContentElement.innerHTML = welcomeContent;
};

PromptUserName.prototype.capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//Object instantiated
window.onload = function() {
  var promptUserNameObject = new PromptUserName(document.querySelector("[data-label=content]"));
  promptUserNameObject.promptUser();
}