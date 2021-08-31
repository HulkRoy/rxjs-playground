import {
  catchError,
  concat,
  delay,
  EMPTY,
  from,
  interval,
  map,
  of,
  retry,
  startWith,
  zip
} from 'rxjs';

const source = zip(from(['a', 'b', 'c', 'd', 2]), interval(500), (x, y) => x);

const example = source.pipe(
  map((x: string) => x.toUpperCase()),
  catchError(error => of('h'))
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

/**
 * 
source : ----a----b----c----d----2|
        map(x => x.toUpperCase())
         ----a----b----c----d----X|
        catch(error => of('h'))
example: ----a----b----c----d----h|  
 * 
 */

const source2 = zip(from(['a', 'b', 'c', 'd', 2]), interval(500), (x, y) => x);

const example2 = source2.pipe(
  map((x: string) => x.toUpperCase())
  // catchError(error => EMPTY)
);

example2.subscribe({
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

//另外 catchError 的 callback 能接收第二個參數，這個參數會接收當前的 observalbe，我們可以回傳當前的 observable 來做到重新執行
const source3 = zip(from(['a', 'b', 'c', 'd', 2]), interval(500), (x, y) => x);
const example3 = source3.pipe(
  map((x: string) => x.toUpperCase()),
  catchError((error, obs) => obs)
);

const sub = example3.subscribe({
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
        catch((error, obs) => obs)
example: ----a----b----c----d--------a----b----c----d--..
 * 
 */

//通常會用在斷線重連的情境。
//另上面的處理方式有一個簡化的寫法，叫做 retry()

//錯誤處理在實務應用中的小範例
const title = document.getElementById('title');

const source4 = zip(
  from(['a', 'b', 'c', 'd', 2]),
  interval(500),
  (x, y) => x
).pipe(map((x: string) => x.toUpperCase()));
// 通常 source4 會是建立即時同步的連線，像是 web socket

const example4 = source4.pipe(
  catchError((error, obs) =>
    concat(
      EMPTY.pipe(startWith('連線發生錯誤： 5秒後重連')),
      obs.pipe(delay(5000))
    )
  )
);

const sub4 = example4.subscribe({
  next: value => {
    title.innerText = value;
  },
  error: err => {
    console.log('Error: ' + err);
  },
  complete: () => {
    console.log('complete');
  }
});

setTimeout(() => sub4.unsubscribe(), 15000);

//這個範例其實就是模仿在即時同步斷線時，利用 catch 返回一個新的 observable，這個 observable 會先送出錯誤訊息並且把原本的 observable 延遲 5 秒再做合併
