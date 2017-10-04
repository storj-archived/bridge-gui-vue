<template>
  <section class="container">
    <div>
      <h2>Wallets</h2>    
      <div class="row">
        <div class="col">
          <div class="content">
            <h2>Storj Wallet</h2>          
            <div> {{ val }} </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'wallet-list',
  props: ['val']
};
</script>

<style lang="scss">

</style>
