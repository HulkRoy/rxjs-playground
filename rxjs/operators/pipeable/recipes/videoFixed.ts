import {
  concatAll,
  filter,
  fromEvent,
  map,
  takeUntil,
  withLatestFrom
} from 'rxjs';

const video = document.getElementById('video');
const anchor = document.getElementById('anchor');

const scroll = fromEvent(document, 'scroll');
const mouseDown = fromEvent(video, 'mousedown');
const mouseUp = fromEvent(document, 'mouseup');
const mouseMove = fromEvent(document, 'mousemove');

const validValue = (value, max, min) => {
  return Math.min(Math.max(value, min), max);
};

scroll
  .pipe(map(e => anchor.getBoundingClientRect().bottom < 0))
  .subscribe(bool => {
    if (bool) {
      video.classList.add('video-fixed');
    } else {
      video.classList.remove('video-fixed');
    }
  });

mouseDown
  .pipe(
    filter(e => video.classList.contains('video-fixed')),
    map(e => mouseMove),
    takeUntil(mouseUp),
    concatAll(),
    withLatestFrom(mouseDown, (move, down) => {
      return {
        x: validValue(move.clientX - down.offsetX, window.innerWidth - 320, 0),
        y: validValue(move.clientY - down.offsetY, window.innerHeight - 180, 0)
      };
    })
  )
  .subscribe(pos => {
    video.style.top = pos.y + 'px';
    video.style.left = pos.x + 'px';
  });

/**
   * 
  準備 static 樣式與 fixed 樣式
  HTML 要有一個固定位置的錨點(anchor)
  當滾動超過錨點，則影片變成 fixed
  當往回滾動過錨點上方，則影片變回 static
  影片 fixed 時，要能夠拖拉
  拖拉範圍限制在當前可視區間
   * 
   */
