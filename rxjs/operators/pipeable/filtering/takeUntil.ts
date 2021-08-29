import { fromEvent, interval, take, takeUntil } from 'rxjs';

const source = interval(1000);
const click = fromEvent(document.body, 'click');
const example = source.pipe(takeUntil(click));

const subscription = example.subscribe({
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
source : -----0-----1-----2------3--
click  : ----------------------c----
                takeUntil(click)
example: -----0-----1-----2----|
*
*/
