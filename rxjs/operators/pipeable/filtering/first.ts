import { first, interval } from 'rxjs';

const source = interval(1000);
const newest = source.pipe(first());

const subscription = newest.subscribe({
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

setTimeout(() => subscription.unsubscribe(), 5000);

/**
 * 
source : -----0-----1-----2-----3--..
                first()
example: -----0|
*
*/
