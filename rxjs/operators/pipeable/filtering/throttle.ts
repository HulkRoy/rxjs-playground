import {
  debounceTime,
  fromEvent,
  interval,
  map,
  take,
  throttleTime
} from 'rxjs';

//跟 debounce 的不同是 throttle 會先開放送出元素，等到有元素被送出就會沈默一段時間，等到時間過了又會開放發送元素。
//throttle 比較像是控制行為的最高頻率，也就是說如果我們設定 1000 毫秒，那該事件頻率的最大值就是每秒觸發一次不會再更快，debounce 則比較像是必須等待的時間，要等到一定的時間過了才會收到元素。
//throttle 更適合用在連續性行為，比如說 UI 動畫的運算過程，因為 UI 動畫是連續的，像我們之前在做拖拉時，就可以加上 throttleTime(12) 讓 mousemove event 不要發送的太快，避免畫面更新的速度跟不上樣式的切換速度。

const source = interval(300).pipe(take(5));
const example = source.pipe(throttleTime(1000));

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
// 4
// complete
