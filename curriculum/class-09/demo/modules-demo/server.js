let msg = require('./Message.js');
console.log(msg.SimpleMessage);

let msg2 = require('./Log.js');
msg2('Hello from Log');

let person = require('./Data.js');
console.log(person.firstName, person.lastName);

let Person = require('./Person.js');
let mp = new Person('Money', 'Penny');

console.log(mp.fullName());