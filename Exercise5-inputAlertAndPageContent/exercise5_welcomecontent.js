function PromptUserName(showContentElement) {
  this.showContentElement = showContentElement;
  this.firstName = "";
  this.lastName = "";
}

//function to prompt user
PromptUserName.prototype.promptUserFunction = function() {
  do {
    this.firstName = prompt('Please enter your First name ','');
  } while(this.firstName == null || this.firstName.trim() == "");

  do {
    this.lastName = prompt('Please enter your Last name ','');
  } while(this.lastName == null || this.lastName.trim() == "");
  this.showContent();
};

//Function to show alert and welcome content in page
PromptUserName.prototype.showContent = function() {
  var welcomeContent = 'Hello ' + this.firstName.trim() + ' ' + this.lastName.trim() + '.';
  alert(welcomeContent);
  this.showContentElement.innerHTML = welcomeContent;
};

//Object instantiated
var PromptUserNameObject = new PromptUserName(document.querySelector("[data-label=content]"));
PromptUserNameObject.promptUserFunction();