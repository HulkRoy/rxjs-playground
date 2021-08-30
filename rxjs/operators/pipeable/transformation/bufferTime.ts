import { bufferTime, filter, fromEvent, interval, take } from 'rxjs';

const source = interval(300);
const example = source.pipe(
  bufferTime(1000),
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

//用 buffer 來做某個事件的過濾，例如像是鼠标連點才能真的執行,只有在 500 毫秒內連點兩下，才能成功印出 'success'
const button = document.getElementById('demo');
const click = fromEvent(button, 'click');
const example2 = click.pipe(
  bufferTime(500),
  filter(arr => arr.length >= 2)
);

example2.subscribe({
  next: value => {
    console.log('success');
  },
  error: err => {
    console.log('Error: ' + err);
  },
  complete: () => {
    console.log('complete');
  }
});
