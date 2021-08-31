import { fromEvent, interval, map, switchAll, take, tap } from 'rxjs';

//switchAll 最重要的就是他會在新的 observable 送出後直接處理新的 observable 不管前一個 observable 是否完成，每當有新的 observable 送出就會直接把舊的 observable 退訂(unsubscribe)，永遠只處理最新的 observable!

const click = fromEvent(document.body, 'click').pipe(
  tap(() => console.log('switchAll click'))
);
const source = click.pipe(map(e => interval(1000).pipe(take(10))));

const example = source.pipe(switchAll());
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
                     switchAll()
example: -----------------0----1----2--------0----1--...
 * 
 */
