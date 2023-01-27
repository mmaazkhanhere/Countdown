#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let hours = 0; //initialising hours, minutes, and seconds variables
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
    hours = getTime.getHour; //change the values of hours, minutes and seconds depending on user input
    minutes = getTime.getMinute;
    seconds = getTime.getSeconds;
    if ((hours >= 0 && hours < 24) && (minutes >= 0 && minutes < 60) && (seconds >= 0 && seconds < 60)) {
        //if user input is in countdown format, the countdown function will be called
        await countDown(); //calling the countdown function
    }
    else { //if user input is not in specified format, the following error message will be displayed
        console.log(`Wrong input. Please enter value within range.`);
    }
}
async function countDown() {
    //function for countdown process
    console.clear(); //clear the console everytime the function restart
    console.log(`${hours} : ${minutes} : ${seconds}`); //time will be displayed
    seconds -= 1; //decrement second value
    if (seconds == 0) {
        //if second is equal to zero, check whether minute is equal to zero
        if (minutes == 0) {
            //if minute is equal to zero, check whether hour is equal to zero
            if (hours > 0) {
                //if hour is greater than zero, decrement one from hour and restart minute and seconds
                minutes += 59;
                seconds += 60;
                hours -= 1;
                countDown(); //calling the function again
            }
            else {
                //else ig hour is zero go back to the function start again
                countDown();
            }
        }
        else {
            //if minute is left, decrement one from it and restart seconds
            seconds += 60;
            minutes -= 1;
            countDown(); //calling the function again
        }
    }
    else if (seconds > 0) {
        //if seconds are left, decrement it
        setTimeout(() => {
            countDown();
        }, 1000);
    }
    else if (seconds < 0) {
        //if no seconds are left, display alarm on the screen
        console.log(chalk.bgRed('Alarm'));
    }
}
setTime();
