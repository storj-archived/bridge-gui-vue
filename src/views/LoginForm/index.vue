<template lang="html">
  <div class="login-form container auth">
    <div class="row">
      <div class="col-lg-6 col-lg-push-3 col-md-8 col-md-push-2 col-xs-12
        text-center">
        <div class="row">
          <div class="col-sm-12">
            <div class="content">
              <!-- header -->
              <h1 class="title text-center form-group">
                <span v-if="!passwordReset">
                  Login
                </span>
                <span v-else>
                 Success
                 <p>
                   Your password has been successfully changed. Please log in.
                 </p>
                </span>
              </h1>

              <form>
                <div class="form-group">

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-form',
  data () {

  }

};
</script>

<style lang="scss">
</style>
