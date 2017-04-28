<template lang="html">
  <div>
    <img
      :src="loader"
      alt="Storj"
      :width="width"
      :style="componentStyle"
    />
  </div>
</html>

</template>

<script>
import loader from './../../static/img/storj-loader.svg';

export default {
  name: 'sj-loading',

  data () {
    return {
      loader
    };
  },

  props: {
    width: {
      type: String,
      default: '100'
    },
    componentStyle: {
      type: String,
      default: 'margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;'
    }
  }
};
</script>

<style lang="scss">
</style>
