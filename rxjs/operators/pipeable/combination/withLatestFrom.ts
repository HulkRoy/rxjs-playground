import { from, interval, withLatestFrom, zip } from 'rxjs';

//withLatestFrom 運作方式跟 combineLatest 有點像，只是他有主從的關係，只有在主要的 observable 送出新的值時，才會執行 callback，附隨的 observable 只是在背景下運作

const main = zip(from('hello'), interval(500), (x, y) => x);
const some = zip(from([0, 1, 0, 0, 0, 1]), interval(300), (x, y) => x);

const example = main.pipe(withLatestFrom(some));

example.subscribe({
  next: ([x, y]) => {
    console.log(y === 1 ? x.toUpperCase() : x);
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
 * 
main   : ----h----e----l----l----o|
some   : --0--1--0--0--0--1|

withLatestFrom(some, (x, y) =>  y === 1 ? x.toUpperCase() : x);

example: ----h----e----l----L----O|
 * 
 */

/**
 * 
withLatestFrom 會在 main 送出值的時候執行 callback，但請注意如果 main 送出值時 some 之前沒有送出過任何值 callback 仍然不會執行！
這裡我們在 main 送出值時，去判斷 some 最後一次送的值是不是 1 來決定是否要切換大小寫，執行步驟如下
  * main 送出了 h，此時 some 上一次送出的值為 0，把這兩個參數傳入 callback 得到 h。
  * main 送出了 e，此時 some 上一次送出的值為 0，把這兩個參數傳入 callback 得到 e。
  * main 送出了 l，此時 some 上一次送出的值為 0，把這兩個參數傳入 callback 得到 l。
  * main 送出了 l，此時 some 上一次送出的值為 1，把這兩個參數傳入 callback 得到 L。
  * main 送出了 o，此時 some 上一次送出的值為 1，把這兩個參數傳入 callback 得到 O。
withLatestFrom 很常用在一些 checkbox 型的功能，例如說一個編輯器，我們開啟粗體後，打出來的字就都要變粗體，粗體就像是 some observable，而我們打字就是 main observable。
 * 
 */
