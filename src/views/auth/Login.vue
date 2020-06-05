<template>
  <div class="dashboard-full-page-wrapper">
    <div class="card" style="min-width: 300px;">
      <div class="card-header">
          Connexion
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" v-model="credentials.email" />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" class="form-control" v-model="credentials.password" />
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click.prevent="login">Connexion</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
      login() {
          this.$store.dispatch('login', this.credentials).then(() => {
              this.$toasted.global.success({message: 'Vous êtes désormais connecté.'})
          }).catch(err => {
              this.$toasted.global.error(err)
          })
      }
  }
};
</script>