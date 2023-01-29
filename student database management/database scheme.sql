create database student_db;

use student_db;

create table students
(
    id       int primary key,
    password varchar(255)
);

create table personalData
(
    studentID int,
    firstName varchar(50),
    lastName  varchar(50),
    birthday  timestamp,
    gender    varchar(6),
    foreign key (studentID) references students (id) on delete cascade
);

create table contactData
(
    studentID   int,
    email       varchar(255),
    phoneNumber varchar(11),
    address     varchar(255),
    foreign key (studentID) references students (id) on delete cascade
);

create table academicData
(
    studentID int,
    level     int(1),
    GPA       decimal(3, 2),
    foreign key (studentID) references students (id) on delete cascade
);

create table courses
(
    studentID int,
    id        int auto_increment primary key,
    name      varchar(255),
    grade     int(3),
    level     int(1),
    semester  int(1)
);

create table coursesNotes
(
    id       int auto_increment primary key,
    courseID int,
    title    varchar(255),
    content  varchar(5000),
    foreign key (courseID) references courses (id) on delete cascade
);