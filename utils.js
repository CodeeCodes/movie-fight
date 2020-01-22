//Check if single id assigned, resets timeout every stroke delay of 1000ms
//Debouncing an input
//fc is function you want to pass in and delay how long search function should delay search

const debounceFc = (fc, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fc.apply(null, args);
    }, delay);
  };
};

