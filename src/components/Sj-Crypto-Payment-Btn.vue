<template lang="html">
  <div class="crypto-payment-btn">
    <p>
      Add credit with
      <b-button 
        v-b-modal.storj-modal
        class="btn btn-payment"
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
      </div>
      <div>
        <b-button v-if="!this.wallets.length" @click="createWallet()">
          Create a wallet
        </b-button>
        <b-list-group>
          <b-list-group-item v-for="(wallet, collapseKey) in getTokenWallets('STORJ')" >
             <b>{{ wallet.token }}</b>
            <b>{{ wallet.name }}</b>
            <p>{{ wallet.address }}</p>
            <p>
              <qrcode-vue :value="wallet.address" :size="150" level="H"></qrcode-vue> 
            </p>
          </b-list-group-item>
        </b-list-group>
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
    wallets: state => state.billing.wallets
  }),
  data () {
    return {
      bitcoinIcon,
      storjIcon,
      storj: []
    };
  },
  components: {
    QrcodeVue
  },
  methods: {
    getTokenWallets (token) {
      if (this.wallets.length) {
        return this.wallets.filter(wallet => wallet.token === token);
      }
    },
    createWallet (token) {
      const actions = [
        this.$store.dispatch('createWallet', 'STORJ'),
        this.$store.dispatch('getWallets')
      ];

      Promise.all(actions)
        .then(() => {
          this.storj = this.getTokenWallets('STORJ');
        });
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
