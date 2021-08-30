import { buffer, bufferTime, interval, take } from 'rxjs';

//buffer 要傳入一個 observable(source2)，它會把原本的 observable (source)送出的元素緩存在陣列中，等到傳入的 observable(source2) 送出元素時，就會觸發把緩存的元素送出。

const source = interval(300);
const source2 = interval(1000);
const example = source.pipe(
  buffer(source2),
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
// [0,1,2]
// [3,4,5]
// [6,7,8]...

/**
 * 
source : --0--1--2--3--4--5--6--7..
source2: ---------0---------1--------...
            buffer(source2)
example: ---------([0,1,2])---------([3,4,5])
 * 
 */
