import crypto from 'crypto';

export const sha256 = function (i) {
  return crypto.createHash('sha256').update(i).digest('hex');
};
