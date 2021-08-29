import { first, interval, skip, take } from 'rxjs';

const source = interval(1000);
const example = source.pipe(
  skip(3),
  take(5)
);

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
// 3
// 4
// 5...

/**
 * 
source : ----0----1----2----3----4----5--....
                    skip(3)
example: -------------------3----4----5--...
*
*/
