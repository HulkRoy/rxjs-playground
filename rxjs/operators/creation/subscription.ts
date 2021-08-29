import { interval } from 'rxjs';

const observable = interval(1000);
const subscription = observable.subscribe(x => console.log(x));
// Later:
// This cancels the ongoing Observable execution which
// was started by calling subscribe with an Observer.
subscription.unsubscribe();

const observable1 = interval(400);
const observable2 = interval(300);

const subscription2 = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x =>
  console.log('second: ' + x)
);

subscription2.add(childSubscription);

setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription2.unsubscribe();
}, 1000);
