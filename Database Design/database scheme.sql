create database student_db;

use student_db;

create table students
(
    id       int primary key not null,
    password varchar(255) not null
);

create table personalData
(
    studentID int         not null,
    firstName varchar(50) not null,
    lastName  varchar(50) not null,
    birthday  timestamp   not null,
    gender    varchar(6)  not null,
    foreign key (studentID) references students (id) on delete cascade
);

create table contactData
(
    studentID   int          not null,
    email       varchar(255) not null,
    phoneNumber varchar(11)  not null,
    address     varchar(255) not null,
    foreign key (studentID) references students (id) on delete cascade
);

create table academicData
(
    studentID int           not null,
    level     int(1)        not null default 1,
    GPA       decimal(3, 2) not null default 0,
    foreign key (studentID) references students (id) on delete cascade
);

create table courses
(
    id   int auto_increment primary key,
    name varchar(255) not null,
    code varchar(5) not null
);

create table studentCourse
(
    id        int auto_increment primary key,
    studentID int    not null,
    courseID  int    not null,
    grade     int(3) not null,
    level     int(1) not null,
    semester  int(1) not null,
    foreign key (studentID) references students (id) on delete cascade,
    foreign key (courseID) references courses (id) on delete cascade,
    unique (studentID, courseID)
);

create table notes
(
    id              int auto_increment primary key,
    studentCourseID int not null,
    title           varchar(255),
    content         varchar(3000),
    foreign key (studentCourseID) references studentCourse (id) on delete cascade
);

insert into courses (code, name)
values ('HU332', 'Creative Thinking'),
       ('DS411', 'Decision and Game Theory'),
       ('MA112', 'Discrete Mathematics'),
       ('HU111', 'English'),
       ('HU323', 'Fundamentals of Accounting'),
       ('HU333', 'Mass Communication'),
       ('MA111', 'Mathematics-1'),
       ('MA113', 'Mathematics-2'),
       ('MA214', 'Mathematics-3'),
       ('MA315', 'Mathematics-4'),
       ('ST121', 'Probability and Statistics-1'),
       ('ST122', 'Probability and Statistics-2'),
       ('HU334', 'Professional Ethics'),
       ('HU112', 'Scientific & Technical Report Writing'),
       ('CS316', 'Algorithms'),
       ('CS361', 'Artificial Intelligence'),
       ('CS318', 'Assembly Language'),
       ('CS419', 'Compilers'),
       ('CS443', 'Computer Arabization'),
       ('CS322', 'Computer Architecture and Organization'),
       ('CS317', 'Concepts of Programming Languages'),
       ('CS214', 'Data Structures'),
       ('CS215', 'File Organization and Processing'),
       ('CS464', 'Genetic Algorithms'),
       ('CS453', 'Human Computer Interfaces'),
       ('CS111', 'Introduction to Computers'),
       ('CS465', 'Knowledge Base Systems'),
       ('CS221', 'Logic Design'),
       ('CS467', 'Machine Learning'),
       ('CS466', 'Multi-Agent Systems'),
       ('CS462', 'Natural Languages Processing'),
       ('CS463', 'Neural Networks'),
       ('CS241', 'Operating System-1'),
       ('CS342', 'Operating Systems-2'),
       ('CS471', 'Parallel Processing'),
       ('CS112', 'Programming-1'),
       ('CS213', 'Programming-2'),
       ('CS498', 'Project'),
       ('CS495', 'Selected Topics in Computer Science-1'),
       ('CS496', 'Selected Topics in Computer Science-2'),
       ('CS251', 'Software Engineering-1'),
       ('CS352', 'Software Engineering-2'),
       ('IS352', 'Analysis and Design of Information Systems-2'),
       ('IS332', 'Business Functions Classification'),
       ('IS421', 'Data Mining'),
       ('IS313', 'Data Storage and Retrieval'),
       ('IS422', 'Data Warehouses'),
       ('IS414', 'Database Design'),
       ('IS211', 'Database Systems 1'),
       ('IS312', 'Database Systems 2'),
       ('IS416', 'Distributed Databases'),
       ('IS442', 'E-Commerce'),
       ('IS231', 'Fundamentals of Information Systems'),
       ('IS443', 'Geographical Informatiopn Systems'),
       ('IS435', 'Information Centres Management'),
       ('IS453', 'Information Systems Development Methodologies'),
       ('IS441', 'Intelligent Information Systems'),
       ('IS345', 'Internet Applications'),
       ('IS446', 'Internet Information Systems'),
       ('IS333', 'Management Information Systems'),
       ('IS444', 'Multimedia Information Systems'),
       ('IS415', 'Object Oriented Databases'),
       ('IS498', 'Project'),
       ('IS434', 'Quality Assurance of Information Systems and programming'),
       ('IS495', 'Selected Topics in Information systems-1'),
       ('IS496', 'Selected Topics in Information systems-2'),
       ('IT321', 'Communication Technology'),
       ('IT432', 'Computer Animation'),
       ('IT311', 'Computer Architecture'),
       ('IT331', 'Computer Graphics-1'),
       ('IT332', 'Computer Graphics-2'),
       ('IT313', 'Computer Interfaces'),
       ('IT322', 'Computer Network-2'),
       ('IT222', 'Computer Networks-1'),
       ('IT444', 'Computer Vision'),
       ('IT221', 'Data Communication'),
       ('IT453', 'Digital Library'),
       ('IT341', 'Digital Signals Processing'),
       ('IT411', 'Distributed and Parallel Computer Systems'),
       ('IT451', 'E-Business'),
       ('IT452', 'E-Learning'),
       ('IT111', 'Electronic-1'),
       ('IT112', 'Electronics-2'),
       ('IT414', 'Embedded Systems'),
       ('IT413', 'Fault Tolerant Computer Systems'),
       ('IT441', 'Image Processing-1'),
       ('IT442', 'Image Processing-2'),
       ('IT423', 'Information and Computer Networks Security'),
       ('IT454', 'Information Engineering'),
       ('IT445', 'Intelligent and Quantum Computers'),
       ('IT223', 'Internet Technology'),
       ('IT312', 'Microprocessors'),
       ('IT433', 'Multimedia'),
       ('IT342', 'Pattern Recognition'),
       ('IT421', 'Planning and Design of Information Networks'),
       ('IT498', 'Project'),
       ('IT412', 'Real Time Systems'),
       ('IT415', 'Robotics'),
       ('IT495', 'Selected Topics in Information Technology-1 (Fuzzy)'),
       ('IT496', 'Selected Topics in Information Technology-2 (Network)'),
       ('IT241', 'Signals and Systems'),
       ('IT443', 'Speech processing'),
       ('IT431', 'Virtual Reality'),
       ('IT422', 'Wireless and Mobile Networks'),
       ('DS426', 'Advanced Project Management'),
       ('DS451', 'Advanced Topics in Intelligent Computational'),
       ('DS351', 'Computational Intelligence in Decision Support'),
       ('DS342', 'Computer Languages for Modeling'),
       ('DS443', 'Computer Simulation Languages'),
       ('DS432', 'Data Management in Decision Support'),
       ('DS332', 'Decision Support Systems and Applications'),
       ('DS331', 'Decision Support Tools and Techniques'),
       ('DS491', 'Elective Course'),
       ('DS492', 'Elective Course'),
       ('DS493', 'Elective Course'),
       ('DS121', 'Fundamentals of Economics'),
       ('DS122', 'Fundamentals of Management'),
       ('DS431', 'Geographic Information Systems for Decision Support'),
       ('DS211', 'Introduction to Decision Support and Systems'),
       ('DS424', 'Inventory Control and Production Management'),
       ('DS433', 'Knowledge Base Decision Support systems'),
       ('DS311', 'Linear and Integer Programming'),
       ('DS425', 'Logistics Management'),
       ('DS241', 'Modeling and Simulation'),
       ('DS414', 'Multi-Objective Programming'),
       ('DS413', 'Networks Optimization'),
       ('DS312', 'Non-Linear and Dynamic Programming'),
       ('DS313', 'Optimizations Techniques'),
       ('DS498', 'Project'),
       ('DS321', 'Projects Management'),
       ('DS423', 'Quantitative Models for Services'),
       ('DS422', 'Quantitative Models in Economics and Management'),
       ('DS415', 'Risk Management'),
       ('DS495', 'Selected Topics in Decision Support'),
       ('DS444', 'Simulation Games'),
       ('DS442', 'Simulation Models in management and Economics'),
       ('DS461', 'Statistical Analysis in Decision Support'),
       ('DS361', 'Stochastic Models in Operations Research and Decision Support'),
       ('DS462', 'Stochastic Programming'),
       ('DS412', 'Strategic and Crisis Management'),
       ('DS441', 'System Analysis and Modeling');