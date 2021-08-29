import { interval, last, take } from 'rxjs';

const source = interval(1000);
const example = source.pipe(
  take(6),
  last()
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
// 5
// complete

/**
 * 
source : ----0----1----2----3----4----5|
                    last()
example: ------------------------------(5)|
*
*/
