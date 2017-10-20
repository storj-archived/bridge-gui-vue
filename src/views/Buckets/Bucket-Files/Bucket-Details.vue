<template>
  <div class="row mb-1">
    <div class="col col-sm-12">
      <b-card no-body>
        <b-card-header>
          <h5 class="row mb-4">
            <span class="col-sm-6">
              Bucket ID: {{ bucket.id }}
            </span>
            <span class="col-sm-6">
              Status: {{ bucket.status }}
            </span>
          </h5>
        </b-card-header>
        <b-card-body>
          <div class="row">
            <dl class="col-md-6 mb-0">
              <span class="row">
                <dt class="col-sm-6">
                  Storage:
                </dt>
                <dd class="col-sm-6">
                  {{ bucket.storage }} GBMo.
                </dd>
              </span>

              <span class="row">
                <dt class="col-sm-6">
                  Public Permissions:
                </dt>
                <dd class="col-sm-6">
                  <div v-if="!bucket.publicPermissions.length">
                    <em class="text-muted">none</em>
                  </div>
                  <div v-else>
                    <ul>
                      <li v-for="perm in bucket.publicPermissions">
                        {{ perm }}
                      </li>
                    </ul>
                  </div>
                </dd>
              </span>
            </dl>

            <dl class="col-md-6 mb-0">
              <span class="row">
                <dt class="col-sm-6">
                  Transfer:
                </dt>
                <dd class="col-sm-6">
                  {{ bucket.transfer }} GB
                </dd>
              </span>

              <span class="row">
                <dt class="col-sm-6">
                  Pubkeys:
                </dt>
                <dd class="col-sm-6">
                  <div v-if="!bucket.pubkeys.length">
                    <em class="text-muted">none</em>
                  </div>
                  <div v-else>
                    <ul>
                      <li v-for="key in bucket.pubkeys">
                        {{ key }}
                      </li>
                    </ul>
                  </div>
                </dd>
              </span>
            </dl>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bucket-details',

    props: ['bucket']
  };
</script>

<style lang="css">
</style>
