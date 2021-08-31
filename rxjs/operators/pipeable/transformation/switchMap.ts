import {
  concatAll,
  concatMap,
  from,
  fromEvent,
  interval,
  map,
  switchAll,
  switchMap,
  take
} from 'rxjs';

//switchMap 其實就是 map 加上 switch 簡化的寫法, switchMap 會在下一個 observable 被送出後直接退訂前一個未處理完的 observable

// const source = fromEvent(document.body, 'click');

// const example = source.pipe(
//   map(e => interval(1000).pipe(take(3))),
//   switchAll()
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

// const example2 = source2.pipe(switchMap(e => interval(1000).pipe(take(3))));

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
source : -----------c--c-----------------...
        switchMap(c => interval(100).pipe(take(3)))
example: -------------0--0-1-2-----------...
 * 
 */

//可以把 switchMap 用在發送 HTTP request
function getPostData() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res =>
    res.json()
  );
}
const source3 = fromEvent(document.body, 'click');

const example3 = source3.pipe(switchMap(e => from(getPostData())));

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
