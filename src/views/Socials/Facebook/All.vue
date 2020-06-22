<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <div></div>
      <router-link
        to="/communication/facebook/add"
        class="btn btn-primary btn-rounded text-uppercase"
      >Créer mon post Facebook</router-link>
    </div>
    <div class="row mb-0">
      <div class="col">
        <table class="table" id="customer_listing">
          <thead>
            <tr>
              <th>Réseau social</th>
              <th>Contenu</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(campaign, index) in campaigns" :key="index">
              <td>
                <img src="@/assets/images/facebook.svg" alt="Kustomr Facebook" />
              </td>
              <td>
                <div class="d-flex">
                  <div style="width: 200px; height: 200px;" v-if="campaign.media">
                    <img :src="campaign.media.file" alt="Image de campagne" class="object-fit" />
                  </div>
                  <span>{{ campaign.content }}</span>
                </div>
              </td>
              <td>{{ campaign.send_at | moment("DD/MM/YYYY") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col text-center" v-if="campaigns.length == 0">
        <p>Aucune campagne pour le moment.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      campaigns: []
    };
  },
  created() {
    if (!window.FB) {
      let loader = this.$loading.show();
      this.initFacebook().then(resp => {
        if (resp && this.$store.getters["facebook/isLoggedIn"]) {
          window.FB.getLoginStatus(response => {
            if (response.status === "connected") {
              this.$store.dispatch("facebook/login", response.authResponse);
              this.$toasted.global.success({
                message: "Liaison avec Facebook établie."
              });
              loader.hide();
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
    }
    this.getCampaigns();
  },
  methods: {
    getCampaigns() {
      this.$http.get("socials/facebook").then(resp => {
        this.campaigns = resp.data;
      });
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
    },
    test() {
      window.FB.api(
        "/" + this.$store.state.facebook.userID + "/accounts",
        {
          access_token: this.$store.state.facebook.accessToken
        },
        resp => {
          console.log(resp);
        }
      );
    }
  }
};
</script>