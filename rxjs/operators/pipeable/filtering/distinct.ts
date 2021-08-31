import { distinct, from, interval, zip } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

//过滤重复值
const source = zip(from(['a', 'b', 'c', 'a', 'b']), interval(300), (x, y) => x);
const example = source.pipe(distinct());

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
// a
// b
// c
// complete

/**
 * 
 * 
source : --a--b--c--a--b|
            distinct()
example: --a--b--c------|
 * 
 */

interface Person {
  age: number;
  name: string;
}

const source2 = zip(
  from([
    { age: 4, name: 'Foo' },
    { age: 7, name: 'Bar' },
    { age: 5, name: 'Foo' }
  ]),
  interval(300),
  (x, y) => x
);
const example2 = source2.pipe(
  distinct((p: Person) => {
    return p.name;
  })
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

//實際上 distinct() 會在背地裡建立一個 Set，當接收到元素時會先去判斷 Set 內是否有相同的值，如果有就不送出，如果沒有則存到 Set 並送出。所以記得盡量不要直接把 distinct 用在一個無限的 observable 裡，這樣很可能會讓 Set 越來越大，建議大家可以放第二個參數 flushes，或用 distinctUntilChanged

//distinctUntilChanged 跟 distinct 一樣會把相同的元素過濾掉，但 distinctUntilChanged 只會跟最後一次送出的元素比較，不會每個都比
//這裡 distinctUntilChanged 只會暫存一個元素，並在收到元素時跟暫存的元素比對，如果一樣就不送出，如果不一樣就把暫存的元素換成剛接收到的新元素並送出

const source3 = zip(
  from(['a', 'b', 'c', 'a', 'c']),
  interval(300),
  (x, y) => x
);
const flushes = interval(1300);
const example3 = source3.pipe(distinct(null, flushes));

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
source : --a--b--c--a--c|
flushes: ------------0---...
        distinct(null, flushes);
example: --a--b--c-----c|
 * 
 */

//flushes observable 就是在送出元素時，會把 distinct 的暫存清空，所以之後的暫存就會從頭來過，這樣就不用擔心暫存的 Set 越來愈大的問題.
//但平常不太會用這樣的方式來處理，通常會用另一個方法 distinctUntilChanged。

const source4 = zip(
  from(['a', 'b', 'c', 'c', 'b']),
  interval(300),
  (x, y) => x
);
const example4 = source4.pipe(distinctUntilChanged());

example4.subscribe({
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
// a
// b
// c
// b
// complete

/**
 * 
source : --a--b--c--c--b|
            distinctUntilChanged()
example: --a--b--c-----b|
 * 
 */

//distinctUntilChanged 是比較常在實務上使用的，最常見的狀況是我們在做多方同步時。當我們有多個 Client，且每個 Client 有著各自的狀態，Server 會再一個 Client 需要變動時通知所有 Client 更新，但可能某些 Client 接收到新的狀態其實跟上一次收到的是相同的，這時我們就可用 distinctUntilChanged 方法只處理跟最後一次不相同的訊息，像是多方通話、多裝置的資訊同步都會有類似的情境。
