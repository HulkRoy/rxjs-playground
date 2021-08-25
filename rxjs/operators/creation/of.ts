import { of } from 'rxjs';

//emits any number of provided values in sequence
const numberSource = of(1, 2, 3, 4, 5);
//output: 1,2,3,4,5
const numberSubscriber = numberSource.subscribe(val => console.log(val));

//emits values of any type
const mixTypeSource = of('hello of', { name: 'Brian' }, [1, 2, 3], function hello() {
  return 'Hello';
});
//output: 'hello of' {name: 'Brian'}, [1,2,3], function hello() { return 'Hello' }
const mixTypeSubscriber = mixTypeSource.subscribe({
  next: val => console.log(val)});
