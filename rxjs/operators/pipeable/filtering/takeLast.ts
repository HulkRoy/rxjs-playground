import { interval, take, takeLast } from 'rxjs';

const source = interval(1000);
const example = source.pipe(
  take(6),
  takeLast(2)
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
// 4
// 5
// complete

//takeLast 必須等到整個 observable 完成(complete)，才能知道最後的元素有哪些，並且同步送出

/**
 * 
source : ----0----1----2----3----4----5|
                takeLast(2)
example: ------------------------------(45)|
*
*/
