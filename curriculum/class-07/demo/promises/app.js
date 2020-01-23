'use strict';

//Promises declare functionality
//"Go ahead and do your work, and let me know when you're done.  I'm going to do other things"

let longTask = (status) => new Promise( (resolve,reject) => {
    let timer = Math.floor(Math.random() * 3000);
    setTimeout( () => {
        if(status) {resolve(`Good (${status} / ${timer})`);}
        else{reject('Bad');}
    }, timer)
});

//Let's just do this longTask one time....

longTask('First One')
    .then(task => console.log('Task', task))
    .catch(console.error);

//Running many things individually (no guarantee of order)
// console.log('-------------------individual--------------');
// longTask('i - 1').then(task => console.log('Task', task)).catch(console.error);
// longTask('i - 2').then(task => console.log('Task', task)).catch(console.error);
// longTask('i - 3').then(task => console.log('Task', task)).catch(console.error);
// longTask('i - 4').then(task => console.log('Task', task)).catch(console.error);

// console.log('--------------Chained-----------------');
// longTask('c - 1')
//     .then(data => {console.log(data); return longTask('c - 2'); })
//     .then(data => {console.log(data); return longTask('c - 3'); })
//     .then(data => {console.log(data); return longTask('c - 4'); })
//     .then(data => {console.log(data); })

//Running many async thing simultaneously... they may not all finish in order, but the collected responsed will be GIVEN to you in order
console.log('-------------Promise.all------------');
let stuffToDo = [];
for(let i=0; i<=10; i++){
    stuffToDo.push(longTask(`p.a - ${i}`));
}

Promise.all(stuffToDo)
    .then(things => console.log('Promise.all() Response Array', things))
    .catch(console.error);