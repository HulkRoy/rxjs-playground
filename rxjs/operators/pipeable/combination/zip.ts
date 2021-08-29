import { from, interval, pipe, take, zip } from 'rxjs';

//zip 會取每個 observable 相同順位的元素並傳入 callback，也就是說每個 observable 的第 n 個元素會一起被傳入 callback

const source = interval(500).pipe(take(3));
const newest = interval(300).pipe(take(6));

const example = zip(source, newest, (x, y) => x + y);

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
zip(source, newest).subscribe({
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
// 2
// 4
// complete

/**
 * 
source : ----0----1----2|
newest : --0--1--2--3--4--5|
    zip(newest, (x, y) => x + y)
example: ----0----2----4|
 * 
 */

/**
 * 
zip 會等到 source 跟 newest 都送出了第一個元素，再傳入 callback，下次則等到 source 跟 newest 都送出了第二個元素再一起傳入 callback，所以運行的步驟如下：
  * newest 送出了第一個值 0，但此時 source 並沒有送出第一個值，所以不會執行 callback。
  * source 送出了第一個值 0，newest 之前送出的第一個值為 0，把這兩個數傳入 callback 得到 0。
  * newest 送出了第二個值 1，但此時 source 並沒有送出第二個值，所以不會執行 callback。
  * newest 送出了第三個值 2，但此時 source 並沒有送出第三個值，所以不會執行 callback。
  * source 送出了第二個值 1，newest 之前送出的第二個值為 1，把這兩個數傳入 callback 得到 2。
  * newest 送出了第四個值 3，但此時 source 並沒有送出第四個值，所以不會執行 callback。
  * source 送出了第三個值 2，newest 之前送出的第三個值為 2，把這兩個數傳入 callback 得到 4。
  * source 結束 example 就直接結束，因為 source 跟 newest 不會再有對應順位的值
 * 
 */

//zip 會把各個 observable 相同順位送出的值傳入 callback，這很常拿來做 demo 使用，比如我們想要間隔 2000ms 送出 'h', 'e', 'l', 'l', 'o'，就可以這麼做
const source1 = from('hello');
const source2 = interval(2000).pipe(take(10));

const example2 = zip(source1, source2, (x, y) => x);

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
source : (hello)|
source2: -0-1-2-3-4-...
        zip(source1, source2, (x, y) => x)
example: -h-e-l-l-o|
 * 
 */

//利用 zip 來達到原本只能同步送出的資料變成了非同步的，很適合用在建立示範用的資料。
//建議大家平常沒事不要亂用 zip，除非真的需要。因為 zip 必須 cache 住還沒處理的元素，當我們兩個 observable 一個很快一個很慢時，就會 cache 非常多的元素，等待比較慢的那個 observable。這很有可能造成memory相關的問題！
