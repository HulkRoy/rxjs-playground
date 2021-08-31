import './style.css';

/**
 * Creation
 */
import './rxjs/creation/creation';
import './rxjs/creation/observer';

/**
 * Operators
 */
// Creation
import './rxjs/operators/creation/of';
import './rxjs/operators/creation/from';
import './rxjs/operators/creation/fromEvent';
import './rxjs/operators/creation/never';
import './rxjs/operators/creation/empty';
import './rxjs/operators/creation/throwError';
import './rxjs/operators/creation/interval';
import './rxjs/operators/creation/timer';
import './rxjs/operators/creation/range';

import './rxjs/operators/creation/subscription';

// Pipeable
import './rxjs/operators/pipeable/customize/map';
import './rxjs/operators/pipeable/customize/delay';

import './rxjs/operators/pipeable/transformation/map';
import './rxjs/operators/pipeable/transformation/mapTo';
import './rxjs/operators/pipeable/transformation/scan';
import './rxjs/operators/pipeable/transformation/buffer';
import './rxjs/operators/pipeable/transformation/bufferTime';
import './rxjs/operators/pipeable/transformation/bufferCount';
import './rxjs/operators/pipeable/transformation/concatMap';
import './rxjs/operators/pipeable/transformation/switchMap';
import './rxjs/operators/pipeable/transformation/mergeMap';

import './rxjs/operators/pipeable/filtering/filter';
import './rxjs/operators/pipeable/filtering/take';
import './rxjs/operators/pipeable/filtering/first';
import './rxjs/operators/pipeable/filtering/takeUntil';
import './rxjs/operators/pipeable/filtering/skip';
import './rxjs/operators/pipeable/filtering/takeLast';
import './rxjs/operators/pipeable/filtering/last';
import './rxjs/operators/pipeable/filtering/debounce';
import './rxjs/operators/pipeable/filtering/throttle';
import './rxjs/operators/pipeable/filtering/distinct';

import './rxjs/operators/pipeable/utility/delay';
import './rxjs/operators/pipeable/utility/delayWhen';
import './rxjs/operators/pipeable/utility/repeat';
import './rxjs/operators/pipeable/utility/tap';
import './rxjs/operators/pipeable/utility/finalize';
import './rxjs/operators/pipeable/utility/toPromise';

import './rxjs/operators/pipeable/combination/concatAll';
import './rxjs/operators/pipeable/combination/concat';
import './rxjs/operators/pipeable/combination/startWith';
import './rxjs/operators/pipeable/combination/merge';
import './rxjs/operators/pipeable/combination/combineLatest';
import './rxjs/operators/pipeable/combination/zip';
import './rxjs/operators/pipeable/combination/withLatestFrom';
import './rxjs/operators/pipeable/combination/switchAll';
import './rxjs/operators/pipeable/combination/mergeAll';

import './rxjs/operators/pipeable/errorHandling/catchError';
import './rxjs/operators/pipeable/errorHandling/retry';
import './rxjs/operators/pipeable/errorHandling/retryWhen';

import './rxjs/operators/pipeable/recipes/drag';
import './rxjs/operators/pipeable/recipes/videoFixed';
import './rxjs/operators/pipeable/recipes/autoComplete';
