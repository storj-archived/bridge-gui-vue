import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import user from './modules/user';
import keypair from './modules/keypair';
import buckets from './modules/buckets';
import auth from './modules/auth';
import billing from './modules/billing';
import marketing from './modules/marketing';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  modules: {
    auth,
    user,
    keypair,
    buckets,
    billing,
    marketing
  },
  strict: debug,
  plugins: []
});
