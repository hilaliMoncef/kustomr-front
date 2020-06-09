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
      </div>
      <div class="col-12 col-lg-6 pl-lg-5 mt-5 mt-lg-0">
        <div class="d-flex flex-column mb-3">
          <div class="d-flex align-items-center justify-content-between">
            <label for="media" class="text-uppercase">Média</label>
            <toggle-button :value="false" v-model="switchUpload" :width="85"
              :labels="{checked: 'Modifier', unchecked: 'Conserver'}"/>
          </div>
          <dropzone
            v-if="switchUpload"
            id="dropImage"
            ref="dropImage"
            @vdropzone-error="uploadError"
            @vdropzone-success="uploadComplete"
            :options="dropOptions"
          ></dropzone>
          <div class="flex-grow-1 overflow-hidden h-100 w-100" v-else>
            <img v-if="discount.image" class="w-100 h-100 object-fit" :src="discount.image.file" />
          </div>
        </div>
        <div class="form-group">
          <label class="text-uppercase">Choisir la durée de la promotion</label>
          <datetime-picker v-model="date_range" format="YYYY-MM-DD" :position="'top'" locale="fr" :label="'Sélectionner une date'" :range="true" :no-shortcuts="true" :only-date="true" color="#E60041" :min-date="new Date() | moment('YYYY-MM-DD')" :no-keyboard="true" />
        </div>
      </div>
    </div>
    <div class="row mt-4">
        <div class="col text-center">
            <button type="button" class="btn btn-primary btn-rounded" @click.prevent="editDiscount()">Modifier ma réduction</button>
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
    },
    instance: {
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
      switchUpload: false,
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

    this.getDiscount();
  },
  methods: {
    getDiscount() {
      let loader = this.$loading.show();
    this.$http.get('/discounts/points/'+this.instance).then(resp => {
      this.discount = resp.data;
      this.date_range = {
        start: resp.data.start_date,
        end: resp.data.end_date
      }
    }).catch(() => {
        this.$toasted.global.error({message: 'Impossible de récuperer la promotion.'})
      }).finally(() => {
        loader.hide();
      });
    },
    uploadComplete(file, resp) {
      this.discount.image = resp;
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
    editDiscount() {
      if(this.validate()) {
        this.discount.start_date = this.date_range.start;
        this.discount.end_date = this.date_range.end;
        this.discount.image = this.discount.image.id;
        this.discount.vendor = this.vendor;

        this.$http.put('/discounts/points/'+this.discount.id, this.discount).then(resp => {
          this.$toasted.global.success({message: 'La réduction a bien été modifiée.'});
          this.$emit('updatedDiscount', resp.data);
        }).catch(() => {
          this.$toasted.global.error({message: 'Impossible de modifier cette réduction.'})
        })
      }
    }
  }
};
</script>