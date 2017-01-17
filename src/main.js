// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './views/App';
import Vuetify from 'vuetify';
import * as filters from './filters';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

Vue.use(Vuetify);

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
