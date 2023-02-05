const faker = require('faker')
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
})
connection.connect()
// -------------------------------------

const generateStudentData = (i) => {
    const studentID = 20210000 + i;
    const password = faker.internet.password(6);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const birthday = faker.date.between('1998-01-01', '2004-8-31')
    const gender = faker.random.arrayElement(['male', 'female']);
    const email = faker.internet.email();
    let phoneNumber = faker.random.arrayElement(['010', '011', '012', '015'])
    phoneNumber += faker.random.number({ min: 10000000, max: 99999999 });
    const address = faker.address.streetAddress();
    const level = faker.random.number({min: 1, max: 4});
    const GPA = parseFloat(faker.finance.amount(0, 4, 2)).toFixed(2);

    return {studentID, password, firstName, lastName, birthday, gender, email, phoneNumber, address, level, GPA};
}

function insertNewStudent(student) {
    const {
        studentID,
        password,
        firstName,
        lastName,
        birthday,
        gender,
        email,
        phoneNumber,
        address,
        level,
        GPA
    } = student;
    connection.query('insert into students set ?', {
        id: studentID,
        password
    }, function (err, rows, fields) {
        if (err) throw err;
    })
    connection.query('insert into personalData set ?', {
        studentID,
        firstName,
        lastName,
        birthday,
        gender
    }, function (err, rows, fields) {
        if (err) throw err;
    })
    connection.query('insert into contactData set ?', {
        studentID,
        email,
        phoneNumber,
        address
    }, function (err, rows, fields) {
        if (err) throw err;
    })
    connection.query('insert into academicData set ?', {studentID, level, GPA}, function (err, rows, fields) {
        if (err) throw err;
    })
}

for (i = 0; i < 500; i++) {
    const student = generateStudentData(i);
    insertNewStudent(student)
}

//-----------------------------------------
connection.end()