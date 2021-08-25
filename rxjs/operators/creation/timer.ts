import { timer } from 'rxjs';

//emit 0 after 1 second then complete, since no second argument is supplied
const source1 = timer(1000);
//output: 0
const subscriber1 = source1.subscribe(val => console.log(val));

/*
  timer takes a second argument, how often to emit subsequent values
  in this case we will emit first value after 3 second and subsequent
  values every 2 seconds after
*/
const source2 = timer(3000, 2000);
//output: 0,1,2,3,4,5......
const subscriber2 = source2.subscribe(val => console.log(val));
setTimeout(() => subscriber2.unsubscribe(), 10000);
