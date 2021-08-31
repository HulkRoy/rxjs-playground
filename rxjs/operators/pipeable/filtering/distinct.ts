import { distinct, from, interval, zip } from 'rxjs';

//过滤重复值
const source = zip(from(['a', 'b', 'c', 'a', 'b']), interval(300), (x, y) => x);
const example = source.pipe(distinct());

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
// complete

/**
 * 
 * 
source : --a--b--c--a--b|
            distinct()
example: --a--b--c------|
 * 
 */
