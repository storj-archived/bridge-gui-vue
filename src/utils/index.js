import crypto from 'crypto';

export const sha256 = function (i) {
  return crypto.createHash('sha256').update(i).digest('hex');
};

/**
 * Gets items from localStorage
 * @param {String} item - name of item to retrieve
 * @returns {String}
 */
export const fromLocalStorage = function (item) {
  if (window && window.localStorage) {
    return window.localStorage.getItem(item);
  }
  return '';
};

export const getAverage = function (sum, numItems) {
  if (!sum) {
    return 0;
  }

  const avg = sum / numItems;

  return avg;
};

export const getSum = function (arr, field) {
  if (!arr || Array.isArray(arr) && arr.length <= 0) {
    return 0;
  }

  const sum = arr.reduce((acc, i) => {
    const add = typeof i[field] === 'undefined' ? 0 : i[field];
    return acc + add;
  }, 0)

  return sum;
};
