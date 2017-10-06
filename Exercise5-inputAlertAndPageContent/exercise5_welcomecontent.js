function PromptUserName(showContentElement) {
  this.showContentElement = showContentElement;
  this.firstName = "";
  this.lastName = "";
}

//function to initiate prompts
PromptUserName.prototype.promptInitiator = function() {
  this.firstName = this.promptUser("First Name");
  this.lastName = this.promptUser("Last Name");
  this.showContent();
};

//function to prompt user
PromptUserName.prototype.promptUser = function(promptMessage) {
  var name;
  promptMessage = 'Please Enter Your ' + promptMessage;
  do {
    name = prompt(promptMessage,'');
  } while(!name || (name = name.trim()) == "");
  return name;
}

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
  promptUserNameObject.promptInitiator();
}