<template>
  <section class="dashboard">
    <!-- NAVBAR -->
    <b-navbar class="navbar-default" toggleable>

      <b-nav-toggle target="nav_collapse">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </b-nav-toggle>

      <router-link :to="'/dashboard'" class="navbar-brand">
        <img :src="storjLogo" alt="Storj" class="logo" />
      </router-link>

      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="nav navbar-nav navbar-left">
          <b-nav-item @click="navigateTo('Buckets')">Buckets</b-nav-item>
          <b-nav-item @click="navigateTo('Billing')">Billing</b-nav-item>
          <b-nav-item @click="navigateTo('Referrals')">Referrals</b-nav-item>
          <b-nav-item href="https://storj.readme.io/">Documentation</b-nav-item>
          <b-nav-item href="https://storj.github.io/bridge">API</b-nav-item>
          <b-nav-item href="https://storj.readme.io/discuss">Support</b-nav-item>
        </b-nav>

        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item @click="handleClick">Logout</b-nav-item>
        </b-nav>

      </b-collapse>

    </b-navbar>

    <!-- ROUTER VIEW FOR AUTHENTICATED VIEWS -->
    <router-view
      class="authenticated-views"
      keep-alive
      transition
      transition-mode="out-in"
    >
    </router-view>

  </section>
</template>

<script>
import storjLogo from '../../../static/img/logo-blue.svg';
import { mapActions } from 'vuex';

export default {
  name: 'dashboard',

  data () {
    return {
      storjLogo
    };
  },

  methods: {
    ...mapActions([ 'logout' ]),

    handleClick () {
      this.logout()
        .then(() => this.$router.push({ name: 'Login' }))
        .catch(() => this.$router.push({ name: 'Login' }));
    },

    navigateTo (page) {
      this.$router.push({ name: page });
    }
  }
};
</script>

<style lang="scss" scoped>
  .dashboard {
    background: #f9f9f9;
    padding-bottom: 3em;
    height: 100%;
    width: 100%;
  }

  .dashboard > .navbar-default {
    margin-bottom: -1px;
    padding-bottom: 0;
  }

  .dashboard > .navbar-default .navbar-nav {
    margin-bottom: -4px;
    padding-bottom: 0;
  }

  .authenticated-views {
    background: #f9f9f9;
    padding: 3rem;
  }

  .dashboard .nav-item {
    margin: 0 0.5rem;
    min-width: 80px;
  }

  .nav-item:hover {
    cursor: pointer;
  }
</style>
<!-- <style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style> -->
