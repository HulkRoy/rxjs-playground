import { concat, delay, EMPTY, interval, of, startWith, take } from 'rxjs';

//concat 可以把多個 observable 實例合併成一個
const source = interval(1000).pipe(take(3));
const source2 = of(3);
const source3 = of(4, 5, 6);
const example = concat(source, source2, source3);

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
// 1
// 2
// 3
// 4
// 5
// 6
// complete

//跟 concatAll 一樣，必須先等前一個 observable 完成(complete)，才會繼續下一個

/**
 * 
source : ----0----1----2|
source2: (3)|
source3: (456)|
            concat()
example: ----0----1----2(3456)|
*
*/

// elems
const userMessage = document.getElementById('message');
// helper
const delayedMessage = (message, delayedTime = 1000) => {
  return EMPTY.pipe(
    startWith(message),
    delay(delayedTime)
  );
};

concat(
  delayedMessage('Get Ready!'),
  delayedMessage(3),
  delayedMessage(2),
  delayedMessage(1),
  delayedMessage('Go!'),
  delayedMessage('', 2000)
).subscribe((message: any) => (userMessage.innerHTML = message));
