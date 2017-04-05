/* eslint no-undef: ["error", { "typeof": false }] */
import errors from 'storj-service-error-types';
import Promise from 'bluebird';
import * as types from '../mutation-types';

const state = {
  all: [],
  currentBucket: {}
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
    state.currentBucket = bucket;
  }
};

const actions = {
  getBuckets ({ commit, state, rootState }) {
    return new Promise((resolve, reject) => {
      const testBuckets = [{
        id: 1,
        name: 'hai',
        storage: 0,
        transfer: 0,
        status: 'Active'
      }, {
        id: 2,
        name: 'bucket two',
        storage: 0,
        transfer: 0,
        status: 'Active'
      }];
      commit(types.SET_BUCKETS, testBuckets);

      setTimeout(function () {
        return resolve();
      }, 2000);

      // WORKS. COMMENTING OUT UNTIL STORJ AUTH IS GOOD
      // const storj = rootState.storj.instance;
      // storj.getBucketList(function (err, buckets) {
      //   if (err) {
      //     return reject(err);
      //   }
      //   commit(types.SET_BUCKETS, buckets);
      //   return resolve();
      // });
    });
  },

  createBucket ({ commit, state, dispatch }, bucketName) {
    return new Promise((resolve, reject) => {
      dispatch('keypairAuth').then((storj) => {
        storj.createBucket(bucketName, function (err, meta) {
          if (err) {
            return reject(new errors.InternalError(err));
          }
          console.log('meta for bucket', meta);
          return resolve(meta);
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
