<template>
  <div class="email-editor border my-4">
    <div class="email-header px-4" :style="{backgroundColor: vendor.reward_card_layout.bg_color}">
      <img v-if="vendor.reward_card_layout.logo" :src="vendor.reward_card_layout.logo.file" />
      <img v-else src="@/assets/images/placeholder-carousel.jpg" />
      <a href="#" class="btn btn-light">Votre espace client</a>
    </div>

    <div class="row my-3">
      <div class="col-md-6 col-12 offset-md-3">
        <dropzone
            v-if="!preview"
            id="dropImage"
            ref="dropImage"
            @vdropzone-error="uploadError"
            @vdropzone-success="uploadComplete"
            :options="dropOptions"
          ></dropzone>
        <div v-else class="media-preview">
          <a href="#" @click.prevent="preview = false" class="dismiss text-primary">
            <font-awesome-icon icon="pen" />
          </a>
          <div id="mediaPreviewImg">
            <img :src="previewImage" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-12 offset-md-3 my-5">
        <div class="text-editable" @input="input" contenteditable="true">
          <p
            style="font-size: 14px; line-height: 1.5; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"
          >
            <span style="font-size: 14px;">
              <strong>Lorem ipsum dolor sit amet</strong>
            </span>
          </p>
          <p
            style="font-size: 14px; line-height: 1.5; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"
          ></p>
          <p
            style="font-size: 14px; line-height: 1.5; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            quis dapibus nisl. Aliquam semper libero quis nisl eleifend, vel
            sagittis mauris porta. Phasellus pharetra consequat semper.
          </p>
          <p
            style="font-size: 14px; line-height: 1.5; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"
          ></p>
          <p
            style="font-size: 14px; line-height: 1.5; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"
          >
            Etiam vel dapibus lorem. Sed venenatis enim ut ligula
            pellentesque, non fermentum nibh vestibulum.
          </p>
          <p
            style="font-size: 14px; line-height: 1.5; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"
          ></p>
          <p
            style="font-size: 14px; line-height: 1.5; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; word-break: break-word; mso-line-height-alt: 21px; margin: 0;"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            quis dapibus nisl. Aliquam semper libero quis nisl eleifend, vel
            sagittis mauris porta. Phasellus pharetra consequat semper.
          </p>
        </div>
      </div>
    </div>
    <div
      class="container-fluid"
      :style="{backgroundColor: vendor.reward_card_layout.bg_color, color: vendor.reward_card_layout.text_color}"
    >
      <div class="row mb-0 pt-4">
        <div class="col-md-6 col-12 offset-md-3">
          <ul class="list-unstyled align-items-center justify-content-center m-0 d-none d-md-flex">
            <li v-if="vendor.facebook">
              <a :href="vendor.facebook" target="_blank" class="social-button card-facebook mr-1">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li v-if="vendor.instagram">
              <a :href="vendor.instagram" target="_blank" class="social-button card-instagram mx-2">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li v-if="vendor.twitter">
              <a :href="vendor.twitter" target="_blank" class="social-button card-twitter ml-1">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li v-if="vendor.youtube">
              <a :href="vendor.youtube" target="_blank" class="social-button card-youtube ml-1">
                <i class="fab fa-youtube"></i>
              </a>
            </li>
            <li>
              <a :href="vendor.linkedin" target="_blank" class="social-button card-linkedin ml-1">
                <i class="fab fa-linkedin"></i>
              </a>
            </li>
            <li v-if="vendor.pinterest">
              <a :href="vendor.pinterest" target="_blank" class="social-button card-pinterest ml-1">
                <i class="fab fa-pinterest"></i>
              </a>
            </li>
            <li v-if="vendor.snapchat">
              <a :href="vendor.snapchat" class="social-button card-snapchat ml-1">
                <i class="fab fa-snapchat-ghost"></i>
              </a>
            </li>
            <li v-if="vendor.tripadvisor">
              <a :href="vendor.tripadvisor" class="social-button card-tripadvisor ml-1">
                <i class="fab fa-tripadvisor"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row py-3">
        <div class="col-md-10 col-12 offset-md-1 text-small" :style="{color: vendor.reward_card_layout.text_color}">
          <div class="text-center">
            © {{ new Date() | moment('YYYY') }} {{ vendor.store_name }} - Tous
            droits reservés
          </div>
          <div
            class="text-center"
          >Vous recevez cet e-mail en raison du programme de fidelité avec {{ vendor.store_name }}</div>

          <div class="mt-2 text-center">
            Nous serions triste de vous voir partir mais vous pouvez vous désincrire
            <a href="#">ici</a>.
          </div>
        </div>
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
      preview: false,
      previewImage: {},
      dropOptions: {
        url: "/uploads/emails",
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
    // Setting the defaults for dropzone
    this.dropOptions.url = this.$http.defaults.baseURL + this.dropOptions.url;
    this.dropOptions.headers[
      "Authorization"
    ] = this.$http.defaults.headers.common["Authorization"];
  },
  methods: {
    uploadComplete(file, resp) {
      this.previewImage = resp;
      this.preview = true;
      this.$emit("mediaAdded", resp);
    },
    uploadError() {
      this.$toasted.global.error({
        message: "Impossible d'uploader cette image"
      });
    },
    input(val) {
      this.$emit("input", val.target.innerHTML);
    }
  }
};
</script>