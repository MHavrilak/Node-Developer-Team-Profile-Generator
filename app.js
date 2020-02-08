var inquirer = require('inquirer');
var jest = require('jest');
var fs = require('fs');

var employees = [];

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose One!",
            choices: ["Add Team Member", "Complete!"],
            name: "Command"
        }
    ]).then(choice => {
        if (choice.Command === "Complete!") {
            generateHTML()
        } else {
            addMember()
        }
    })
};

start();

function addMember() {
    inquirer
        .prompt([
            {
                type: "text",
                message: "Please provide your email",
                name: "Email",

            },
            {
                type: "list",
                message: "What is your position?",
                choices: ["Manager", "Engineer", "Intern"],
                name: "Title"
            },
            {
                type: "text",
                message: "What is your name?",
                name: "Name",
            },
            {
                type: "number",
                message: "What is your ID?",
                name: "ID",

            }
        ])
        .then(answers => {
            console.log(answers);
            if (answers.Title == "Manager") {
                inquirer.prompt([
                    {
                        type: "text",
                        message: "What is your Office Number?",
                        name: "OfficeNumber",
                    }
                ]).then(answers2 => {
                    console.log(answers2);
                    var manager = new Manager(answers.Name, answers.Title, answers.ID, answers.Email, answers2.OfficeNumber)
                    employees.push(manager)
                    start();
                })
            } else if (answers.Title == "Engineer") {
                inquirer.prompt([
                    {
                        type: "text",
                        message: "What is your Git Hub Username?",
                        name: "GitHubUserName",
                    }
                ]).then(answers2 => {
                    console.log(answers2);
                    // create engineer
                })
            } else if (answers.Title == "Intern") {
                inquirer.prompt([
                    {
                        type: "text",
                        message: "What school do you attend?",
                        name: "School",
                    }
                ]).then(answers2 => {
                    console.log(answers2);
                    // create the Intern
                })
            }
        });
}
function Engineer(name, id, title, email) {
    this.name = name;
    this.id = id;
    this.title = title;
    this.email = email;
    this.githubusername = githubUsername;
}

Engineer.prototype.html = function () {
    var html = `<div class="employee">
        <h2>${this.name}</h2>
        <h3>${this.title}</h3>
        <h4>ID:${this.id}</h4>
        <hr>
        <h4>Email:${this.email}</h4>
        <hr>
        <h4>Phone Number:${this.githubusername}</h4>
    </div>`

    return html;
}


function Manager(name, id, title, email, officenumber) {
    this.name = name;
    this.id = id;
    this.title = title;
    this.email = email;
    this.officenumber = officenumber;
}

Manager.prototype.html = function () {
    var html = `<div class="employee">
    <h2>${this.name}</h2>
    <h3>${this.title}</h3>
    <h4>ID:${this.id}</h4>
    <hr>
    <h4>Email:${this.email}</h4>
    <hr>
    <h4>Phone Number:${this.officenumber}</h4>
</div>`

    return html;
}

function Intern(name, id, title, email, githubusername) {
    this.name = name;
    this.id = id;
    this.title = title;
    this.email = email;
    this.school = school;
}

Intern.prototype.html = function () {
    var html = `<div class="employee">
        <h2>${this.name}</h2>
        <h3>${this.title}</h3>
        <h4>ID:${this.id}</h4>
        <hr>
        <h4>Email:${this.email}</h4>
        <hr>
        <h4>Phone Number:${this.school}</h4>
    </div>`

    return html;
}

function generateHTML() {
    var employeesHTML = "";
    employees.forEach(function (obj) {
        employeesHTML = employeesHTML + obj.html();
    })
    var html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" type="text/css" href="./Assets/style.css">
        <title>Document</title>
    </head>
    <body>
        <div class="row">
            <div class="col sm-12 md-8 lg-4">
        <header>
            <h1>Development Team</h1> 
        </header>
        ${employeesHTML}
            </div>
        </div>
    </body>
    </html>`
    fs.writeFile("./main.html", html, function (err) {
        console.log(err);
    })
}


