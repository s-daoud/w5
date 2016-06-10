"use strict"

Array.prototype.uniq = function() {
  let uniqArray = [];

  for ( let i = 0; i < this.length; i++ ) {
    if (uniqArray.indexOf(this[i]) < 0) {
      uniqArray.push(this[i]);
    }
  }

  return uniqArray;
}

// console.log([1, 2, 3, 2, 4, 5, 6].uniq());

Array.prototype.twoSum = function() {
  let twoSumArray = [];

  for ( let i = 0; i < this.length; i++ ) {

    for ( let j = i + 1; j < this.length; j++ ) {
      if ( this[i] + this[j] === 0 ) {
        twoSumArray.push([i, j]);
      }
    }
  }
  return twoSumArray;
};

// console.log([-1, 0, 2, -2, 1].twoSum());

Array.prototype.transpose = function() {
  let transposeArr = [];

  for ( let i = 0; i < this.length; i++ ) {
    let rowArr = [];

    for ( let j = 0; j < this.length; j++ ) {
      rowArr.push(this[j][i]);
    }
    transposeArr.push(rowArr);
  }

  return transposeArr;
};

// console.log([[1, 2, 3], [4, 5, 6], [7, 8, 9]].transpose());

Array.prototype.myEach = function(cb) {
  for (let i = 0; i < this.length; i++ ) {
    cb(this[i]);
  }
  return this;
};

// var arr = [1,2,3];
// [1,2,3,4].myEach(function(el) {
//   console.log(el * 2);
// });

Array.prototype.myMap = function(cb) {
  let mappedArr = [];

  this.myEach(function(el) {
    mappedArr.push(cb(el));
  });
  return mappedArr;
};

// console.log([1,2,3,4].myMap(function(el) {
//   return (el * 2);
// }));

Array.prototype.myInject = function(cb) {
  let accumulator = this[0];

  this.slice([1]).myEach(function(el) {
    accumulator = cb(accumulator, el);
  });
  return accumulator;
};

// console.log([1, 2, 3, 4].myInject(function(sum, el) {
//   return sum + el;
// }));

Array.prototype.bubbleSort = function() {
  let sorted = false;

  while (sorted === false) {
    sorted = true;
    let i = 0;

    while (i < this.length) {
      if (i + 1 === this.length) {
        break;
      }
      if (this[i] > this[i + 1]) {
        sorted = false;
        let tempVar = this[i];
        this[i] = this[i + 1];
        this[i + 1] = tempVar;
      }
      i++;
    }
  }
  return this;
};

// console.log([1, 4, 5, 2, 3, 1, 9].bubbleSort());

String.prototype.substrings = function() {
  let substringArr = [];

  for ( let i = 0; i < this.length; i++ ) {
    for ( let j = i + 1; j <= this.length; j++ ) {
      if (j === this.length) {
        substringArr.push(this.slice(i));
      } else {
        substringArr.push(this.slice(i, j));
      }
    }
  }
  return substringArr;
};

// console.log("cat".substrings());

function range(start, end) {
  if (start === end) {
    return [start];
  }
  let array = [start];
  array = array.concat(range(start + 1, end));
  return array;
}

// console.log(range(1, 4));

Array.prototype.arrSum = function() {
  if (this.length === 1) {
    return this[0];
  }
  let sum = this[0];
  sum += this.slice(1).arrSum();
  return sum;
};

// console.log([1,2,3,4].arrSum());

function exp(base, n) {
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return base;
  }
  let sum = 1;
  if (n % 2 === 0) {
    sum *= exp(base, n / 2) * exp(base, n / 2);
  } else {
    sum *= base * exp(base, (n - 1) / 2) * exp(base, (n - 1) / 2);
  }
  return sum;
}

// console.log(exp(2, 4));

function fib(n) {
  if (n === 1) {
    return [1];
  }
  if (n === 2) {
    return [1, 1];
  }
  let prevFib = fib(n - 1);
  prevFib.push(prevFib[prevFib.length - 1] + prevFib[prevFib.length - 2]);
  return prevFib;
}

// console.log(fib(6));

function bsearch(array, target) {
  if (array.length === 0) {
    return undefined;
  }
  let pivotI = Math.floor(array.length / 2);
  let pivot = array[pivotI];
  let foundI = undefined;
  if (target === pivot) {
    return pivotI;
  } else if (target < pivot) {
    foundI = bsearch(array.slice(0, pivotI), target);
  } else {
    foundI = bsearch(array.slice(pivotI + 1), target);
  }
  if (foundI >= 0 && target > pivot) {
    foundI += pivotI;
    foundI += 1;
  }
  return foundI;
}

// console.log(bsearch([1, 2, 3], 1));
// console.log(bsearch([2, 3, 4, 5], 3));
// console.log(bsearch([2, 4, 6, 8, 10], 6));
// console.log(bsearch([1, 3, 4, 5, 9], 5));
// console.log(bsearch([1, 2, 3, 4, 5, 6], 6));
// console.log(bsearch([1, 2, 3, 4, 5, 6], 0));
// console.log(bsearch([1, 2, 3, 4, 5, 7], 6));

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  let i = Math.floor(array.length / 2);
  let lHalf = array.slice(0, i);
  let rHalf = array.slice(i);
  return merge(mergeSort(lHalf), mergeSort(rHalf));
}

function merge(lHalf, rHalf) {
  let mergedArr = [];
  while (lHalf.length > 0 && rHalf.length > 0) {
    if (lHalf[0] < rHalf[0]) {
      mergedArr.push(lHalf.shift());
    } else {
      mergedArr.push(rHalf.shift());
    }
  }
  return mergedArr.concat(lHalf).concat(rHalf);
}

// console.log(mergeSort([2, 4, 6, 1, 3, 7, 9, 4]));

function subsets(array) {
  if (array.length === 0) {
    return [[]];
  }
  // let subArray = [];
  let prevSets = subsets(array.slice(0, -1));
  let newSets = prevSets.myMap(function(el) {
    return el.concat([array[array.length - 1]]);
  });
  return prevSets.concat(newSets);
}
// console.log(subsets([1, 2, 3]));

function makeChange(target, array) {
  if (target === 0) {
    return [];
  }
  let best = undefined;
  let found = [];
  for (let i = 0; i < array.length; i++ ) {
    if (array[i] > target) {
      continue;
    }
    found = [array[i]] + makeChange(target - array[i], array);
    if (best === undefined || found.length < best.length) {
      best = found;
    }
  }
  return best;
}

// console.log(makeChange(24, [10, 7, 1]));
