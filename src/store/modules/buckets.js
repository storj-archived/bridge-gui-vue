/* eslint no-undef: ["error", { "typeof": false }] */
import errors from 'storj-service-error-types';
import Promise from 'bluebird';
import * as types from '../mutation-types';

const state = {
  all: [],
  current: {}
};

const mutations = {
  [types.SET_BUCKETS] (state, buckets) {
    state.all = buckets;
  },

  [types.ADD_BUCKET] (state, bucket) {
    const newBucketList = state.all.concat([bucket]);
    console.log('newBucketlist', newBucketList);
    state.all = newBucketList;
  },

  [types.SET_CURRENT_BUCKET] (state, bucket) {
    console.log('set current bucket', bucket);
    state.current = bucket;
  }
};

const actions = {
  getBuckets ({ commit, state, dispatch, rootState }) {
    return new Promise((resolve, reject) => {
      dispatch('keypairAuth').then((storj) => {
        storj.getBucketList(function (err, buckets) {
          if (err) {
            return reject(err);
          }
          commit(types.SET_BUCKETS, buckets);
          return resolve();
        });
      });
    });
  },

  createBucket ({ commit, state, dispatch }, bucketName) {
    return new Promise((resolve, reject) => {
      dispatch('keypairAuth').then((storj) => {
        storj.createBucket(bucketName, function (err, bucket) {
          if (err) {
            return reject(new errors.InternalError(err));
          }
          console.log('created bucket', bucket);
          commit(types.SET_CURRENT_BUCKET, bucket);
          return resolve(bucket.name);
        });
      });
    });
  },

  getBucket ({ commit, state, dispatch }, bucketId) {
    return new Promise((resolve, reject) => {
      if (!bucketId) {
        return reject(new errors.BadRequestError('No bucket ID'));
      }

      dispatch('keypairAuth').then((storj) => {
        storj.getBucket(bucketId, function (err, bucket) {
          if (err) {
            return reject(new errors.InternalError(err));
          }
          commit(types.SET_CURRENT_BUCKET, bucket);
          return resolve(bucket);
        });
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
