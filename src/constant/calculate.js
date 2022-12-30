export const LBS = (weight) => {
  return (
    (weight * 2.2046).toFixed(1)
  )
}

export const FEET = (height) => {
  // Convert meters to feet
  let feet = height * 3.28084;

  // Calculate the number of whole feet
  let wholeFeet = (feet / 12).toFixed(1) * 10

  // Calculate the number of inches
  let inches = feet * 12;

  // Calculate the remaining inches
  let remainingInches = Math.round(inches % 12);

  // Convert the remaining inches to a string and pad with leading zeros as needed
  remainingInches = remainingInches.toString().padStart(2, '0');

  // Return the result as a formatted string
  return `(${wholeFeet}'${remainingInches}")`;
}



