import { combineLatest, interval, take } from 'rxjs';

//取得各個 observable 最後送出的值，再輸出成一個值

const source = interval(500).pipe(take(3));
const newest = interval(300).pipe(take(6));

const example = combineLatest([source, newest], (x, y) => x + y);

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
combineLatest([source, newest]).subscribe({
  next: ([x, y]) => {
    console.log(x + y);
  },
  error: err => {
    console.log('Error: ' + err);
  },
  complete: () => {
    console.log('complete');
  }
});
* 
 */

// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// complete

/**
 * 
source : ----0----1----2|
newest : --0--1--2--3--4--5|

    combineLatest(newest, (x, y) => x + y);

example: ----01--23-4--(56)--7|
*
*/

/**
 * 
等兩個 observable 都曾有送值出來才會呼叫我們傳入的 callback，所以這段程式是這樣運行的
  * newest 送出了 0，但此時 source 並沒有送出過任何值，所以不會執行 callback
  * source 送出了 0，此時 newest 最後一次送出的值為 0，把這兩個數傳入 callback 得到 0。
  * newest 送出了 1，此時 source 最後一次送出的值為 0，把這兩個數傳入 callback 得到 1。
  * newest 送出了 2，此時 source 最後一次送出的值為 0，把這兩個數傳入 callback 得到 2。
  * source 送出了 1，此時 newest 最後一次送出的值為 2，把這兩個數傳入 callback 得到 3。
  * newest 送出了 3，此時 source 最後一次送出的值為 1，把這兩個數傳入 callback 得到 4。
  * source 送出了 2，此時 newest 最後一次送出的值為 3，把這兩個數傳入 callback 得到 5。
  * source 結束，但 newest 還沒結束，所以 example 還不會結束。
  * newest 送出了 4，此時 source 最後一次送出的值為 2，把這兩個數傳入 callback 得到 6。
  * newest 送出了 5，此時 source 最後一次送出的值為 2，把這兩個數傳入 callback 得到 7。
  * newest 結束，因為 source 也結束了，所以 example 結束。
source 還是 newest 送出值來，只要另一方曾有送出過值(有最後的值)，就會執行 callback 並送出新的值

combineLatest 很常用在運算多個因子的結果，例如最常見的 BMI 計算，我們身高變動時就拿上一次的體重計算新的 BMI，當體重變動時則拿上一次的身高計算 BMI，這就很適合用 combineLatest 來處理
 * 
 */
