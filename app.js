#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let response = await fetchQuiz.json();
    return response.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    // for username
    let userName = await inquirer.prompt({
        name: "fname",
        type: "input",
        message: "What is Your Name?"
    });
    for (let i = 1; i < data.length; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            name: "quiz",
            type: "list",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.quiz === data[i].correct_answer) {
            ++score;
            console.log(`${chalk.bold.italic.green(" Corrected answer")}`);
        }
        else {
            console.log(`${chalk.bold.italic.red(" Incorrected answer")}, ${chalk.green.bold.italic(data[i].correct_answer)} is the Right answer`);
        }
    }
    console.log(` Dear ${chalk.bold.italic.green(userName.fname)} Your Score is ${chalk.bold.green(score)} out of ${chalk.bold.blue("5")}`);
};
startQuiz();
