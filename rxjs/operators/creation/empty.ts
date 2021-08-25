import { EMPTY, empty } from 'rxjs';

//output: 'Complete!'
const emptySubscriber = empty().subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete!'),
  error: () => console.log('Error!')
});

//output: 'Complete!'
const EMPTYSubscriber = EMPTY.subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('EMPTY Complete!'),
  error: () => console.log('Error!')
});
