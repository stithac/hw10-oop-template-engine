// Employee class required
const Employee = require("./Employee");

// Manager class is a sub-class of the Employee class with following additional properties and methods: officeNumber, getRole() = 'manager'
class Manager extends Employee{

    // Constructor automatically invoked when class called
    constructor(name, id, email, officeNumber) {
      super(name, id, email);
        this.officeNumber = officeNumber;
    }

    // getOfficeNumber method returns officeNumber passed
    getOfficeNumber() {
        return this.officeNumber;
    }

    // getRole method returns the string 'employee'
    getRole() {
        return 'Manager';
    }

}

    module.exports = Manager;
