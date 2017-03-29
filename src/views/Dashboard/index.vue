<template>
  <section>
    <Nav-Bar class="navbar-default" toggleable>

      <Nav-Toggle target="nav_collapse">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </Nav-Toggle>
        <router-link to="dashboard" class="navbar-brand">
          <img src="static/img/logo-blue.svg" alt="Storj" class="logo" />
        </router-link>

      <Collapse isNav id="nav_collapse">
        <b-Nav isNavBar class="nav navbar-nav navbar-left">

          <Nav-Item @click="navigateTo('Buckets')">Buckets</Nav-Item>
          <Nav-Item @click="navigateTo('Billing')">Billing</Nav-Item>
          <Nav-Item @click="navigateTo('Referrals')">Referrals</Nav-Item>
          <Nav-Item>Documentation</Nav-Item>
          <Nav-Item>API</Nav-Item>
          <Nav-Item>Support</Nav-Item>
        </b-Nav>
      </Collapse>

    </Nav-Bar>
  </section>
</template>

<script>
import Nav from 'bootstrap-vue/components/nav.vue';
import NavBar from 'bootstrap-vue/components/navbar.vue';
import NavToggle from 'bootstrap-vue/components/nav-toggle.vue';
import NavItem from 'bootstrap-vue/components/nav-item.vue';
import Collapse from 'bootstrap-vue/components/collapse.vue';

export default {
  name: 'dashboard',

  components: { bNav: Nav, NavBar, NavToggle, NavItem, Collapse },

  data () {
    return {
      pages: ['Buckets', 'Billing', 'Referrals']
    };
  },

  methods: {
    navigateTo (page) {
      this.$router.push({ name: page });
    }
  }
};
</script>

<style lang="scss">
</style>
