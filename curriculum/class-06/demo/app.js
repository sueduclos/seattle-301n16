'use strict'

let people = {
    bob: { name: 'Bob Smith', age: 41 },
    carol: { name: 'Carol Jones', age: 33 },
    ted: { name: 'Ted Skred', age: 52 },
    alice: { name: 'Alice Malice', age: 712 }
};

let names = [];
let ages = [];

Object.keys(people).forEach( person => {
    names.push(people[person].name);
    ages.push(people[person].age);
});

console.log('People in order: ', names.sort().join(' -> '));
console.log('Ages ', ages);