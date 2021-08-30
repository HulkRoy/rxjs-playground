import {
  delay,
  delayWhen,
  EMPTY,
  fromEvent,
  interval,
  map,
  of,
  take
} from 'rxjs';

const source = interval(300).pipe(take(5));

const example = source.pipe(delayWhen(x => of(0).pipe(delay(100 * x * x))));

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

/**
 * 
source : --0--1--2--3--4|
    delayWhen(x => of(0).pipe(delay(100 * x * x)))
example: --0---1----2-----3-----4|
 * 
 */
