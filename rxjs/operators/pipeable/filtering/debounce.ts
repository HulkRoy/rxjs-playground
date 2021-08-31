import { debounceTime, fromEvent, interval, map, take } from 'rxjs';

//debounce 運作的方式是每次收到元素，他會先把元素 cache 住並等待一段時間，如果這段時間內已經沒有收到任何元素，則把元素送出；如果這段時間內又收到新的元素，則會把原本 cache 住的元素釋放掉並重新計時，不斷反覆

const source = interval(300).pipe(take(5));
const example = source.pipe(debounceTime(1000));

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
// 4
// complete

/**
 * 
source : --0--1--2--3--4|
        debounceTime(1000)
example: --------------4|  
 * 
 */

//debounce 會在收到元素後等待一段時間，這很適合用來處理間歇行為，間歇行為就是指這個行為是一段一段的，例如要做 Auto Complete 時，我們要打字搜尋不會一直不斷的打字，可以等我們停了一小段時間後再送出，才不會每打一個字就送一次 request
const searchInput = document.getElementById('searchInput');

fromEvent(searchInput, 'input')
  .pipe(
    map(e => e.target.value),
    debounceTime(300)
  )
  .subscribe(value => {
    // 在這裡發 request
    console.log(value);
  });
