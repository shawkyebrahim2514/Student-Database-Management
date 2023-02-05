-- ################################# Students #################################
-- ------------------------- Register students -------------------------
-- inserting into students table
INSERT INTO students (id, password)
values (${data.studentID}, '${data.password}');

-- inserting into personalData table
INSERT INTO personalData (studentID, firstName, lastName, birthday, gender)
values (${data.studentID}, '${data.firstName}', '${data.lastName}', '${data.birthday}',
        '${data.gender}');

-- inserting into contactData table
INSERT INTO contactData (studentID, email, phoneNumber, address)
values (${data.studentID}, '${data.email}', '${data.phoneNumber}', '${data.address}');

-- inserting into academicData table
INSERT INTO academicData (studentID, level, GPA)
values (${data.studentID}, ${data.level}, ${data.gpa});

-- deleting from unregisteredStudents table
delete
from unregisteredStudents
where id = ${data.studentID};


-- ------------------------- login -------------------------
-- collect student ID and password to verify the login
select *
from students
where id = ${studentID};

-- collect all student data to show it in his profile page
select students.id             as studentID,
       students.password       as password,
       personalData.firstName  as firstName,
       personalData.lastName   as lastName,
       personalData.birthday   as birthday,
       personalData.gender     as gender,
       contactData.email       as email,
       contactData.phoneNumber as phoneNumber,
       contactData.address     as address,
       academicData.level      as level,
       academicData.GPA        as gpa
from students
         join personalData on students.id = personalData.studentID
         join contactData on students.id = contactData.studentID
         join academicData on students.id = academicData.studentID
where students.id = ${studentID};


-- ------------------------- update students data -------------------------
-- update student's password
update students
set password = '${data.password}'
where id = ${data.studentID};

-- update student's personal data
update personalData
set firstName = '${data.firstName}',
    lastName  = '${data.lastName}'
where studentID = ${data.studentID};

-- update student's contact data
update contactData
set email       = '${data.email}',
    phoneNumber = '${data.phoneNumber}',
    address     = '${data.address}'
where studentID = ${data.studentID};

-- update students academic data
update academicData
set level = '${data.level}',
    gpa   = '${data.gpa}'
where studentID = ${data.studentID};

-- ------------------------- courses -------------------------
-- select all existing courses materials
select id, name, code
from courses;

-- collect all studentCourses data of a student
select studentCourse.id       as courseID,
       courses.name           as courseName,
       courses.code           as courseCode,
       studentCourse.grade    as courseGrade,
       studentCourse.level    as courseLevel,
       studentCourse.semester as courseSemester
from students
         join studentCourse on students.id = studentCourse.studentID
         join courses on studentCourse.courseID = courses.id
where students.id = ${req.session.user.id}
order by courseLevel, courseSemester;

-- check a course belongs to a student
select studentID
from studentCourse
where studentID = ${studentId}
  and courseID = ${courseID};

-- inserting a new course into studentCourse
INSERT INTO studentCourse (studentID, courseID, grade, level, semester)
values (${studentID}, ${data.courseID}, ${data.courseGrade},
        ${data.courseLevel}, ${data.courseSemester});

-- collect studentCourse information
select courses.id             as courseID,
       courses.code           as courseCode,
       courses.name           as courseName,
       studentCourse.grade    as courseGrade,
       studentCourse.level    as courseLevel,
       studentCourse.semester as courseSemester
from studentCourse
         join courses on studentCourse.courseID = courses.id
where studentCourse.id = ${studentCourseID};

-- update studentCourse information
update studentCourse
set courseID = '${data.courseID}',
    grade    = ${data.courseGrade},
    level    = ${data.courseLevel},
    semester = ${data.courseSemester}
where id = ${studentCourseID};

-- delete studentCourse
delete
from studentCourse
where id = ${studentCourseID};


-- ------------------------- notes -------------------------
-- collect all notes data of a studentCourse
select notes.id          as noteID,
       if(char_length(notes.title) > 45, concat(substr(notes.title, 1, 45), '...'),
          notes.title)   as noteTitle,
       if(char_length(notes.content) > 100,
          concat(substr(notes.content, 1, 100), '...'),
          notes.content) as noteContent
from notes
         join studentCourse on notes.studentCourseID = studentCourse.id
where studentCourse.id = ${studentCourseID};

-- search in studentCourse notes
select notes.id          as noteID,
       if(char_length(notes.title) > 45, concat(substr(notes.title, 1, 45), '...'),
          notes.title)   as noteTitle,
       if(char_length(notes.content) > 100,
          concat(substr(notes.content, 1, 100), '...'),
          notes.content) as noteContent
from notes
         join studentCourse on notes.studentCourseID = studentCourse.id
where studentCourse.id = ${studentCourseID}
  and (notes.title like '%${searchWord}%'
    or notes.content like '%${searchWord}%');

-- add new note to a studentCourse
insert into notes (studentCourseID, title, content)
values (${req.params.studentCourseID}, '${req.body.title}', '${req.body.content}');

-- collect note information
select title, content
from notes
where notes.id = ${noteID};

-- update note data
update notes
set title   = '${req.body.title}',
    content = '${req.body.content}'
where id = ${req.params.noteID};

-- delete note
delete
from notes
where id = ${noteID};


-- ################################# Admins #################################
-- ------------------------- Login -------------------------
-- collect admin ID and password to verify the login
select *
from admins
where id = '${adminID}';


-- ------------------------- Admin panel -------------------------
-- Collect admin information to show it in admin panel
select admin_db.personalData.firstName   as firstName,
       admin_db.personalData.lastName    as lastName,
       admin_db.personalData.phoneNumber as phoneNumber,
       admin_db.personalData.email       as email
from admins
         join personalData on admins.id = admin_db.personalData.adminID
where admins.id = '${req.session.user.id}';

-- Check if a range of IDs exist in students table
select id
from students
where id between ${startID} and ${endID};

-- Check if a range of IDs exist in unregisteredStudents table
select id
from unregisteredStudents
where id between ${startID} and ${endID};

-- Insert a range of IDs to unregisteredStudents table
INSERT INTO unregisteredStudents (id)
VALUES ?;


-- ------------------------- Show students data -------------------------
-- Show students that their IDs are in a range of IDs
select students.id            as studentID,
       personalData.firstName as firstName,
       personalData.lastName  as lastName,
       academicData.level     as level,
       academicData.GPA       as gpa
from students
         join personalData on students.id = personalData.studentID
         join contactData on students.id = contactData.studentID
         join academicData on students.id = academicData.studentID
where students.id between ${startID} and ${endID};

-- Show students that their level is equal to a specific level
select students.id            as studentID,
       personalData.firstName as firstName,
       personalData.lastName  as lastName,
       academicData.level     as level,
       academicData.GPA       as gpa
from students
         join personalData on students.id = personalData.studentID
         join contactData on students.id = contactData.studentID
         join academicData on students.id = academicData.studentID
where academicData.level = ${level};

-- Show students that their GPAs are in a range of GPAs
select students.id            as studentID,
       personalData.firstName as firstName,
       personalData.lastName  as lastName,
       academicData.level     as level,
       academicData.GPA       as gpa
from students
         join personalData on students.id = personalData.studentID
         join contactData on students.id = contactData.studentID
         join academicData on students.id = academicData.studentID
where academicData.gpa between ${startGPA} and ${endGPA};


-- ------------------------- Edit students data -------------------------
-- Get the column data type
SELECT data_type
FROM information_schema.columns
WHERE table_schema = 'student_db'
  AND table_name = '${tableName}'
  AND column_name = '${columnName}';

-- Update a table with a column of an integer data type
update ${data.tableName}
set ${data.columnName} = ${data.updateValue}
where studentID between ${data.startID} and ${data.endID};

-- Update a table with a column of a non integer data type
update ${data.tableName}
set ${data.columnName} = '${data.updateValue}'
where studentID between ${data.startID} and ${data.endID};