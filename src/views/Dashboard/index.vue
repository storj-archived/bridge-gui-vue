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
        <img src="../../../static/img/logo-blue.svg" alt="Storj" class="logo" />
      </router-link>

      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="nav navbar-nav navbar-left">
          <b-nav-item @click="navigateTo('Buckets')">Buckets</b-nav-item>
          <b-nav-item @click="navigateTo('Billing')">Billing</b-nav-item>
          <b-nav-item @click="navigateTo('Referrals')">Referrals</b-nav-item>
          <b-nav-item>Documentation</b-nav-item>
          <b-nav-item>API</b-nav-item>
          <b-nav-item>Support</b-nav-item>
        </b-nav>

        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item @click="logout">Logout</b-nav-item>
        </b-nav>

      </b-collapse>

    </b-navbar>

    <!-- ROUTER VIEW FOR AUTHENTICATED VIEWS -->
    <router-view
      class="authenticated-views container-fluid"
      keep-alive
      transition
      transition-mode="out-in"
    >
    </router-view>

  </section>
</template>

<script>
export default {
  name: 'dashboard',

  data () {
    return {

    };
  },

  methods: {
    navigateTo (page) {
      this.$router.push({ name: page });
    },

    logout () {
      console.log('logging out');
    }
  }
};
</script>

<style lang="scss" scoped>
  .dashboard {
    background: #f9f9f9;
    padding-bottom: 3em;
  }

  .nav-item {
    margin: 0 0.5rem;
  }

  .nav-item:hover {
    cursor: pointer;
  }
</style>
<!-- <style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style> -->
