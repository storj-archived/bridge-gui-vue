import moment from 'moment';

export const prettifyAmount = function (amount) {
  if (typeof (amount) !== 'number') {
    return '0.00';
  }

  const modAmount = (amount / 100).toFixed(6);

  // Handles any 0.000000 debits
  if (modAmount.indexOf('0.000000') === 0) {
    return '0.00';
  }

  // Trims zeros if all are 6
  if (modAmount.substr(-6) === '000000') {
    const setToTwoPlaces = (amount / 100).toFixed(2);
    return setToTwoPlaces;
  }

  // Return all the decimal places if it's less than $1
  // Looks weird otherwise
  if (modAmount.indexOf('0.') === 0) {
    return modAmount;
  }

  // Otherwise, if amount is > $1, then trim the zeros
  const trimmedAmount = trimOffZeros(modAmount);

  return trimmedAmount;
};

function trimOffZeros (amount) {
  const trimmed = amount.toString().replace(/0+$/, '');

  if (trimmed.substr(-1) === '.') {
    const addTwoZeros = trimmed.concat('00');
    return addTwoZeros;
  }

  return trimmed;
}

export const addDollarSign = function (amount) {
  if (amount.indexOf('-') === 0) {
    var modAmount = amount.slice(1, amount.length);
    return `-$${modAmount}`;
  }
  return `$${amount}`;
};

export const dateFormat = function (date, formatType) {
  switch (formatType) {
    case 'long':
      return `${moment.utc((date)).format('MMM DD, YYYY - HH:mm')} UTC`;

    default:
      return `${moment.utc((date)).format('MMM DD, YYYY - HH:mm')} UTC`;
  }
};

/**
 * Adds ordinal suffixes to date and stringifies
 * @param {Number} date - only the day date, 1, 2, ... 31, etc.
 * @returns {String} - date with ordinal suffix
 */
export const dateSuffix = function (date) {
  console.log('date dasdf', date);
  const nd = [ 2, 22 ];
  const st = [ 1, 21, 31 ];
  const th = [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 24, 25, 26, 27, 28, 29, 30 ];
  const rd = [ 3, 23 ];

  if (th.indexOf(date) !== -1) {
    return `${date}th`;
  }

  if (st.indexOf(date) !== -1) {
    return `${date}st`;
  }

  if (nd.indexOf(date) !== -1) {
    return `${date}nd`;
  }

  if (rd.indexOf(date) !== -1) {
    return `${date}rd`;
  }
};
