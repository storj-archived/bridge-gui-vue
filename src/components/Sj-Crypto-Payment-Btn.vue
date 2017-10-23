<template lang="html">
  <div class="crypto-payment-btn">
    <p>
      Add credit with
      <b-button v-b-modal.storj-modal
        class="btn btn-payment"
        @click="handleStorjModal"
      >
        <img class="btn-payment-icon-bitcoin"
          :src="storjIcon"
          alt="storj"
        />
        STORJ
      </b-button> 
      <b-button
        href="https://bitpay.com/cart/add?itemId=JoY55YbAiBvdiV8EZVTmAw"
        target="_blank"
        class="btn btn-payment">
          <img class="btn-payment-icon-bitcoin"
            :src="bitcoinIcon"
            alt="bitcoin"
          />
       BTC 
      </b-button>
    </p>
    <b-modal id="storj-modal" title="Pay with STORJ">
      <h2>STORJ Wallet</h2>
      <div id="storjQR">
        <qrcode-vue :value="wallets.storj" :size="150" level="H"></qrcode-vue>
      </div>
      <div>
        <b-card>
          <p class="card-text">{{ wallets.storj }}</p>
        </b-card>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import bitcoinIcon from './../../static/img/icon-bitcoin.svg';
import storjIcon from './../../static/img/logo-blue.svg';
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'sj-crypto-payment-btn',
  computed: mapState({
    wallets: state => state.billing.wallets.wallets
  }),
  data () {
    return {
      bitcoinIcon,
      storjIcon
    };
  },
  components: {
    QrcodeVue
  },
  methods: {
    handleStorjModal () {
      console.log('wallets: ', this.wallets);
    }
  },
  created () {
    this.$store.dispatch('getWallets');
  }
};
</script>

<style lang="scss">
.crypto-payment-btn {
  margin-top: 1.75rem;
}

.crypto-payment-btn .btn-payment {
  color: #0e0e0e;
  background: #fff;
  padding: 0.6em 0.6em;
  letter-spacing: 0;
  border-color: rgba(0, 0, 0, 0.10);
}

.crypto-payment-btn .btn-payment:hover {
  border-color: transparent;
  background: #eee;
}

.btn-payment-icon-bitcoin {
  width: 22px;
  height: 22px;
  margin-right: 0.3em;
}

.btn-payment-text {
  color: #0275d8;
}
</style>
