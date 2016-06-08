function madLib(verb, adjective, noun) {
  console.log(`We shall ${verb} the ${adjective} ${noun}.`);
}
madLib('fly', 'iridescent', 'zoo');
madLib('eat', 'rolling', 'cactus');

function isOdd(num) {
  if (num % 2 == 0) {
    return false;
  } else {
    return true;
  }
}

isOdd(2);
isOdd(5);
isOdd(-17);

function yell(str) {
  return str.toUpperCase();
}

yell("I want to go to the store");
yell("Time to program");

function isSubstring(searchString, subString) {
  if (searchString.indexOf(subString) !== -1 ) {
    return true;
  } else {
    return false;
  }
}
isSubstring("The cat went to the store", "he cat went");
isSubstring("Time to program", "time");
isSubstring("Jump for joy", "joys");

function fizzBuzz(array) {
  var fb_array = [];
  for(var i = 0; i < array.length; i++) {
    if ((array[i] % 3 === 0 || array[i] % 5 === 0) && array[i] % 15 !== 0) {
      fb_array.push(array[i]);
    }
  }
  return fb_array;
}
fizzBuzz([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);

function isPrime(num) {
  for(let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
isPrime(2);
isPrime(10);
isPrime(15485863);
isPrime(3548563);

function sumOfNPrimes(n) {
  var sum = 0;
  var i = 2;
  var count = 0;
  while (count < n) {
    if (isPrime(i)) {
      sum += i;
      count++;
    }
    i++;
  }
  return sum;
}
sumOfNPrimes(0);
sumOfNPrimes(1);
sumOfNPrimes(4);

function printChildren(parent, ...otherArgs) {
  console.log(`${parent}'s children are:'`);
  otherArgs.forEach((arg) => {
    console.log(arg);
  })
}

printChildren("George", "Cassie", "Jeff", "Roger");

function addThree(a, b, c) {
  return a + b + c;
}

var arr = [1,2,3];
addThree(...arr);

function dinnerTonightIs(food = "pizza") {
  console.log(`Dinner tonight is ${food}.`);
}

dinnerTonightIs('some inferior food');
dinnerTonightIs();
