const registerForm = document.querySelector('#register-form');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const email = document.querySelector('#email');

/* change regex as per requirement */
//length 3 - 20 only contains alphanumeric and _ and .
const usernameRegex = /^[a-zA-Z0-9_.]{3,20}$/g
//length 8 - 25 , atleast one lowercase , one uppercase ,one number and  optional special characters
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,25}$/g
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi

const setError = (field, message) => {
    const parent = field.parentElement;
    const msgField = parent.querySelector('#message');
    msgField.textContent = message;
    msgField.classList.add('error');
    field.classList.add('error-field');
}

const setSuccess = (field) => {
    const parent = field.parentElement;
    const msgField = parent.querySelector('#message');
    msgField.textContent = 'Looks good';
    msgField.classList.add('success')
    field.classList.add('success-field');
}

const validateUsername = () => {
    if (!username.value.match(usernameRegex)) {
        setError(username, 'Username must be between 3-20 characters long and can only contain alphabets , numbers , _ or .');
        return false;
    }
    setSuccess(username);
    return true;
}

const validatePassword = () => {
    if (!password.value.match(passwordRegex)) {
        setError(password, 'Password should be between 8-25 characters long and should contain atleast one lowercase , one uppercase , one number and any of the permitted characters : ~@#$%^&*+=`|{}:;!.?"()[]-');
        return false;
    }
    setSuccess(password);
    return true;
}

const validateEmail = () => {
    if (!email.value.match(emailRegex)) {
        setError(email, 'Not a valid email');
        return false;
    }
    setSuccess(email);
    return true;
}

// validate when input field is out of focus
username.addEventListener('blur', validateUsername);
password.addEventListener('blur', validatePassword);
email.addEventListener('blur', validateEmail);


registerForm.addEventListener('submit', (evt) => {
    let returnVal = true;
    if (!validateUsername())
        returnVal = false;
    if (!validatePassword())
        returnVal = false;

    if (!validateEmail())
        returnVal = false;

    if (!returnVal)
        evt.preventDefault();

})