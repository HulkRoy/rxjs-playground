import { interval, startWith, take } from 'rxjs';

const source = interval(1000);
var example = source.pipe(
  startWith(0),
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
// 0
// 0
// 1
// 2
// 3...

//startWith 的值是一開始就同步發出的，這個 operator 很常被用來保存程式的起始狀態

/**
 * 
source : ----0----1----2----3--...
                startWith(0)
example: (0)----0----1----2----3--...
*
*/
