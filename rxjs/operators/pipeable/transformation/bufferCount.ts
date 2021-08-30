import { bufferCount, bufferTime, interval, take } from 'rxjs';

const source = interval(300);
const example = source.pipe(
  bufferCount(3),
  take(5)
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
// [0,1,2]
// [3,4,5]
// [6,7,8]...
