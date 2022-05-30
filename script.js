// Assignment Code
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy");
var lengthCheck = document.querySelector("#length");
var upperCaseChk = document.querySelector("#upperCase");
var lowerCaseChk = document.querySelector("#lowerCase");
var numbersChk = document.querySelector("#numbers");
var specialChk = document.querySelector("#special");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

  copyBtn.removeAttribute("disabled");
  copyBtn.focus();
}

function copyToClipboard() {
  // BONUS
  var copyText = document.querySelector("#password");

  copyText.select(); // selects the contents of the text area
  copyText.setSelectionRange(0, 99999); // necessary for some mobile browsers

  document.execCommand("copy"); // and copy the results to the clipboard

  alert("Copied the password to the clipboard.");
}

// Here's what actually makes the password
function generatePassword() {
  /* first, check the state of the options
      if the option is checked, build an array of those characters
      if no options are checked, complain to the user */
  var pwdLength = parseInt(lengthCheck.value); // we're going to be doing math to this, cast to Int
  /* do some sanity checks on pwdLength, complain and quit if it's out of bounds */
  if (pwdLength < 8) {
    alert("That is too short, your password must be at least 8 characters in length!");
    return "";
  }
  else if (pwdLength > 128) {
    alert("That is too long, your password must be no more than 128 characters in length!");
    return "";
  }
  var charTypes = []; // make an empty array for character types

  var useUpper = upperCaseChk.checked;
  if (useUpper) {
    var charUpper = "ABCDEFGHIKLMNOPQRSTUVWXYZ".split(""); // split the string into an array
    charTypes.push("u"); // add this character type to the charTypes array
  }

  var useLower = lowerCaseChk.checked;
  if (useLower) {
    var charLower = "abcdefghijklmnopqrstuvwxyz".split("");
    charTypes.push("l");
  }

  var useNum = numbersChk.checked;
  if (useNum) {
    var charNum = "0123456789".split("");
    charTypes.push("n");
  }

  var useSpecial = specialChk.checked;
  if (useSpecial) {
    var charSpec = "!@#$%^&*()[]{}-_.,:;'\"\\/|".split(""); // \ and " have to be escaped to be included in a string
    charTypes.push("s");
  }
  
  // Should complain and quit here if the user unchecks all the boxes
  if (
    useUpper === false &&
    useLower === false &&
    useNum === false &&
    useSpecial === false
  ) {
    alert("You have to choose at least one character type!");
    return "";
  }

  /* Now that we have the parameters from the user, time to make some
      ugly ASCII garbage */

  var genPass = "";

  for (var indexOuter = 0; indexOuter < pwdLength; indexOuter++) {
    // First, pick a character type at random from the types selected by the user
    var typeIndex = Math.floor(Math.random() * charTypes.length) + 0;
    
    var currentCharType = charTypes[typeIndex];

    var indexSwitch;
    // Then, add a random character of that type to the password string
    switch (currentCharType) {
      case "u":
        indexSwitch = Math.floor(Math.random() * charUpper.length);
        genPass = genPass + charUpper[indexSwitch];
        break;
      case "l":
        indexSwitch = Math.floor(Math.random() * charLower.length);
        genPass = genPass + charLower[indexSwitch];
        break;
      case "n":
        indexSwitch = Math.floor(Math.random() * charNum.length);
        genPass = genPass + charNum[indexSwitch];
        break;
      case "s":
        indexSwitch = Math.floor(Math.random() * charSpec.length);
        genPass = genPass + charSpec[indexSwitch];
        break;
    }
  }

  /* Now that we have our password, time to pass it to the caller */
  return genPass;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// BONUS EVENT LISTENER
copyBtn.addEventListener("click", copyToClipboard);