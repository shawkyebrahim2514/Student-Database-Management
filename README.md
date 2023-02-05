# Student Database Management
This repository contains a student database management system, where you can store, manage, and retrieve information about students. The system is built using Node.js, Express, and MySQL.

## Features for admins
* Store and manage student data
* Add, edit, and delete students
* Retrieve information about students
* Filter students based on different criteria

## Features for students
* Can edit their profiles' information
* Can add their courses
* Can store notes in their courses

## Prerequisites
* Node.js
* Express
* HTML
* CSS
* MySQL

## Project Structure
* Models
  * Admin
    * Students
      * add.js
      * delete.js
      * edit.js
      * main.js
    * login.js
    * main.js
  * Student
    * Courses
      * add.js
      * delete.js
      * edit.js
      * main.js
    * Notes
      * add.js
      * delete.js
      * edit.js
      * main.js
    * Profile
      * edit.js
      * main.js
    * login.js
    * register.js
* Views
  * Admin
    * Students
      * add.js
      * delete.js
      * edit.js
      * main.js
    * login.js
    * main.js
  * Student
    * Courses
      * add.js
      * edit.js
      * main.js
    * Notes
      * add.js
      * edit.js
      * main.js
    * Profile
      * edit.js
      * main.js
    * login.js
    * register.js
    * main.js
* Controllers
  * Admin
    * Students
      * add.js
      * delete.js
      * edit.js
      * main.js
    * login.js
    * main.js
  * Student
    * Courses
      * add.js
      * delete.js
      * edit.js
      * main.js
    * Notes
      * add.js
      * delete.js
      * edit.js
      * main.js
    * Profile
      * edit.js
      * main.js
    * login.js
    * register.js
* Routes
  * Admin
    * admin.js
  * Student
    * profile.js
    * login.js
    * register
    * courses.js
* Public
  * CSS
    * styles.css
  * Javascript
    * Admin
      * Students
        * edit.js
        * show.js
      * handling-errors.js
      * utility-functions.js
    * Student
      * Courses
        * add.js
      * handling-errors.js
      * utility-functions.js

## Getting Started
Clone the repository to your local machine.
```bash
   git clone https://github.com/shawkyebrahim2514/Student-Database-Management
```

## Install the required dependencies.
```
   npm install
```

> Access the application by navigating to http://localhost:3000 in your web browser.

## Database Design
<img src="./Database Design/database diagram.svg">

> You can see <a href="./Database Design/database scheme.sql">Database Scheme</a> for this project

> You can see <a href="./Database Design/database queries.sql">Database Quiries</a> that used in this project
