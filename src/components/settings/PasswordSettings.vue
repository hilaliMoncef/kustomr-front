<template>
  <div class="form-dark">
      <h5 class="mb-0">Changement de mot de passe</h5>
      <p>Attention! Une fois le mot de passe changé, vous serez déconnecté immédiatement.</p>

    <div class="form-group mt-2">
      <label for="old_password">Ancien mot de passe</label>
      <input type="password" v-model="payload.old_password" class="form-control" />
    </div>

    <div class="form-group mt-4">
      <label for="new_password">Nouveau mot de passe</label>
      <input type="password" v-model="payload.password1" class="form-control" />
    </div>

    <div class="form-group mt-4">
      <label for="new_password">Confirmer le nouveau mot de passe</label>
      <input type="password" v-model="payload.password2" class="form-control" />
    </div>

    <div class="form-row">
      <div class="col text-center">
        <button class="btn btn-primary btn-rounded text-uppercase" @click.prevent="save">Sauvegarder</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vendor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      payload: {
        old_password: "",
        password1: "",
        password2: ""
      }
    };
  }
};
</script>