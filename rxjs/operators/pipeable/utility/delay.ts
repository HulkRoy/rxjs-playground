import { delay, fromEvent, interval, map, take } from 'rxjs';

const source = interval(300).pipe(take(5));

const example = source.pipe(delay(500));

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

/**
 * 
source : --0--1--2--3--4|
        delay(500)
example: -------0--1--2--3--4|
 * 
 */

//delay 除了可以傳入毫秒以外，也可以傳入 Date
const source2 = interval(300).pipe(take(5));

const example2 = source2.pipe(delay(new Date(new Date().getTime() + 500)));
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

const imgList = document.getElementsByClassName('imgFollow');

const movePos = fromEvent(document, 'mousemove').pipe(
  map(e => ({ x: e.clientX, y: e.clientY }))
);

function followMouse(DOMArr) {
  const delayTime = 600;
  DOMArr.forEach((item, index) => {
    movePos
      .pipe(
        delay((delayTime * (Math.pow(0.65, index) + Math.cos(index / 4))) / 2)
      )
      .subscribe(function(pos) {
        item.style.transform =
          'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0)';
      });
  });
}

followMouse(Array.from(imgList));
