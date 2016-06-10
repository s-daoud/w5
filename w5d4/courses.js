"use strict"

function Student(fname, lname) {
  this.name = `${fname} ${lname}`;
  this.courses = [];
}

Student.prototype.allCourses = function() {
  let courseList = [];
  this.courses.forEach(course => courseList.push(course.courseName));
  return courseList;
};

Student.prototype.enroll = function(course) {
  let conflict = false;
  this.courses.forEach(oldCourse => {
    if(oldCourse.conflictsWith(course)) {
      console.log(`Jokes on you, ${course.courseName} conflicts with ${oldCourse.courseName}.`);
      conflict = true;
    }
  });

  if (conflict === false && !this.courses.includes(course)) {
    this.courses.push(course);
    course.students.push(this);
  }
};

Student.prototype.courseLoad = function() {
  let courseLoadHash = {};

  this.courses.forEach(function(course) {
    if (courseLoadHash[course.department] === undefined) {
      courseLoadHash[course.department] = course.credits;
    } else {
      let num = courseLoadHash[course.department];
      num += course.credits;
      courseLoadHash[course.department] = num;
    }
  });
  console.log(courseLoadHash);

};

function Course(courseName, department, credits, days, timeBlock) {
  this.courseName = courseName;
  this.department = department;
  this.credits = credits;
  this.days = days;
  this.timeBlock = timeBlock;

  this.students = [];
}

Course.prototype.addStudent = function(student) {
  student.enroll(this);
};

Course.prototype.allStudents = function() {
  let studentList = [];
  this.students.forEach(student => studentList.push(student.name));
  return studentList;
};

Course.prototype.conflictsWith = function(secondCourse) {
  if (this.timeBlock === secondCourse.timeBlock &&
    this.days.diff(secondCourse.days).length !== this.days.length) {
    return true;
  } else {
    return false;
  }
};

Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

let s1 = new Student("Bob", "Parker");
let s2 = new Student("Elon", "Musk");
let s3 = new Student("Larry", "Page");



let c1 = new Course("Ruby", "CompSci", 4, [1, 3, 4], 4);
let c2 = new Course("JavaScript", "CompSci", 1, [3, 4, 5], 4);
let c3 = new Course("Biology", "Science", 3, [2, 5], 1);


s1.enroll(c1);
s1.enroll(c2);
s1.enroll(c3);

s2.enroll(c3);
s2.enroll(c1);

c2.addStudent(s3);

console.log(s1.allCourses());
console.log(c1.allStudents());
s1.courseLoad();
console.log(s3.allCourses());
console.log(c2.allStudents());
