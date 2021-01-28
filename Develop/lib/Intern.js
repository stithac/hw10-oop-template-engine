// Employee class required
const Employee = require("./Employee");

// Intern class is a sub-class of the Employee class with following additional properties and methods: school, getSchool(), getRole() = 'manager'
class Intern extends Employee{

    // Constructor automatically invoked when class called
    constructor(name, id, email, school) {
      super(name, id, email);
        this.school = school;
    }

    // geSchool method returns school that is passed
    getSchool() {
        return this.school;
    }

    // getRole method returns the string 'intern'
    getRole() {
        return 'Intern';
    }

}

    module.exports = Intern;