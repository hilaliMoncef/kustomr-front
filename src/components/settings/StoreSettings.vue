<template>
  <div class="form-dark">
    <div class="text-dark text-uppercase mb-4">Ma boutique</div>

    <h5 class="mt-4">Général</h5>
    <div class="form-group">
      <label for="store_phone">Numéro de contact</label>
      <input class="form-control" type="email" v-model="vendor.store_phone" disabled />
    </div>
    <div class="form-group">
      <label for="store_adress">Adresse de l'établissement</label>
      <textarea class="form-control" rows="3" v-model="vendor.store_adress"></textarea>
    </div>

    <h5 class="mt-4">Liens & réseaux sociaux</h5>
    <div class="form-group">
      <label for="facebook">Site web</label>
      <div class="input-group">
        <input class="form-control" name="website" v-model="vendor.website" />
      </div>
    </div>
    <div class="form-group">
      <label for="facebook">Facebook</label>
      <div class="input-group">
        <input class="form-control" name="facebook" v-model="vendor.facebook" />
      </div>
    </div>
    <div class="form-group">
      <label for="instagram">Instagram</label>
      <div class="input-group">
        <input class="form-control" name="instagram" v-model="vendor.instagram" />
      </div>
    </div>
    <div class="form-group">
      <label for="youtube">Youtube</label>
      <div class="input-group">
        <input class="form-control" name="youtube" v-model="vendor.youtube" />
      </div>
    </div>
    <div class="form-group">
      <label for="linkedin">LinkedIn</label>
      <div class="input-group">
        <input class="form-control" name="linkedin" v-model="vendor.linkedin" />
      </div>
    </div>
    <div class="form-group">
      <label for="pinterest">Pinterest</label>
      <div class="input-group">
        <input class="form-control" name="pinterest" v-model="vendor.pinterest" />
      </div>
    </div>
    <div class="form-group">
      <label for="snapchat">Snapchat</label>
      <div class="input-group">
        <input class="form-control" name="snapchat" v-model="vendor.snapchat" />
      </div>
    </div>
    <div class="form-group">
      <label for="tripadvisor">Tripadvisor</label>
      <div class="input-group">
        <input class="form-control" name="tripadvisor" v-model="vendor.tripadvisor" />
      </div>
    </div>
    
    <div class="form-row">
        <div class="col text-center">
            <button class="btn btn-primary btn-rounded text-uppercase" @click.prevent="save">Sauvegarder</button>
        </div>
    </div>

    <OpeningHoursSettings :hours="this.vendor.opening_hours" />
  </div>
</template>

<script>
import OpeningHoursSettings from "@/components/settings/OpeningHoursSettings.vue";

export default {
  components: { OpeningHoursSettings },
  props: {
    vendor: {
      type: Object,
      required: true
    }
  },
  methods: {
    save() {
      this.$http
        .put("vendors/" + this.vendor.id + "/update", this.vendor)
        .then(() => {
          this.$toasted.global.success({
            message: "Vos informations ont été mises à jour."
          });
          this.$emit('updated');
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de mettre à jour vos informations."
          });
        });
    }
  }
};
</script>