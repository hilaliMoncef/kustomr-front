<template>
  <div class="form-dark">
    <h5 class="mt-4">Horaires d'ouvertures</h5>
    <div class="form-group row">
      <label for="monday" class="col-sm-2 col-form-label">Lundi :</label>
      <div class="col-sm-10">
        <input class="form-control flex-grow-1" name="monday" v-model="hours.monday" />
      </div>
    </div>
    <div class="form-group row">
      <label for="tuesday" class="col-sm-2 col-form-label">Mardi:</label>
      <div class="col-sm-10">
        <input class="form-control flex-grow-1" name="tuesday" v-model="hours.tuesday" />
      </div>
    </div>
    <div class="form-group row">
      <label for="wednesday" class="col-sm-2 col-form-label">Mercredi:</label>
      <div class="col-sm-10">
        <input class="form-control flex-grow-1" name="wednesday" v-model="hours.wednesday" />
      </div>
    </div>
    <div class="form-group row">
      <label for="thursday" class="col-sm-2 col-form-label">Jeudi:</label>
      <div class="col-sm-10">
        <input class="form-control flex-grow-1" name="thursday" v-model="hours.thursday" />
      </div>
    </div>
    <div class="form-group row">
      <label for="friday" class="col-sm-2 col-form-label">Vendredi:</label>
      <div class="col-sm-10">
        <input class="form-control flex-grow-1" name="friday" v-model="hours.friday" />
      </div>
    </div>
    <div class="form-group row">
      <label for="saturday" class="col-sm-2 col-form-label">Samedi:</label>
      <div class="col-sm-10">
        <input class="form-control flex-grow-1" name="saturday" v-model="hours.saturday" />
      </div>
    </div>
    <div class="form-group row">
      <label for="sunday" class="col-sm-2 col-form-label">Dimanche:</label>
      <div class="col-sm-10">
        <input class="form-control flex-grow-1" name="sunday" v-model="hours.sunday" />
      </div>
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
    hours: {
      type: Object,
      required: true
    }
  },
  methods: {
    save() {
      this.$http
        .put("vendors/" + this.hours.id + "/hours/update", this.hours)
        .then(() => {
          this.$toasted.global.success({
            message: "Les horaires d'ouvertures ont été mises à jour."
          });
          this.$emit("updated");
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de mettre à jour les horaires d'ouvertures."
          });
        });
    }
  }
};
</script>