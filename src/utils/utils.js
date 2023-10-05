export function searchMatches(search) {
  // Currying to support 'search' assingment just once and use it multiple times
  return (field) => {
    return field.toLowerCase().includes(search.toLowerCase());
  }
}

// ----------------------------------------------------------------

export function milisecondsToClockMinutes(milliseconds) {
  if (!milliseconds) return "";

  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

// ----------------------------------------------------------------