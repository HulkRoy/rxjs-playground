//所有的 observable 是並行(Parallel)處理的，也就是說 mergeAll 不會像 switchAll 一樣退訂(unsubscribe)原先的 observable 而是並行處理多個 observable

import { fromEvent, interval, map, mergeAll, take, tap } from 'rxjs';

const click = fromEvent(document.body, 'click').pipe(
  tap(() => console.log('mergeAll click'))
);
const source = click.pipe(map(e => interval(1000).pipe(take(10))));

const example = source.pipe(mergeAll());
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
click  : ---------c-c------------------c--.. 
        map(e => interval(1000))
source : ---------o-o------------------o--..
                   \ \                  \----0----1--...
                    \ ----0----1----2----3----4--...
                     ----0----1----2----3----4--...
                     switch()
example: ----------------00---11---22---33---(04)4--...
 * 
 */

//另外 mergeAll 可以傳入一個數值，這個數值代表他可以同時處理的 observable 數量
const click2 = fromEvent(document.body, 'click').pipe(
  tap(() => console.log('mergeAll limit click'))
);
const source2 = click2.pipe(map(e => interval(1000).pipe(take(3))));

const example2 = source2.pipe(mergeAll(2));
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

/**
 * 
click  : ---------c-c----------o----------.. 
        map(e => Rx.Observable.interval(1000))
source : ---------o-o----------c----------..
                   \ \          \----0----1----2|     
                    \ ----0----1----2|  
                     ----0----1----2|
                     mergeAll(2)
example: ----------------00---11---22---0----1----2--..
 * 
 */

//如果我們傳入 1 其行為就會跟 concatAll 是一模一樣的
