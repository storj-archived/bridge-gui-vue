<template lang="html">
  <img
    src="//localhost:3001/static/img/storj-loader.svg"
    alt="Storj"
    :width="width"
    :style="style"
  />
</html>

</template>

<script>
export default {
  name: 'sj-loading',

  props: {
    width: {
      type: String,
      default: '100'
    },
    style: {
      type: String,
      default: 'margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;'
    }
  }
};
</script>

<style lang="css">
</style>
