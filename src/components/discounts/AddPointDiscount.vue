<template>
  <div class="form-dark">
    <div class="form-row">
      <div class="col-12 col-lg-6">
        <div class="form-group">
          <label for="name" class="text-uppercase">Nom de la promotion</label>
          <input type="text" class="form-control" v-model="discount.name" />
        </div>

        <div class="form-group">
          <label for="min_points" class="text-uppercase">Minimum de points nécessaires</label>
          <input type="number" class="form-control" v-model="discount.min_points" />
        </div>

        <div class="form-group">
          <label for="min_points" class="text-uppercase">Appliquer les points de fidélité sur</label>
          <v-select :options="type_amounts" v-model="discount.type_amount" label="key" :reduce="obj => obj.id">
          </v-select>
        </div>

        <div class="form-group" v-if="discount.type_amount == 'M'">
          <label for="amount" class="text-uppercase">Montant de la réduction</label>
          <div class="input-group">
            <input type="number" class="form-control" min="0" v-model="discount.amount" />
            <div class="input-group-append">
              <div class="input-group-text"><font-awesome-icon icon="euro-sign" /></div>
            </div>
          </div>
        </div>

        <div class="form-group" v-if="discount.type_amount == 'P'">
          <label for="amount" class="text-uppercase">Montant de la réduction</label>
          <div class="input-group">
            <input type="number" class="form-control" min="0" max="100" v-model="discount.amount" />
            <div class="input-group-append">
              <div class="input-group-text"><font-awesome-icon icon="percentage" /></div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="code" class="text-uppercase">Code promo</label>
          <input type="text" class="form-control" v-model="discount.code" />
        </div>

        <div class="form-group">
          <label for="description" class="text-uppercase">Description</label>
          <textarea class="form-control" rows="4" v-model="discount.description"></textarea>
        </div>

        <div>
          <label for="media" class="text-uppercase">Média</label>
          <dropzone
            id="dropImage"
            ref="dropImage"
            @vdropzone-error="uploadError"
            @vdropzone-success="uploadComplete"
            :options="dropOptions"
          ></dropzone>
        </div>
      </div>
      <div class="col-12 col-lg-6 pl-lg-5 mt-5 mt-lg-0">
        <label class="text-uppercase">Choisir la durée de la promotion</label>
        <datetime-picker v-model="date_range" format="YYYY-MM-DD" locale="fr" :inline="true" :range="true" :no-shortcuts="true" :only-date="true" color="#E60041" :min-date="new Date() | moment('YYYY-MM-DD')" :no-keyboard="true" />
      </div>
    </div>
    <div class="row mt-4">
        <div class="col text-center">
            <button type="button" class="btn btn-primary btn-rounded" @click.prevent="createDiscount()">Programmer ma réduction</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vendor: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      discount: {
        name: "",
        min_points: 0,
        code: "",
        image: null,
        description: "",
        type_amount: 'M',
        amount: 0,
        start_date: '',
        end_date: ''
      },
      date_range: '',
      type_amounts: [{id: "M", key: "Réduction en euros"}, {id: "P", key: "Pourcentage du montant total"}],
      dropOptions: {
        url: "/uploads/discounts",
        method: "post",
        maxFiles: 1,
        headers: {
          Authorization: ""
        },
        dictDefaultMessage: "GLISSER VOTRE IMAGE ICI OU <span class='text-primary'>SELECTIONNER</span>"
      }
    };
  },
  created() {
    // Setting the defaults for dropzone
    this.dropOptions.url = this.$http.defaults.baseURL + this.dropOptions.url;
    this.dropOptions.headers[
      "Authorization"
    ] = this.$http.defaults.headers.common["Authorization"];
  },
  methods: {
    uploadComplete(file, resp) {
      this.discount.image = resp.id;
    },
    uploadError() {
      this.$toasted.global.error({
        message: "Impossible d'uploader cette image"
      });
    },
    validate() {
      if(!this.discount.image) {
        this.$toasted.global.error({message: 'Veuillez ajouter une image associée à cette réduction.'})
        return false;
      }
      if(this.date_range == '') {
        this.$toasted.global.error({message: 'Veuillez sélectionner une date de début et de fin.'})
        return false;
      }
      if(this.date_range && !this.date_range.start || !this.date_range.end) {
        this.$toasted.global.error({message: 'Veuillez sélectionner une date de début et de fin.'})
        return false;
      }
      if(this.discount.name == '' || this.discount.min_points == '' || this.discount.code == '' || this.discount.amount == '' || this.discount.description == '') {
        this.$toasted.global.error({message: 'Certains champs sont manquants.'})
        return false;
      }

      return true;
    },
    createDiscount() {
      if(this.validate()) {
        this.discount.start_date = this.date_range.start;
        this.discount.end_date = this.date_range.end;
        this.discount.vendor = this.vendor;

        this.$http.post('/discounts/points', this.discount).then(() => {
          this.$toasted.global.success({message: 'La réduction a bien été ajoutée.'});
          this.$router.push('/discounts');
        }).catch(() => {
          this.$toasted.global.error({message: 'Impossible d\'ajouter cette réduction.'})
        })
      }
    }
  }
};
</script>