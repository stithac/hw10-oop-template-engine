const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];


function createTeamManager () {

    console.log(`Welcome to the ACS Team Generator App! \n\nEnter your Team's information:`);

    inquirer
      .prompt([
        {
            type: "input",
            name: "teamName",
            message: "Team Name:",
            validate: input => {
                if (input === ''){
                    return 'Enter at least one character.';
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "managerName",
            message: "Team Manager's name:",
            validate: input => {
                if (input === ''){
                    return 'Enter at least one character.';
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "Team Manager's 5-character id:",
            validate: input => {
                if (input.toString().length !== 5){
                    return 'Enter a valid 5-character id';
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Team Manager's email:",
            validate: input => {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)){
                    return true;
                } else {
                    return 'Enter a valid email address';
                }
            }
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "Team Manager's office number:",
            validate: input => {
                if (input.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)){
                    return true;
                } else {
                    return 'Enter a valid 10-digit phone number';
                }
            }
        }
      ])
      .then(val => {
        // console.log(val); // testing
        const manager = new Manager(val.managerName, val.managerId, val.managerEmail, val.managerOfficeNumber);
        // console.log(manager);// testing

        team.push(manager);

        createTeamMember();
      });
}

function createTeamMember() {
    console.log(`\n\nEnter a Team Member's information:`);

    inquirer
      .prompt([
        {
            type: "list",
            name: "memberType",
            message: "User type (intern / engineer):",
            choices: ['Intern', 'Engineer']
        },

      ])
      .then(val => {
        //   console.log(val);// testing
        if (val.memberType === 'Intern'){
            createIntern();
        } else if (val.memberType === 'Engineer'){
            createEngineer();
        }
      });
}

function createIntern() {
    inquirer
      .prompt([
        {
            type: "input",
            name: "internName",
            message: "Team Member's name:",
            validate: input => {
                if (input === ''){
                    return 'Enter at least one character.';
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "internId",
            message: "Team Member's 5-character id:",
            validate: input => {
                if (input.toString().length !== 5){
                    return 'Enter a valid 5-character id';
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "Team Member's email:",
            validate: input => {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)){
                    return true;
                } else {
                    return 'Enter a valid email address';
                }
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "Team Member's school:",
            validate: input => {
                if (input === ''){
                    return 'Enter at least one character.';
                } else {
                    return true;
                }
            }
        },

      ]).then(val => {
        // console.log(val); // testing
        const intern = new Intern(val.internName, val.internId, val.internEmail, val.internSchool);
        // console.log(manager);// testing
        team.push(intern);
        addNewMember();

      });
}

function createEngineer() {
    inquirer
      .prompt([
        {
            type: "input",
            name: "engineerName",
            message: "Team Member's name:",
            validate: input => {
                if (input === ''){
                    return 'Enter at least one character.';
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "Team Member's 5-character id:",
            validate: input => {
                if (input.toString().length !== 5){
                    return 'Enter a valid 5-character id';
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "Team Member's email:",
            validate: input => {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input)){
                    return true;
                } else {
                    return 'Enter a valid email address';
                }
            }
        },
        {
            type: "input",
            name: "engineerGitHub",
            message: "Team Member's GitHub username:",
            validate: input => {
                if (input === ''){
                    return 'Enter at least one character.';
                } else {
                    return true;
                }
            }
        },

      ]).then(val => {
        // console.log(val); // testing
        const engineer = new Engineer(val.engineerName, val.engineerId, val.engineerEmail, val.engineerGitHub);

        team.push(engineer);
        addNewMember();

      });
}

function addNewMember (){
    inquirer.prompt([
        {
            type: "list",
            name: "addMemberChoice",
            message: "Do you have additional team member(s) to add? (Y / N)",
            choices:['Y','N']
        }])
        .then(val =>{
            if(val.addMemberChoice === 'Y'){
                createTeamMember();
            } else {
                console.log(team);

                createHtmlFile();
            }
        })
}

function createHtmlFile() {
    if(fs.existsSync(OUTPUT_DIR) === false){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(team, ), "utf-8");

}

createTeamManager (); // Function invoked when app loaded