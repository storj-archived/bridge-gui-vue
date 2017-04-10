/**
 * Prettifies the amount printed in billing history.
 * Returns either a string that lets the user know that the amount that
 * has been used is than 0.01 GB or rounds the amount to two decimal
 * places.
 * @param {Number} num - number in bytes or GB
 * @param {String} type - optional - undefined or 'bytes'
 */
export function roundToGBAmount (num, type) {
  const GB = 1000000000;

  const numInGB = type === 'bytes' ? num / GB : num;
  const modNum = setToTwoDecimalPlaces(numInGB);

  // Checks to see if the amount is less than one cent
  if (modNum.indexOf('0.00') === 0) {
    const lessThanOneCent = '< 0.01';
    return lessThanOneCent;
  }
  return `${modNum}`;
};

export function setToTwoDecimalPlaces (num) {
  const roundedToTwoPlaces = Math.round(num * 100) / 100;
  const setToTwoPlaces = roundedToTwoPlaces.toFixed(2);

  return setToTwoPlaces;
};
