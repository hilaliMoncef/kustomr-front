<template>
  <div class="form-dark">
    <div class="text-dark text-uppercase mb-4">Informations générales</div>
    <div class="form-row">
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input class="form-control" type="email" v-model="user.email" disabled />
        </div>
      </div>
      <div class="col-12 col-md-6 mb-3 mb-md-0">
        <div class="form-group">
          <label for="email">Nom de l'établissement</label>
          <input class="form-control" type="text" v-model="vendor.store_name" />
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="email">Type d'établissement</label>
          <v-select
            :options="store_types"
            :reduce="option => option.id"
            v-model="vendor.store_type"
          />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="form-group">
          <label for="email">Nombre de visites</label>
          <v-select
            :options="store_visits"
            :reduce="option => option.id"
            v-model="vendor.store_visits"
          />
        </div>
      </div>
    </div>
    <div class="form-row mt-3">
      <div class="col text-center">
        <button class="btn btn-primary btn-rounded" @click.prevent="saveVendor">Sauvegarder</button>
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
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      store_types: [
        { id: "AL", label: "Alimentation" },
        { id: "BA", label: "Banque et assurance" },
        { id: "MT", label: "Multimédia/Technologie" },
        { id: "TH", label: "Textile/Habillement/Chaussure" },
        { id: "SE", label: "Services aux entreprises" },
        { id: "AU", label: "Automobile" },
        { id: "AM", label: "Ameublement" },
        { id: "AR", label: "Art {id:Artisanat)" },
        { id: "CO", label: "Commerce de détail" },
        { id: "EV", label: "Evenementiel" },
        { id: "HR", label: "Hôtellerie/Restauration" },
        { id: "SM", label: "Santé/Médical" }
      ],
      store_visits: [
        { id: "SM", label: "Entre 50 et 200" },
        { id: "MD", label: "Entre 200 et 500" },
        { id: "LG", label: "Entre 500 et 1000" },
        { id: "XL", label: "1000+" }
      ]
    };
  },
  methods: {
    saveVendor() {
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