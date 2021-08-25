import { Observable, throwError } from 'rxjs';

//emits an error with specified value on subscription
const source = throwError('This is an error!');
//output: 'Error: This is an error!'
const subscriber = source.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Complete!'),
  error: val => console.log(`Error: ${val}`)
});

let errorCount = 0;

const errorWithTimestamp = throwError(() => {
  const error: any = new Error(`This is error number ${++errorCount}`);
  error.timestamp = Date.now();
  return error;
});

const errorWithTimestampSubscriber1 = errorWithTimestamp.subscribe({
  error: err => console.log(err.timestamp, err.message)
});

const errorWithTimestampSubscriber2 = errorWithTimestamp.subscribe({
  error: err => console.log(err.timestamp, err.message)
});

// Logs the timestamp and a new error message each subscription;

// Using throwError inside of an operator or creation function with a callback, is usually not necessary, You can just throw the error instead: throw new Error(`Invalid time ${ms}`)
