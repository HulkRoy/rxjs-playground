import { Observable, of } from 'rxjs';

const people = of('Hulk', 'Roy');

function map(source, callback) {
  return new Observable(observer => {
    return source.subscribe(
      value => {
        try {
          observer.next(callback(value));
        } catch (e) {
          observer.error(e);
        }
      },
      err => {
        observer.error(err);
      },
      () => {
        observer.complete();
      }
    );
  });
}

const helloPeople = map(people, item => item + ' Hello~');

helloPeople.subscribe(console.log);
// Hulk Hello~
// Roy Hello~
