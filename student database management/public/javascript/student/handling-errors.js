const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

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
    if (password.length > 255) {
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
        return "You must choose course from the courses' list!.\n";
    } else return '';
}

function checkGrade(grade) {
    let error = '';
    if (grade === '') {
        error += "You must enter your grade!.\n";
    }
    return error;
}

function checkSemester(semester) {
    let error = '';
    if (semester === '') {
        error += "You must enter your semester!.\n";
    }
    return error;
}

function checkTitle(title) {
    let error = '';
    if (title.length > 255) {
        error += 'Title must not be greater than 255 characters'
    }
    return error;
}

function checkContent(content) {
    let error = '';
    if (content.length > 3000) {
        error += 'Content must not be greater than 3000 characters'
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

function checkStudentSession(req) {
    return req.session.user && req.session.user.userType === 'student';
}

async function checkStudentHaveCourse(studentID, studentCourseID) {
    let sql = makeQueryForCheckStudentHaveCourse(studentCourseID)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            if (!results.length || results[0].studentID != studentID) {
                resolve(0)
            } else {
                resolve(1)
            }
        });
    });
}

function makeQueryForCheckStudentHaveCourse(studentCourseID) {
    return `select studentID
            from studentCourse
            where id = ${studentCourseID} limit 1`
}

function validateNoteInfo(title, content) {
    let warningMessage = '';
    warningMessage += checkTitle(title);
    warningMessage += checkContent(content);
    return warningMessage;
}

module.exports = {
    validateLogin,
    validateRegister,
    validateEditingProfile,
    validateCourseInfo,
    checkStudentSession,
    validateNoteInfo,
    checkStudentHaveCourse
}