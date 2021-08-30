import {
  EMPTY,
  from,
  fromEvent,
  interval,
  mapTo,
  merge,
  scan,
  startWith,
  zip
} from 'rxjs';

const source = zip(from('hello'), interval(600), (x, y) => x);

const example = source.pipe(scan((origin, next) => origin + next, ''));

example.subscribe({
  next: value => {
    console.log(value);
  },
  error: err => {
    console.log('Error: ' + err);
  },
  complete: () => {
    console.log('complete');
  }
});
// h
// he
// hel
// hell
// hello
// complete

/**
 * 
source : ----h----e----l----l----o|
    scan((origin, next) => origin + next, '')
example: ----h----(he)----(hel)----(hell)----(hello)|
 * 
 */

const addButton = document.getElementById('addButton');
const minusButton = document.getElementById('minusButton');
const state = document.getElementById('state');

const addClick = fromEvent(addButton, 'click').pipe(mapTo(1));
const minusClick = fromEvent(minusButton, 'click').pipe(mapTo(-1));

const numberState = merge(EMPTY.pipe(startWith(0)), addClick, minusClick).pipe(
  scan((origin, next) => origin + next, 0)
);

numberState.subscribe({
  next: value => {
    state.innerHTML = value;
  },
  error: err => {
    console.log('Error: ' + err);
  },
  complete: () => {
    console.log('complete');
  }
});
