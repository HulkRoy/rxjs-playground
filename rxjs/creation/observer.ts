import { Observable } from 'rxjs';

const helloWorld = new Observable(observer => {
  observer.next('Hello');
  observer.next('World');
  observer.complete();
  observer.next('not work');
});

const helloWorldError = new Observable(observer => {
  try {
    observer.next('Hello');
    observer.next('World');
    throw 'some exception';
  } catch (e) {
    observer.error(e);
  }
});

const observer = {
  next: value => console.log(value),
  error: err => console.log(err),
  complete: () => console.log('Complete')
};

helloWorld.subscribe(observer);
helloWorldError.subscribe(observer);

helloWorldError.subscribe(
  value => {
    console.log(value);
  },
  error => {
    console.log('Error: ', error);
  },
  () => {
    console.log('Complete');
  }
);
