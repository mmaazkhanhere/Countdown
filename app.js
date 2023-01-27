#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let hours = 0;
let minutes = 0;
let seconds = 0;
async function setTime() {
    var getTime = await inquirer.prompt([{
            name: 'getHour',
            type: 'input',
            message: 'Enter hours (24 hour format) '
        },
        {
            name: 'getMinute',
            type: 'input',
            message: 'Enter minutes: '
        },
        {
            name: 'getSeconds',
            type: 'input',
            message: 'Enter seconds: '
        }
    ]);
    hours = getTime.getHour;
    minutes = getTime.getMinute;
    seconds = getTime.getSeconds;
}
async function countDown() {
    console.clear();
    console.log(`${hours} : ${minutes} : ${seconds}`);
    seconds -= 1;
    if ((hours < 24 || hours >= 0) && (minutes < 60 || minutes >= 0) && (seconds < 60 || seconds > 0)) {
        if (seconds == 0) {
            if (minutes == 0) {
                if (hours > 0) {
                    minutes += 59;
                    seconds += 60;
                    hours -= 1;
                    countDown();
                }
                else {
                    countDown();
                }
            }
            else {
                seconds += 60;
                minutes -= 1;
                countDown();
            }
        }
        else if (seconds > 0) {
            setTimeout(() => {
                countDown();
            }, 0.1);
        }
        else if (seconds <= 0) {
            console.log(chalk.bgRed('Alarm'));
        }
    }
    else {
        console.log(`Wrong input. Please enter value within range.`);
    }
}
await setTime();
countDown();
