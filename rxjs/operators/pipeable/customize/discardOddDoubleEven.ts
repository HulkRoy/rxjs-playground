import { of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

//make a function that discarded odd values and doubled even values
function discardOddDoubleEven(value: number) {
  return pipe(
    filter((v: number) => !(v % 2)),
    map((v: number) => v + v)
  );
}

discardOddDoubleEven(1).prototype.pipe().subscribe;