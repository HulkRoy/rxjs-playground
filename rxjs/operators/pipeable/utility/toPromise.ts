import { delay, of } from 'rxjs';

//return basic observable
const sample = val => of(val).pipe(delay(2000));
//convert basic observable to promise
const example = sample('First Example')
  .toPromise()
  //output: 'First Example'
  .then(result => {
    console.log('From Promise:', result);
  });

//return basic observable
const sample2 = val => of(val).pipe(delay(6000));
/*
  convert each to promise and use Promise.all
  to wait for all to resolve
*/
const example2 = () => {
  return Promise.all([
    sample2('Promise 1').toPromise(),
    sample2('Promise 2').toPromise()
  ]);
};
//output: ["Promise 1", "Promise 2"]
example2().then(val => {
  console.log('Promise.all Result:', val);
});
