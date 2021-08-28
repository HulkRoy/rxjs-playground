import { Observable, of } from 'rxjs';

//emits any number of provided values in sequence
const numberSource = of(1, 2, 3, 4, 5);
//output: 1,2,3,4,5
const numberSubscriber = numberSource.subscribe(val => console.log(val));

//emits values of any type
const mixTypeSource = of(
  'hello of',
  { name: 'Brian' },
  [1, 2, 3],
  function hello() {
    return 'Hello';
  }
);

//same as
const observable = new Observable(observer => {
  observer.next('hello of');
  observer.next({ name: 'Brian' });
  observer.next([1, 2, 3]);
  observer.next(function hello() {
    return 'Hello';
  });
  observer.complete();
});

//output: 'hello of' {name: 'Brian'}, [1,2,3], function hello() { return 'Hello', 'complete' }
const mixTypeSubscriber = mixTypeSource.subscribe({
  next: val => console.log(val),
  complete: () => console.log('complete')
});

observable.subscribe({
  next: val => console.log(val),
  complete: () => console.log('complete')
});
