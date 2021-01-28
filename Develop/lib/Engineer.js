// Employee class required
const Employee = require("./Employee");

// Intern class is a sub-class of the Employee class with following additional properties and methods: github, getGithub(), getRole() = 'engineer'
class Engineer extends Employee{

    // Constructor automatically invoked when class called
    constructor(name, id, email, github) {
      super(name, id, email);
        this.github = github;
    }

    // geSchool method returns school that is passed
    getGithub() {
        return this.github;
    }

    // getRole method returns the string 'intern'
    getRole() {
        return 'Engineer';
    }

}

    module.exports = Engineer;