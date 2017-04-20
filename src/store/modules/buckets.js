/* eslint no-undef: ["error", { "typeof": false }] */
import errors from 'storj-service-error-types';
import Promise from 'bluebird';
import {
  SET_BUCKETS,
  ADD_BUCKET,
  SET_CURRENT_BUCKET_META,
  SET_CURRENT_BUCKET_FILES,
  CLEAR_BUCKET_STATE
} from '../mutation-types';

const state = {
  all: [],
  current: {
    meta: {},
    files: []
  }
};

const mutations = {
  [SET_BUCKETS] (state, buckets) {
    state.all = buckets;
  },

  [ADD_BUCKET] (state, bucket) {
    const newBucketList = state.all.concat([bucket]);
    console.log('newBucketlist', newBucketList);
    state.all = newBucketList;
  },

  [SET_CURRENT_BUCKET_META] (state, bucket) {
    console.log('set current bucket', bucket);
    state.current.meta = bucket;
  },

  [SET_CURRENT_BUCKET_FILES] (state, files) {
    console.log('set current bucket files', files);
    state.current.files = files;
  },

  [CLEAR_BUCKET_STATE] (state) {
    state.all = [];
    state.current.meta = {};
    state.current.files = [];
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
          commit(SET_BUCKETS, buckets);
          return resolve();
        });
      }).catch((err) => reject(err));
    });
  },

  createBucket ({ commit, state, dispatch }, bucketName) {
    return new Promise((resolve, reject) => {
      dispatch('keypairAuth').then((storj) => {
        storj.createBucket(bucketName, function (err, bucket) {
          if (err) {
            return reject(new errors.InternalError(err.message));
          }
          console.log('created bucket', bucket);
          commit(SET_CURRENT_BUCKET_META, bucket);
          return resolve(bucket.id);
        });
      }).catch((err) => reject(new errors.InternalError(err)));
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
          commit(SET_CURRENT_BUCKET_META, bucket);
          return resolve(bucket);
        });
      }).catch((err) => reject(new errors.InternalError(err)));
    });
  },

  getFileList ({ commit, state, dispatch }, bucketId) {
    return new Promise((resolve, reject) => {
      if (!bucketId) {
        return reject(new errors.BadRequestError('No bucket ID'));
      }

      dispatch('keypairAuth').then((storj) => {
        storj.getFileList(bucketId, function (err, files) {
          if (err) {
            return reject(new errors.InternalError(err));
          }
          commit(SET_CURRENT_BUCKET_FILES, files);
          return resolve(files);
        });
      }).catch((err) => reject(new errors.InternalError(err)));
    });
  }
};

export default {
  state,
  mutations,
  actions
};
