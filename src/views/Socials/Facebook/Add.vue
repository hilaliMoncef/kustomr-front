<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-9">
        <div class="card-round">
          <h5 class="text-dark text-uppercase text-center">Configurer votre campagne Facebook</h5>
          <div class="form-dark">
            <div class="row">
              <div class="col-12 col-md-6 mb-3 mb-md-0">
                <div class="form-group">
                  <label for="content">Choisir la page Facebook</label>
                  <v-select
                    :options="pages"
                    label="name"
                    v-model="post.page"
                    :reduce="page => ({id: page.id, token: page.access_token})"
                  ></v-select>
                </div>
                <div class="form-group">
                  <label for="content">Contenu de votre post</label>
                  <textarea class="form-control" rows="5" v-model="post.content"></textarea>
                </div>
                <div class="form-group">
                  <label>Ajouter une photo au post ?</label>
                  <div class="d-flex align-items-center">
                    <div
                      class="custom-checkbox mr-2 flex-grow-1"
                      :class="[isPhoto ? 'active' : '']"
                      @click.prevent="isPhoto = true"
                    >Oui</div>
                    <div
                      class="custom-checkbox ml-2 flex-grow-1"
                      :class="[!isPhoto ? 'active' : '']"
                      @click.prevent="isPhoto = false"
                    >Non</div>
                  </div>
                </div>
                <div v-if="isPhoto">
                  <label for="media" class="text-uppercase">Média</label>
                  <dropzone
                    id="dropImage"
                    ref="dropImage"
                    @vdropzone-error="uploadError"
                    @vdropzone-success="uploadComplete"
                    :options="dropOptions"
                  ></dropzone>
                </div>
                <div class="form-group mt-3">
                  <label>Programmer ce post ?</label>
                  <div class="d-flex align-items-center">
                    <div
                      class="custom-checkbox mr-2 flex-grow-1"
                      :class="[isScheduled ? 'active' : '']"
                      @click.prevent="isScheduled = true"
                    >Oui</div>
                    <div
                      class="custom-checkbox ml-2 flex-grow-1"
                      :class="[!isScheduled ? 'active' : '']"
                      @click.prevent="isScheduled = false"
                    >Non</div>
                  </div>
                </div>
                <div v-if="isScheduled">
                  <label>Date de programmation de la campagne</label>
                  <datetime-picker
                    v-model="post.send_at"
                    format="YYYY-MM-DD HH:mm"
                    :inline="true"
                    locale="fr"
                    :label="'Sélectionner une date'"
                    color="#E60041"
                    :min-date="new Date() | moment('YYYY-MM-DD HH:mm')"
                    :no-keyboard="true"
                  />
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="rounded px-4 py-3" style="background-color: #909BA2">
                  <h5>Aperçu du post</h5>
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <div
                          class="user-avatar-md mr-2 overflow-hidden"
                          style="border-radius: 50%;"
                        >
                          <img
                            src="@/assets/images/placeholder-carousel.jpg"
                            alt="Page"
                            class="user-avatar-md"
                          />
                        </div>
                        <div class="d-flex flex-column">
                          <span
                            class="text-facebook font-weight-bold mb-0"
                          >{{ $store.state.currentVendor.store_name }}</span>
                          <small class="text-muted">A l'instant</small>
                        </div>
                      </div>
                      <div class="mt-3" v-if="isPhoto && media">
                        <img
                          :src="media.file"
                          class="w-100"
                          style="height: 300px; object-fit: cover;"
                          alt="Media"
                        />
                      </div>
                      <div class="mt-3 mb-4">{{ post.content }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <button
                  class="btn btn-primary btn-rounded text-uppercase"
                  @click.prevent="save"
                >Programmer mon post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        page: {},
        content: "",
        send_at: null,
        media: null
      },
      isPhoto: false,
      media: null,
      isScheduled: false,
      pages: [],
      dropOptions: {
        url: "/uploads/socials",
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

    let loader = this.$loading.show();
    if (!window.FB) {
      this.initFacebook().then(resp => {
        if (resp && this.$store.getters["facebook/isLoggedIn"]) {
          window.FB.getLoginStatus(response => {
            if (response.status === "connected") {
              this.$store.dispatch("facebook/login", response.authResponse);
              this.$toasted.global.success({
                message: "Liaison avec Facebook établie."
              });
              window.FB.api(
                "/" + this.$store.state.facebook.userID + "/accounts",
                {
                  access_token: this.$store.state.facebook.accessToken
                },
                resp => {
                  loader.hide();
                  if (resp.data.length == 0) {
                    this.$toasted.global.error({
                      message:
                        "Vous n'avez aucune page Facebook liée à Kustomr."
                    });
                    this.$router.push("/communication/facebook");
                  } else {
                    this.pages = resp.data;
                  }
                }
              );
            } else {
              loader.hide();
              this.$toasted.global.error({
                message:
                  "Vous devez d'abord vous connecter via Facebook et accorder à Kustomr les droits de poster sur vos pages."
              });
              this.$router.push("/communication/facebook/connexion");
            }
          });
        } else {
          loader.hide();
          this.$toasted.global.error({
            message:
              "Vous devez d'abord vous connecter via Facebook et accorder à Kustomr les droits de poster sur vos pages."
          });
          this.$router.push("/communication/facebook/connexion");
        }
      });
    } else {
      window.FB.api(
        "/" + this.$store.state.facebook.userID + "/accounts",
        {
          access_token: this.$store.state.facebook.accessToken
        },
        resp => {
          loader.hide();
          if (resp.data.length == 0) {
            this.$toasted.global.error({
              message: "Vous n'avez aucune page Facebook liée à Kustomr."
            });
            this.$router.push("/communication/facebook");
          } else {
            this.pages = resp.data;
          }
        }
      );
    }
  },
  methods: {
    uploadComplete(file, resp) {
      this.post.media = resp.id;
      this.media = resp;
    },
    uploadError() {
      this.$toasted.global.error({
        message: "Impossible d'uploader cette image"
      });
    },
    save() {
      if (!this.post.page.id) {
        this.$toasted.global.error({
          message:
            "Veuillez choisir une page sur laquelle Kustomr doit publier."
        });
      } else if (this.isPhoto && !this.post.media) {
        this.$toasted.global.error({ message: "Veuillez uploader une image." });
      } else if (this.isScheduled && !this.post.send_at) {
        this.$toasted.global.error({
          message: "Veuillez choisir une date et une heure de publication."
        });
      } else if (this.post.content === "") {
        this.$toasted.global.error({
          message: "Veuillez écrire le contenu de votre post"
        });
      } else {
        if (this.isPhoto) {
          if (this.isScheduled) {
            window.FB.api(
              "/" + this.post.page.id + "/photos",
              "POST",
              {
                url: this.media.file,
                caption: this.post.content,
                published: false,
                scheduled_publish_time: Date.parse(this.post.send_at) / 1000,
                access_token: this.post.page.token
              },
              resp => {
                this.savePost(resp);
              }
            );
          } else {
            window.FB.api(
              "/" + this.post.page.id + "/photos",
              "POST",
              {
                url: this.media.file,
                caption: this.post.content,
                access_token: this.post.page.token
              },
              resp => {
                this.savePost(resp);
              }
            );
          }
        } else {
          if (this.isScheduled) {
            window.FB.api(
              "/" + this.post.page.id + "/feed",
              "POST",
              {
                message: this.post.content,
                published: false,
                scheduled_publish_time: Date.parse(this.post.send_at) / 1000,
                access_token: this.post.page.token
              },
              resp => {
                this.savePost(resp);
              }
            );
          } else {
            window.FB.api(
              "/" + this.post.page.id + "/feed",
              "POST",
              {
                message: this.post.content,
                access_token: this.post.page.token
              },
              resp => {
                this.savePost(resp);
              }
            );
          }
        }
      }
    },
    savePost(resp) {
      if(resp.error) {
        this.$toasted.global.error({message: resp.error.message});
      } else {
        this.post.facebook_id = resp.id;
        if (!this.send_at) {
          this.post.send_at = this.$options.filters.moment(
            new Date(),
            "YYYY-MM-DD HH:mm"
          );
        }
        this.post.vendor = this.$store.state.currentVendor.id;
        this.post.page_id = this.post.page.id;
        this.$http.post("socials/facebook", this.post).then(() => {
          this.$router.push('/communication/facebook');
        });
      }
    },
    initFacebook() {
      return new Promise((resolve, reject) => {
        window.fbAsyncInit = function() {
          window.FB.init({
            appId: "2676493982591304", //You will need to change this
            cookie: true, // This is important, it's not enabled by default
            version: "v7.0"
          });
          resolve(window.FB);
        }; // eslint-disable-line
        /* eslint-disable */
        // prettier-ignore
        (function (d, s, id) {
          const fjs = d.getElementsByTagName(s)[0]
          if (d.getElementById(id)) { return; }
          const js = d.createElement(s); js.id = id
          js.src = '//connect.facebook.net/en_US/sdk.js'
          js.onerror = error => { handleLoadError(error); reject(error) } // non-facebook line
          fjs.parentNode.insertBefore(js, fjs)
        }(document, 'script', 'facebook-jssdk'))
        /* eslint-enable */
      });
    }
  }
};
</script>