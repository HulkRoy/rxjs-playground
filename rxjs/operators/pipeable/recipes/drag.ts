import { fromEvent } from 'rxjs';
import { concatAll, map, takeUntil } from 'rxjs/operators';

/**
1. 首先畫面上有一個元件(#drag)
2. 當滑鼠在元件(#drag)上按下左鍵(mousedown)時，開始監聽滑鼠移動(mousemove)的位置
3. 當滑鼠左鍵放掉(mouseup)時，結束監聽滑鼠移動
4. 當滑鼠移動(mousemove)被監聽時，跟著修改元件的樣式屬性
 */

const dragDOM = document.getElementById('drag');
const body = document.body;

const mouseDown = fromEvent(dragDOM, 'mousedown');
const mouseUp = fromEvent(body, 'mouseup');
const mouseMove = fromEvent(body, 'mousemove');

mouseDown
  .pipe(
    map(() => mouseMove),
    takeUntil(mouseUp),
    concatAll(),
    map((event: MouseEvent) => ({ x: event.clientX, y: event.clientY }))
  )
  .subscribe(pos => {
    dragDOM.style.left = pos.x + 'px';
    dragDOM.style.top = pos.y + 'px';
  });
