import crypto from 'crypto';
import moment from 'moment';

/**
 * Hash password
 * @param {String} i - string to hash
 */
export const sha256 = function (i) {
  return crypto.createHash('sha256').update(i).digest('hex');
};

/**
 * Convenience class to verify localStorage exists
 * TODO: Consider adding polyfill...
 *
 */
class LStorage {
  _verify () {
    if (window && window.localStorage) {
      return true;
    }
    return false;
  }

  /**
   * Sets item to localStorage
   * @param {String} item - name of item to set
   * @param {String} value - value of item to set
   */
  save (item, value) {
    if (this._verify()) {
      window.localStorage.setItem(item, value);
    }
  }

  /**
   * Gets items from localStorage
   * @param {String} item - name of item to retrieve
   * @returns {String}
   */
  retrieve (item) {
    if (this._verify()) {
      const i = window.localStorage.getItem(item);
      return i;
    }
  }

  /**
   * Removes an item from localStorage
   * @param {String} item - name of item to remove
   */
  remove (item) {
    if (this._verify()) {
      window.localStorage.removeItem(item);
    }
  }
}

export const lStorage = new LStorage();

/**
 * Gets average
 * @param {Number} sum - sum of all items
 * @param {Number} numItems - number of items making up sum
 * @returns {Number} average
 */
export const getAverage = function (sum, numItems) {
  if (!sum) {
    return 0;
  }
  return sum / numItems;
};

/**
 * Sums the values of specified field in collection array [{}, {}]
 * @param {Array} arr - collection Array
 * @param {string} field - field in arr to sum up
 * @returns {Number}
 */
export const getSum = function (arr, field) {
  if (!arr || Array.isArray(arr) && arr.length <= 0) {
    return 0;
  }

  const sum = arr.reduce((acc, i) => {
    const add = typeof i[field] === 'undefined' ? 0 : i[field];
    return acc + add;
  }, 0);

  return sum;
};

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

/**
 * Rounds a number to two decimal places
 * @param {Number} num
 * @returns {String} num rounded and stringified to two decimal places
 */
export function setToTwoDecimalPlaces (num) {
  const roundedToTwoPlaces = Math.round(num * 100) / 100;
  const setToTwoPlaces = roundedToTwoPlaces.toFixed(2);

  return setToTwoPlaces;
};

/**
 * Prettifies credit.promo_codes.
 * NB: Could possibly be better suited as a filter
 * @param {String} code - promo code
 * @returns {String} prettified promo code
 */
export const promoCodes = function (code) {
  switch (code) {
    case 'referral-recipient':
    case 'referral-sender':
      return 'Referral';

    case 'storj-event':
      return 'Storj';

    default:
      return 'Storj';
  }
};

/**
 * Formats from cents to dollars
 * @param {Number} amount - amount in cents (1000, 2000, 150)
 * @returns {String} prettified amount e.g. -$10.00, $12.00
 */
export const formatAmount = function (amount) {
  const newAmount = Math.round(amount) / 100;

  if (amount < 0) {
    return `-$${newAmount.toFixed(2).substr(1)}`;
  }

  return `$${(newAmount).toFixed(2)}`;
};

export const getRange = function (billingDate = (new Date()).getDate(), offset = 1) {
  console.log('billingDate', billingDate);
  const format = 'YYYY-MM-DD HH:mm:ss.SSS';
  const today = new Date();
  const currentYearMonth = [
    today.getUTCFullYear(),
    // plus 1 for 0 index to 1 index conversion; minus 1 for constant previous month
    today.getUTCMonth() // + 1 - 1
  ];

  const dateThisMonthString = (date) => {
    return `${currentYearMonth.concat([date]).join('-')} 00:00:00.000`;
  };

  const daysInMonth = moment
    .utc(dateThisMonthString(1), format)
    .subtract(offset, 'month')
    .add(1, 'month')
    .subtract(1, 'day')
    .date();

  const startDayOfMonth = (billingDate > daysInMonth)
    ? daysInMonth
    : billingDate;
  const startDate = moment
    .utc(dateThisMonthString(startDayOfMonth), format)
    .subtract(offset, 'month')
    .valueOf();

  const endDate = (moment(startDate).add('1', 'month').valueOf());
  console.log('getRange startDate: endDate', startDate, endDate);

  return {
    startDate,
    endDate
  };
};
