import { NEVER, never } from 'rxjs';

never().subscribe({
  next: function(value) {
    console.log('Next');
  },
  complete: function() {
    console.log('Complete!');
  },
  error: function(error) {
    console.log('Error!');
  }
});

NEVER.subscribe({
  next: function(value) {
    console.log('Next');
  },
  complete: function() {
    console.log('Complete!');
  },
  error: function(error) {
    console.log('Error');
  }
});
