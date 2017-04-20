// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import * as filters from './filters';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';

import VueClipboards from 'vue-clipboards';
// ES build is more efficient by reducing unneeded components with tree-shaking.
// (Needs Webpack 2 or Rollup)
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

// Import styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Globally register components
Vue.use(BootstrapVue);
Vue.use(VueClipboards);

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue({
  router,
  store,
  ...App
});

// actually mount to DOM
app.$mount('#app');
