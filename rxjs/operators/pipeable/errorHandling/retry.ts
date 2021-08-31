import { from, interval, map, retry, zip } from 'rxjs';

const source = zip(from(['a', 'b', 'c', 'd', 2]), interval(500), (x, y) => x);

const example = source.pipe(
  map((x: string) => x.toUpperCase()),
  retry(1)
);

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
source : ----a----b----c----d----2|
        map(x => x.toUpperCase())
         ----a----b----c----d----X|
                retry(1)
example: ----a----b----c----d--------a----b----c----d----X|
 * 
 */

//這種處理方式很適合用在 HTTP request 失敗的場景中，我們可以設定重新發送幾次後，再秀出錯誤訊息
