import { fromEvent, interval, map, take } from "rxjs";

const click = fromEvent(document.body, 'click');
const source = click.pipe(map(e => interval(1000)),take(10));

const example = switch();
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});