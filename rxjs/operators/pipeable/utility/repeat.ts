import { from, interval, map, retry, zip } from 'rxjs';
import { repeat } from 'rxjs/operators';

const source = zip(from(['a', 'b', 'c']), interval(500), (x, y) => x);

const example = source.pipe(repeat(2));

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

// a
// b
// c
// a
// b
// c
// complete

/**
 * 
source : ----a----b----c|
            repeat(2)
example: ----a----b----c----a----b----c|
 * 
 */
