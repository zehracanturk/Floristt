function ValidateLoginForm() {
    RemoveAllErrorMessage();

    var email = document.getElementById('email-login').value;
    var password = document.getElementById('password-login').value;
    var PasswordValidationMessage;
    var emailValidationMessage;

    emailValidationMessage = isValidEmail(email);  
    if(emailValidationMessage != "valid"){
        ShowErrorMessage('email-login', emailValidationMessage);
        return false;
    }

    PasswordValidationMessage = isValidPassword(password);
    if(PasswordValidationMessage != "valid"){
        ShowErrorMessage('password-login', PasswordValidationMessage);
        return false;
    }

    return true;
}

function ValidateRegistrationForm() {
    RemoveAllErrorMessage();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email-registration').value;
    var password = document.getElementById('password-registration').value;
    var confirmPassword = document.getElementById('ConfirmPassword').value;

    var PasswordValidationMessage;
    var confirmPasswordMessage;
    var emailValidationMessage;

    if(name == ""){
        ShowErrorMessage('name', "Please fill the field.");
        return false;
    } else if(name.length < 3 || name.length > 20){
        ShowErrorMessage('name', "Name should be minimum 3 and maximum 20 characters long.");
        return false;
    }

    emailValidationMessage = isValidEmail(email);
    if(emailValidationMessage != "valid"){
        ShowErrorMessage('email-registration', emailValidationMessage);
        return false;
    }

    PasswordValidationMessage = isValidPassword(password);
    if(PasswordValidationMessage != "valid"){
        ShowErrorMessage('password-registration', PasswordValidationMessage);
        return false;
    }

    confirmPasswordMessage = isValidPassword(confirmPassword);
    if(confirmPasswordMessage != "valid"){
        ShowErrorMessage('ConfirmPassword', confirmPasswordMessage);
        return false;
    }

    if(confirmPassword != password){
        ShowErrorMessage('ConfirmPassword', "Passwords do not match.");
        return false;
    }

    return true;
}

function ValidateForgotPasswordForm() {
    RemoveAllErrorMessage();

    var forgotPassEmail = document.getElementById('forgotPassEmail').value;
    
    var emailValidationMessage;
    emailValidationMessage = isValidEmail(forgotPassEmail);

    if(emailValidationMessage != "valid"){
        ShowErrorMessage('forgotPassEmail', emailValidationMessage);
        return false;
    }
}

function ValidateResetPasswordForm() {
    RemoveAllErrorMessage();

    var NewPassword = document.getElementById('NewPassword').value;
    var ConfirmNewPassword = document.getElementById('ConfirmNewPassword').value;

    var PasswordValidationMessage;
    var ConfirmPasswordMessage;
    
    PasswordValidationMessage = isValidPassword(NewPassword);
    if(PasswordValidationMessage != "valid"){
        ShowErrorMessage('NewPassword', PasswordValidationMessage);
        return false;
    }

    ConfirmPasswordMessage = isValidPassword(ConfirmNewPassword);
    if(ConfirmPasswordMessage != "valid"){
        ShowErrorMessage('ConfirmNewPassword', ConfirmPasswordMessage);
        return false;
    }

    if(NewPassword != ConfirmNewPassword){
        ShowErrorMessage('ConfirmNewPassword', "Passwords do not match.");
        return false;
    }

    return true;
}

function RemoveAllErrorMessage() {
    var allErrorMessage = document.getElementsByClassName('error-message');
    var allErrorFiled = document.getElementsByClassName('error-input');
    var i;

    for(i = (allErrorMessage.length - 1); i >= 0; i--){
        allErrorMessage[i].remove();
    }

    for(i = (allErrorFiled.length - 1); i >= 0; i--){
        allErrorFiled[i].classList.remove('error-input');
    }
}

function ShowErrorMessage(InputBoxID, Message) {
    var InputBox = document.getElementById(InputBoxID);
    InputBox.classList.add('error-input');
    InputBox.focus();

    var ErrorMessageElement = document.createElement("p");
    ErrorMessageElement.innerHTML = Message;
    ErrorMessageElement.classList.add('error-message');
    ErrorMessageElement.setAttribute("id", InputBoxID + '-error');

    InputBox.parentNode.insertBefore(ErrorMessageElement, InputBox.nextSibling);
}

function isValidEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email == ""){
        return "Please fill the field.";
    }

    if(emailRegex.test(email) == false){
        return "This is not a valid email.";
    }

    return "valid";
}

function isValidPassword(password) {
    const minLength = 8;
    const maxLength = 32;

    if(password == ""){
        return "Please fill the field."
    }

    if(password.length < minLength || password.length > maxLength) {
        return "Password length should be minimum 8 & maximum 32 characters.";
    }

    return "valid";
}
