// TODO: Write code to define and export the Employee class

// Employee class with following properties and methods: name, id, email, getName(), getId(), getEmail(), getRole() = 'employee'
class Employee {

    // Constructor automatically invoked when class called
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }

    // getName method returns the name passed in
    getName() {
        return this.name;
    }

    // getId method returns the id passed in
    getId() {
        return this.id;
    }

    // getEmail method returns the email passed in
    getEmail() {
        return this.email;
    }

    // getRole method returns the string 'employee'
    getRole() {
        return 'Employee';
    }
  }

    module.exports = Employee;