import { interval, mapTo } from 'rxjs';

const source = interval(1000);
const newest = source.pipe(mapTo(2));

const subscription = newest.subscribe(console.log);
setTimeout(() => subscription.unsubscribe(), 5000);

/**
 * 
source: -----0-----1-----2-----3--...
                mapTo(2)
newest: -----2-----2-----2-----2--...
*
*/
