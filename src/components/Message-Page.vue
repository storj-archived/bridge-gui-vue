<template lang="html">
  <section class="container auth">
      <div class="row justify-content-center">
        <div class="col text-center">
          <div class="row">
            <div class="col">
              <div class="content form-horizontal">
                <h1 class="title text-center form-group">{{ title }}</h1>
                <div class="row">
                  <p class="text-center">
                    {{ message }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'message-page',

  props: {
    title: String,
    message: String
  }
};
</script>

<style lang="scss">
</style>
