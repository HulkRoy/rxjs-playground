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
import { mergeAll, mergeMap } from 'rxjs/operators';

//mergeMap 其實就是 map 加上 mergeAll 簡化的寫法

// const source = fromEvent(document.body, 'click');

// const example = source.pipe(
//   map(e => interval(1000).pipe(take(3))),
//   mergeAll()
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

// const example2 = source2.pipe(mergeMap(e => interval(1000).pipe(take(3))));

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
source : -----------c-c------------------...
        mergeMap(c => interval(100).pipe(take(3)))
example: -------------0-(10)-(21)-2----------...
 * 
 */

//可以把 mergeMap 用在發送 HTTP request
function getPostData() {
  return fetch('https://jsonplaceholder.typicode.com/posts/1').then(res =>
    res.json()
  );
}
const source3 = fromEvent(document.body, 'click');

const example3 = source3.pipe(mergeMap(e => from(getPostData())));

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

/**
 * 
switchMap, mergeMap, concatMap
這三個 operators 還有一個共同的特性，那就是這三個 operators 可以把第一個參數所回傳的 promise 物件直接轉成 observable，這樣我們就不用再用 from 轉一次
 * 
 */

/**
 * 
如何選擇這三個 operators？ 看使用情境而定

 *concatMap 用在可以確定內部的 observable 結束時間比外部 observable 發送時間來快的情境，並且不希望有任何並行處理行為，適合少數要一次一次完成到底的的 UI 動畫或特別的 HTTP request 行為。
 *switchMap 用在只要最後一次行為的結果，適合絕大多數的使用情境。
 *mergeMap 用在並行處理多個 observable，適合需要並行處理的行為，像是多個 I/O 的並行處理。
建議初學者不確定選哪一個時，使用 switchMap

在使用 concatAll 或 concatMap 時，請注意內部的 observable 一定要能夠的結束，且外部的 observable 發送元素的速度不能比內部的 observable 結束時間快太多，不然會有 memory issues
 * 
 */
