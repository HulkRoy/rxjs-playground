import { Observable, of } from 'rxjs';

//write an operator from scratch using the Observable constructor
function delay<T>(delayInMillis: number) {
  return (observable: Observable<T>) =>
    new Observable<T>(subscriber => {
      // this function will be called each time this
      // Observable is subscribed to.
      const allTimerIDs = new Set<number>();
      let hasCompleted = false;
      const subscription = observable.subscribe({
        next(value) {
          // Start a timer to delay the next value
          // from being pushed.
          const timerID = setTimeout(() => {
            subscriber.next(value);
            // after we push the value, we need to clean up the timer timerID
            allTimerIDs.delete(timerID);
            // If the source has completed, and there are no more timers running,
            // we can complete the resulting observable.
            if (hasCompleted && allTimerIDs.size === 0) {
              subscriber.complete();
            }
          }, delayInMillis);

          allTimerIDs.add(timerID);
        },
        error(err) {
          // We need to make sure we're propagating our errors through.
          subscriber.error(err);
        },
        complete() {
          hasCompleted = true;
          // If we still have timers running, we don't want to yet.
          if (allTimerIDs.size === 0) {
            subscriber.complete();
          }
        }
      });

      // Return the teardown logic. This will be invoked when
      // the result errors, completes, or is unsubscribed.
      return () => {
        subscription.unsubscribe();
        // Clean up our timers.
        for (const id of allTimerIDs) {
          clearTimeout(id);
        }
      };
    });
}

// Try it out!
of(1, 2, 3)
  .pipe(delay(3000))
  .subscribe(console.log);
