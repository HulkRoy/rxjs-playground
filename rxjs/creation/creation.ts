import { Observable } from 'rxjs';

const helloWorld = new Observable(observer => {
  observer.next('Hello');
  observer.next('World');
  observer.complete();
});
const helloWorldSubscriber = helloWorld.subscribe(val => console.log(val));

const helloRxJS = Observable.create(observer => {
  observer.next('Hello');
  observer.next('RxJS');
  observer.complete();
});
const helloRxJSSubscriber = helloRxJS.subscribe(val => console.log(val));
