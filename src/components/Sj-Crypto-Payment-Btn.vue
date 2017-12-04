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
    <b-modal :ok-only="true" id="storj-modal" title="Pay with STORJ">
      <div id="storjQR">
      </div>
      <div>
        <b-button v-if="!this.wallets.length" @click="createWallet()">
          Create a wallet
        </b-button>
        <div v-if="this.wallets.length" class="disclaimer">
          Please send your STORJ payments to the address below. Sending any other token to this address will result in a loss of funds.
        </div>
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
        <div v-if="this.wallets.length" class="disclaimer">
          Payments in STORJ may take up to an hour to to be confirmed and will show up in your Billing History once completed. You must refresh your billing page for new entries to appear.
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import bitcoinIcon from './../../static/img/icon-bitcoin.svg';
import storjIcon from './../../static/img/icon-logo.png';
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
.disclaimer {
  margin: 5px 0px;
}
</style>
