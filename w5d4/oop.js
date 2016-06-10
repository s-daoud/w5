"use strict"

function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function() {
  return `${this.owner} loves ${this.name}.`;
};

let cat1 = new Cat("Bobo", "John");
let cat2 = new Cat("Captain America", "Chris Evans");

console.log(cat1.cuteStatement());
console.log(cat2.cuteStatement());

Cat.prototype.cuteStatement = function() {
  return `Everyone loves ${this.name}!`;
};

console.log(cat1.cuteStatement());
console.log(cat2.cuteStatement());

Cat.prototype.meow = function() {
  return `${this.name} goes meow!`;
};

cat1.meow = function() {
  return `${this.name} goes meow meow!`;
};

console.log(cat1.meow());
console.log(cat2.meow());
