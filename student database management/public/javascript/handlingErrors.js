function checkStudentID(studentID) {
    if (studentID.length !== 8 || !/^\d+$/.test(studentID)) {
        return "ID must be 8 digits and only contain numbers.\n";
    } else {
        return '';
    }
}

function checkPassword(password) {
    let error = '';
    if (!password.length) {
        error += "You must enter a password!\n";
    }
    if (!password.length || password.length > 255) {
        error += "Password length must not be greater than 255 characters.\n";
    }
    return error;
}

function checkName(name) {
    console.log(name.length)
    let error = '';
    if (!name.length) {
        error += "You must enter your name!\n";
    }
    if (name.length > 50) {
        error += "Name must be a string of length no greater than 50 characters.\n";
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
        error += "Name must contains only an alphabetic characters.\n";
    }
    return error;
}

function checkEmail(email) {
    let error = '';
    if (!email.length) {
        error += "You must Enter your email!\n";
    }
    if (!/^[^@]+@[^\.]+\.[^\.]+$/.test(email)) {
        error += "Email must be a valid email address\n";
    }
    if (email.length > 255) {
        error += "Email must be of length no greater than 255 characters.\n";
    }
    return error;
}

function checkPhoneNumber(phoneNumber) {
    let error = '';
    if (phoneNumber.length !== 11) {
        error += "Phone number must be 11 digits.\n";
    }
    if (!/^(010|011|012|015)\d+$/.test(phoneNumber)) {
        error += "Phone number must start with 010, 011, 012, or 015.\n";
    }
    return error;
}

function checkAddress(address) {
    let error = '';
    if (!address.length) {
        error += "You must enter your address!.\n";
    }
    if (address.length > 255) {
        error += "Address length must not be greater than 255 characters.\n";
    }
    return error;
}

function checkLevel(level) {
    let error = '';
    if (level === '') {
        error += "You must enter your level!.\n";
    }
    if (isNaN(level) || level < 1 || level > 4) {
        error += "Level must be a number between 1 and 4.\n";
    }
    return error;
}

function checkGPA(gpa) {
    let error = '';
    if (!gpa.length) {
        error += "You must enter your gpa!.\n";
    }
    if (!/^[0-4](\.\d{1,2})?$/.test(gpa)) {
        error += "GPA must be a number between 0 and 4, with a maximum of 2 decimal places.\n";
    }
    return error;
}

function checkBirthday(birthday) {
    if (!birthday.length) {
        return "You must enter your birthday!.\n";
    } else return '';
}

function checkGender(gender) {
    if (typeof gender === 'undefined') {
        return "You must choose your gender!.\n";
    } else return '';
}

function checkCourseID(courseID) {
    if (!courseID.length) {
        return  "You must choose course from the courses' list!.\n";
    } else return '';
}

function checkGrade(grade) {
    let error = '';
    if (grade === '') {
        error += "You must enter your grade!.\n";
    }
    console.log(grade)
    if (isNaN(grade) || grade < 0 || grade > 100) {
        error += "Grade must be a number between 0 and 100.\n";
    }
    return error;
}

function checkSemester(semester) {
    let error = '';
    if (semester === '') {
        error += "You must enter your semester!.\n";
    }
    if (isNaN(semester) || semester < 1 || semester > 2) {
        error += "Semester must be a number 1 or 2.\n";
    }
    return error;
}

function validateLogin(studentID, password) {
    let warningMessage = '';
    warningMessage += checkStudentID(studentID);
    warningMessage += checkPassword(password);
    return warningMessage
}

function validateRegister(studentID, password, firstName, lastName, birthday, gender, email, phoneNumber,
                          address, level, gpa) {
    let warningMessage = '';
    warningMessage += checkStudentID(studentID);
    warningMessage += checkPassword(password);
    warningMessage += checkName(firstName);
    warningMessage += checkName(lastName);
    warningMessage += checkBirthday(birthday);
    warningMessage += checkGender(gender);
    warningMessage += checkEmail(email);
    warningMessage += checkPhoneNumber(phoneNumber);
    warningMessage += checkAddress(address);
    warningMessage += checkLevel(level);
    warningMessage += checkGPA(gpa);
    return warningMessage;
}

function validateEditingProfile(studentID, password, firstName, lastName, email, phoneNumber, address, level, gpa) {
    let dummy = '0000';
    return validateRegister(studentID, password, firstName, lastName, dummy, dummy, email, phoneNumber, address,
        level, gpa);
}

function validateCourseInfo(courseID, courseGrade, courseLevel, courseSemester) {
        let warningMessage = '';
        warningMessage += checkCourseID(courseID);
        warningMessage += checkGrade(courseGrade);
        warningMessage += checkLevel(courseLevel);
        warningMessage += checkSemester(courseSemester);
        return warningMessage;
}

module.exports = {validateLogin, validateRegister, validateEditingProfile, validateCourseInfo}