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
