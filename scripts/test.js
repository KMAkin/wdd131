const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];

//for loop sample
for (let i = 0; i < studentReport.length; i++) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
}

//while statement example
let i = 0;
while (i < studentReport.length); {
    if (studentReport[i] < LIMIT); {
        console.log(studentReport[i]);
    }
    i++;
}

//for each sample
studentReport.forEach(function (item) {
    if (item < LIMIT) {
        console.log(item);
    }
})

//for...in loop sample
for (let i in studentReport) {
    if (studentReport[i] < LIMIT) {
        console.log(studentReport[i]);
    }
}
