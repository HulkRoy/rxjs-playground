import { delay, from, interval, map, retry, retryWhen, tap, zip } from 'rxjs';

//把例外發生的元素放到一個 observable 中，讓我們可以直接操作這個 observable，並等到這個 observable 操作完後再重新訂閱一次原本的 observable。

const source = zip(from(['a', 'b', 'c', 'd', 2]), interval(500), (x, y) => x);

const example = source.pipe(
  map((x: string) => x.toUpperCase()),
  retryWhen(errorObs => errorObs.pipe(map(err => console.log(err.message))))
  // retryWhen(errorObs => errorObs.pipe(delay(1000)))
);

const sub = example.subscribe({
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

setTimeout(() => sub.unsubscribe(), 10000);

/**
 * 
source : ----a----b----c----d----2|
        map(x => x.toUpperCase())
         ----a----b----c----d----X|
        retryWhen(errorObs => errorObs.delay(1000))
example: ----a----b----c----d-------------------a----b----c----d----...
 * 
 */

//這個 callback 有一個參數會傳入一個 observable，這個 observable 不是原本的 observable(example) 而是例外事件送出的錯誤所組成的一個 observable，我們可以對這個由錯誤所組成的 observable 做操作，等到這次的處理完成後就會重新訂閱我們原本的 observable。

//通常會把 retryWhen 拿來做錯誤通知或是exception收集
const example2 = source.pipe(
  map((x: string) => x.toUpperCase()),
  retryWhen(errorObs => errorObs.pipe(map(err => fetch('...'))))
);
