import { concatAll, fromEvent, interval, map, of, take } from 'rxjs';

// Observable 送出的元素又是一個 observable，就像是二維陣列，陣列裡面的元素是陣列，這時我們就可以用 concatAll 把它攤平成一維陣列，可以直接把 concatAll 想成把所有元素 concat 起來。

const click = fromEvent(document.body, 'click');
const source = click.pipe(map(e => of(1, 2, 3)));

const example = source.pipe(concatAll());
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
click  : ------c------------c--------

        map(e => of(1,2,3))

source : ------o------------o--------
                \            \
                 (123)|       (123)|

                   concatAll()

example: ------(123)--------(123)------------
*
*/

// concatAll 會處理 source 先發出來的 observable，必須等到這個 observable 結束，才會再處理下一個 source 發出來的 observable，用下面這個範例說明。
const obs1 = interval(1000).pipe(take(5));
const obs2 = interval(500).pipe(take(2));
const obs3 = interval(2000).pipe(take(1));

const source2 = of(obs1, obs2, obs3);

const example2 = source2.pipe(concatAll());

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
// 0
// 1
// 2
// 3
// 4
// 0
// 1
// 0
// complete

/**
 * 
source : (o1                 o2      o3)|
           \                  \       \
            --0--1--2--3--4|   -0-1|   ----0|
                
                concatAll()        

example: --0--1--2--3--4-0-1----0|
 * 
 */
