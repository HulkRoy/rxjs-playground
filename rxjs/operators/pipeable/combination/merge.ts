import { interval, merge, take } from 'rxjs';

const source = interval(500).pipe(take(3));
const source2 = interval(300).pipe(take(6));
const example = merge(source, source2);

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
// 0
// 0
// 1
// 2
// 1
// 3
// 2
// 4
// 5
// complete

//merge 把多個 observable 同時處理，這跟 concat 一次處理一個 observable 是完全不一樣的
//merge 之後的 example 在時間序上同時在跑 source 與 source2，當兩件事情同時發生時，會同步送出資料(被 merge 的在後面)，當兩個 observable 都結束時才會真的結束

/**
 * 
source : ----0----1----2|
source2: --0--1--2--3--4--5|
            merge()
example: --0-01--21-3--(24)--5|
*
*/

//merge 的邏輯有點像是 OR(||)，就是當兩個 observable 其中一個被觸發時都可以被處理，這很常用在一個以上的按鈕具有部分相同的行為。
/**
 * 
const stopVideo = merge(stopButton, endButton);

stopVideo.subscribe(() => {
    // 暫停播放影片
})
 *
 */
