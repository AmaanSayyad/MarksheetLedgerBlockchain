pragma solidity ^0.5.16;

contract MarksheetStorage {
 
  struct MarksheetRow {
    string subject_name;
    uint marks_obtained;
    uint total_marks;
    bool pass;
  }
  struct Marksheet {
    uint marksheet_id;
    uint total_subjects;
    string marksheet_title;
    bool active;
    mapping(uint => MarksheetRow) marksheetRows;
  }
 
 
  struct Student {
    uint id;
    string name;
    uint total_marksheets;
    bool active;
    mapping(uint => Marksheet) marksheets;
  }
 
  mapping(uint => Student) students;

 
  function addStudent(uint id, string memory student_name) public returns(uint return_id) {
    if(students[id].active ){
      return id;
    }
    students[id].name = student_name;
    students[id].id = id;
    students[id].total_marksheets = 0;
    students[id].active = true;
    return (id);
  }
 
  function getStudentName(uint id) public view returns(string memory name) {
    return(students[id].name);
  }

  function getStudentMarksheetsCount(uint id) public view returns(uint total_marksheets) {
    return(students[id].total_marksheets);
  }

  function addMarksheet(uint id, string memory marksheet_title, uint total_subjects) public returns( uint marksheet_id) {
    if(students[id].marksheets[students[id].total_marksheets].active ){
      return id;
    }
    students[id].marksheets[students[id].total_marksheets].marksheet_title = marksheet_title; 
    students[id].marksheets[students[id].total_marksheets].total_subjects = total_subjects; 
    students[id].total_marksheets = students[id].total_marksheets + 1;
    students[id].marksheets[students[id].total_marksheets].active  = true;
    return students[id].total_marksheets ;
  }
  
  function addMarksheetRow(uint id, uint marksheet_id, uint marksheet_row_id, string memory subject_name, uint marks_obtained, uint total_marks, bool pass) public returns(uint return_marksheet_row_id) {
    students[id].marksheets[marksheet_id].marksheetRows[marksheet_row_id] = MarksheetRow({
      subject_name : subject_name,
      marks_obtained : marks_obtained,
      total_marks : total_marks,
      pass: pass
    });
   return marksheet_row_id;
 }

  function getMarks(uint id,uint marksheet_id, uint marksheet_row_id ) public view returns(string memory subject_name, uint marks_obtained, uint total_marks) {
    return(students[id].marksheets[marksheet_id].marksheetRows[marksheet_row_id].subject_name, students[id].marksheets[marksheet_id].marksheetRows[marksheet_row_id].marks_obtained, students[id].marksheets[marksheet_id].marksheetRows[marksheet_row_id].total_marks);
  }
 
 
}
