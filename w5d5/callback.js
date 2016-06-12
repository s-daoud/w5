function Clock() {
  const date = new Date();
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
  this.seconds = date.getSeconds();
  this.printTime();
  setInterval(() => this._tick(), 1000);
}

Clock.prototype.printTime = function() {
  let formatTime = `${this.hours}:${this.minutes}:${this.seconds}`;
  console.log(formatTime);
};

Clock.prototype._tick = function() {
  this.seconds += 1;
  if (this.seconds === 60) {
    this.seconds -= 60;
    this.minutes += 1;
  }
  if (this.minutes === 60) {
    this.minutes -= 60;
    this.hours += 1;
  }
  this.printTime();
};

// const clock = new Clock();


const readline = require('readline');
const reader = readline.createInterface({

  input: process.stdin,
  output: process.stdout
});

function addNumbers (sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Pick a number: ", function(response) {
      let int = parseInt(response) ;
      sum += int;
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else if (numsLeft === 0) {
    completionCallback(sum);
  }
}

// addNumbers(0, 3, function (sum) {
//   console.log("Total Sum: " + sum);
// });

function askIfGreaterThan(el1, el2, callback) {
  reader.question(`Is ${el1} greater than ${el2}? `, function(response) {
    if (response === 'yes') {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1){
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan) {
      if (isGreaterThan === true){
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  }
  if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps === true) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}
//
// absurdBubbleSort([3, 2, 1], function (arr) {
//   console.log("Sorted array: " + JSON.stringify(arr));
//   reader.close();
// });

Function.prototype.myBind = function(context) {
  return () => { this.apply(context); };
};

// function Lamp() {
//    this.name = "a lamp";
// }
//
// const turnOn = function() {
//    console.log("Turning on " + this.name);
// }
//
// const lamp = new Lamp();
//
// turnOn(); // should not work the way we want it to
//
// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);
//
// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"
