<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <div></div>
      <router-link
        to="/communication/mail/add"
        class="btn btn-primary btn-rounded text-uppercase"
      >Créer ma campagne Mail</router-link>
    </div>
    <div class="row">
      <div class="col">{{ stat }}</div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      stat: []
    };
  },
  created() {
      this.getStats()
  },
  methods: {
      getStats() {
          this.$http.get('emails/statistics').then(resp => {
              this.stat = resp.data;
          })
      }
  }
};
</script>