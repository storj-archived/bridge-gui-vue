import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import user from './modules/user';
import keypair from './modules/keypair';
import buckets from './modules/buckets';
import storj from './modules/storj-instance';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    keypair,
    buckets,
    storj
  },
  strict: debug,
  plugins: []
});
