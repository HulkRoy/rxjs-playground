import {
  concatAll,
  concatMap,
  from,
  fromEvent,
  interval,
  map,
  take
} from 'rxjs';

//concatMap 其實就是 map 加上 concatAll 的簡化寫法
// const source = fromEvent(document.body, 'click');

// const example = source.pipe(
//   map(e => interval(1000).pipe(take(3))),
//   concatAll()
// );

// example.subscribe({
//   next: value => {
//     console.log(value);
//   },
//   error: err => {
//     console.log('Error: ' + err);
//   },
//   complete: () => {
//     console.log('complete');
//   }
// });

//等价于

// const source2 = fromEvent(document.body, 'click');

// const example2 = source2.pipe(concatMap(e => interval(1000).pipe(take(3))));

// example2.subscribe({
//   next: value => {
//     console.log(value);
//   },
//   error: err => {
//     console.log('Error: ' + err);
//   },
//   complete: () => {
//     console.log('complete');
//   }
// });

/**
 * 
source : -----------c--c------------------...
        concatMap(c => interval(100).pipe(take(3)))
example: -------------0-1-2-0-1-2---------...
 * 
 */

//這樣的行為也很常被用在發送 request
function getPostData() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res =>
    res.json()
  );
}
const source3 = fromEvent(document.body, 'click');

const example3 = source3.pipe(concatMap(e => from(getPostData())));

example3.subscribe({
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
