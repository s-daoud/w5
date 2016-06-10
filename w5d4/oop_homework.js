function sillyNames(names, callback) {
  let silly = names.map(function(name) {
    return `Mx. ${name} Sillypants`;
  });

  callback(silly);
}

sillyNames(["Mary", "Brian", "Leo"], function(names) {
  names.forEach(function(name) {
    console.log(name);
  });
});

function Elephant(name, height, tricks) {
  this.name = name;
  this.height = height;
  this.tricks = tricks;
}

Elephant.prototype.trumpet = function() {
  console.log(`${this.name} the elephant goes 'phrRRRRRRRRRRRR!!!!!!'`);
}

Elephant.prototype.grow = function() {
  this.height += 12;
}

Elephant.prototype.addTrick = function(trick) {
  this.tricks.push(trick);
}

Elephant.prototype.play = function() {
  let trick = this.tricks[Math.floor(Math.random() * this.tricks.length)];
  console.log(`${this.name} is ${trick}!`)
}

let elly = new Elephant("Elly", 200, ["stomping", "swimming"]);
let charlie = new Elephant("Charlie", 200, ["painting pictures", "spraying water for a slip and slide"]);
let kate = new Elephant("Kate", 234, ["writing letters", "stealing peanuts"]);
let micah = new Elephant("Micah", 143, ["trotting", "playing tic tac toe", "doing elephant ballet"]);

let herd = [elly, charlie, kate, micah];

Elephant.paradeHelper = function(elephant) {
  console.log(`${elephant.name} is trotting by!`);
}

herd.forEach(function(elephant) {
  Elephant.paradeHelper(elephant);
});

function dinerBreakfast() {
  let order = "I'd like scrambled eggs and bacon";
  console.log(order);

  return function addOrder(item) {
    order += ` and ${item}`;
    console.log(order);
  }
}
let bfastOrder = dinerBreakfast();
bfastOrder("chocolate chip pancakes");
bfastOrder("grits");
