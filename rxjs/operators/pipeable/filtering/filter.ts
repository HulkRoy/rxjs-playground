import { filter, interval } from 'rxjs';

const source = interval(1000);
const newest = source.pipe(filter(x => x % 2 === 0));

const subscription = newest.subscribe(console.log);
setTimeout(() => subscription.unsubscribe(), 5000);

/**
 * 
source: -----0-----1-----2-----3-----4-...
            filter(x => x % 2 === 0)
newest: -----0-----------2-----------4-...
*
*/
