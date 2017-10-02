<template>
  <section class="container">
    <div>
      <h2>Wallets</h2>    
      <div class="row">
        <div class="col">
          <div class="content">
            
            <div class="col">
              <button class="btn btn-primary">Pay with STORJ</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'wallet-list',
  data () {
    return {
      wallets: []
    };
  }
};
</script>

<style lang="scss">

</style>
