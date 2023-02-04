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


function validateLogin(data) {
    let warningMessage = '';
    warningMessage += checkStudentID(data.studentID);
    warningMessage += checkPassword(data.password);
    return warningMessage
}

function validateRegister(data) {
    let warningMessage = '';
    warningMessage += checkStudentID(data.studentID);
    warningMessage += checkPassword(data.password);
    warningMessage += checkName(data.firstName);
    warningMessage += checkName(data.lastName);
    warningMessage += checkBirthday(data.birthday);
    warningMessage += checkGender(data.gender);
    warningMessage += checkEmail(data.email);
    warningMessage += checkPhoneNumber(data.phoneNumber);
    warningMessage += checkAddress(data.address);
    warningMessage += checkLevel(data.level);
    warningMessage += checkGPA(data.gpa);
    return warningMessage;
}

function validateEditingProfile(data) {
    let dummy = '0000';
    data['birthday'] = dummy
    data['gender'] = dummy
    return validateRegister(data);
}

function validateCourseInfo(data) {
    let warningMessage = '';
    warningMessage += checkCourseID(data.courseID);
    warningMessage += checkGrade(data.courseGrade);
    warningMessage += checkLevel(data.courseLevel);
    warningMessage += checkSemester(data.courseSemester);
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

function validateNoteInfo(data) {
    let warningMessage = '';
    warningMessage += checkTitle(data.title);
    warningMessage += checkContent(data.content);
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