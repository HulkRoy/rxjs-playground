import { from } from 'rxjs';

//emit array as a sequence of values
const arraySource = from([1, 2, 3, 4, 5]);
//output: 1,2,3,4,5
const arraySubscriber = arraySource.subscribe(val => console.log(val));

//emit result of promise
const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
//output: 'Hello World'
const promiseSubscriber = promiseSource.subscribe(val => console.log(val));

//works on js collections
const map = new Map();
map.set(1, 'Hi');
map.set(2, 'Bye');

const mapSource = from(map);
//output: [1, 'Hi'], [2, 'Bye']
const mapSubscriber = mapSource.subscribe(val => console.log(val));

//emit string as a sequence
const stringSource = from('Hello World');
//output: 'H','e','l','l','o',' ','W','o','r','l','d'
const stringSubscriber = stringSource.subscribe(val => console.log(val));
