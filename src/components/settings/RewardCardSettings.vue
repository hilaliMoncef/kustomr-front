<template>
  <div class="form-dark">
    <h5>Carte de fidélité</h5>
    <div class="row w-100 mx-auto">
      <div class="col-xl-6 col-12 mb-3">
        <div
          class="reward-card mx-auto mr-2"
          :style="{backgroundColor: reward_card_layout.bg_color, color: reward_card_layout.text_color}"
        >
          <div class="reward-card-logo-center">
            <div class="reward-card-logo-wrapper">
              <img v-if="reward_card_layout.logo" :src="reward_card_layout.logo.file" :alt="'Logo'" />
            </div>
          </div>

          <div class="reward-card-name">
            <span class="text-uppercase h5 font-weight-bold pb-2">Carte de fidélité</span>
          </div>
        </div>
      </div>
      <div class="col-xl-6 col-12">
        <div
          class="reward-card mx-auto"
          :style="{backgroundColor: reward_card_layout.bg_color, color: reward_card_layout.text_color}"
        >
          <div class="reward-card-logo">
            <img v-if="reward_card_layout.logo" :src="reward_card_layout.logo.file" :alt="'Logo'" />
          </div>
          <div class="reward-card-header d-flex flex-column">
            <span class="reward-card-title">Nom et prénom :</span>
            <span class="reward-card-subtitle mb-2">Jean Dupont</span>
            <span class="reward-card-title">Numéro client :</span>
            <span class="reward-card-subtitle">00000001</span>
          </div>

          <div class="reward-card-barcode">
            <span class="barcode">00000001</span>
          </div>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-6">
        <div class="form-group">
          <label for="icon">Couleur de fond</label>
          <input class="form-control" type="color" name="bg_color" v-model="reward_card_layout.bg_color" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="icon">Couleur de texte</label>
          <input class="form-control" type="color" name="text_color" v-model="reward_card_layout.text_color" />
        </div>
      </div>
    </div>
    <div class="form-group mt-3">
      <label for="icon">Icône</label>
      <div class="row">
        <div class="col-4">
          <img v-if="reward_card_layout.icon" class="object-fit w-100" :src="reward_card_layout.icon.file" alt="Icone" />
          <img
            v-else
            src="@/assets/images/placeholder-carousel.jpg"
            class="object-fit w-100"
            alt="Icone non disponible"
          />
        </div>
        <div class="col-8">
          <dropzone
            id="dropImage"
            ref="dropImage"
            @vdropzone-error="uploadError"
            @vdropzone-success="uploadCompleteIcon"
            :options="dropOptions"
          ></dropzone>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="logo">Logo</label>
      <div class="row">
        <div class="col-4">
          <img v-if="reward_card_layout.logo" :src="reward_card_layout.logo.file" class="object-fit w-100" alt="Logo" />
          <img
            v-else
            src="@/assets/images/placeholder-carousel.jpg"
            class="object-fit w-100"
            alt="Logo non disponible"
          />
        </div>
        <div class="col-8">
          <dropzone
            id="dropImage"
            ref="dropImage"
            @vdropzone-error="uploadError"
            @vdropzone-success="uploadCompleteLogo"
            :options="dropOptions"
          ></dropzone>
        </div>
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
    layout: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      reward_card_layout: {},
      dropOptions: {
        url: "/uploads/vendors",
        method: "post",
        maxFiles: 1,
        headers: {
          Authorization: ""
        },
        dictDefaultMessage:
          "GLISSER VOTRE IMAGE ICI OU <span class='text-primary'>SELECTIONNER</span>"
      }
    };
  },
  created() {
    this.reward_card_layout = this.layout;

    // Setting the defaults for dropzone
    this.dropOptions.url = this.$http.defaults.baseURL + this.dropOptions.url;
    this.dropOptions.headers[
      "Authorization"
    ] = this.$http.defaults.headers.common["Authorization"];
  },
  methods: {
    save() {
      if(this.reward_card_layout.logo) {
        this.reward_card_layout.logo = this.reward_card_layout.logo.id;
      }
      if(this.reward_card_layout.icon) {
        this.reward_card_layout.icon = this.reward_card_layout.icon.id;
      }
      this.$http
        .put("vendors/" + this.reward_card_layout.id + "/layout/update", this.reward_card_layout)
        .then(() => {
          this.$toasted.global.success({
            message: "Vos informations ont été mises à jour."
          });
          this.$emit('updated');
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de mettre à jour les paramètres de carte de fidélité."
          });
        });
    },
    uploadCompleteIcon(file, resp) {
      this.reward_card_layout.icon = resp;
    },
    uploadCompleteLogo(file, resp) {
      this.reward_card_layout.logo = resp;
    },
    uploadError() {
      this.$toasted.global.error({
        message: "Impossible d'uploader cette image"
      });
    }
  }
};
</script>