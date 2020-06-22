<template>
  <div>
    <button
      class="btn btn-primary"
      v-if="facebookReady"
      @click.prevent="logInWithFacebook"
    >Se connecter</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      facebookReady: false
    };
  },
  mounted() {
    if (window.FB) {
      this.checkStatus().then(status => {
        console.log("Fetching..");
        if (status) {
          this.$router.push("/communication/facebook");
        } else {
          this.$toasted.global.error({
            message: "Veuillez vous connecter via Facebook."
          });
          this.facebookReady = true;
        }
      });
    } else {
      this.initFacebook().then(resp => {
        if (resp) {
          this.checkStatus().then(status => {
            console.log("Fetching..");
            if (status) {
              this.$router.push("/communication/facebook");
            } else {
              this.$toasted.global.error({
                message: "Veuillez vous connecter via Facebook."
              });
              this.facebookReady = true;
            }
          });
        }
      });
    }
  },
  methods: {
    logInWithFacebook() {
      if (this.facebookReady) {
        this.FB.login(
          response => {
            if (response.authResponse) {
              this.$router.push("/communication/facebook");
              this.$store.dispatch("facebook/login", response.authResponse);
            } else {
              this.$toasted.global.error({
                message: "User cancelled login or did not fully authorize."
              });
            }
          },
          {
            scope:
              "read_insights,pages_manage_posts,pages_read_engagement,instagram_basic,instagram_manage_insights",
            return_scopes: true
          }
        );
        return false;
      }
    },
    logoutWithFacebook() {
      if (this.facebookReady) {
        window.FB.logout(response => {
          console.log(response);
          this.$store.dispatch("facebook/logout");
        });
      }
    },
    checkStatus() {
      return new Promise(resolve => {
        window.FB.getLoginStatus(resp => {
          if (resp.status == "connected") {
            this.$store.dispatch("facebook/login", resp.authResponse);
            resolve(true);
          } else {
            this.$store.dispatch("facebook/logout");
            resolve(false);
          }
        });
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
    handleLoadError(error) {
      this.$toasted.global.error({
        message: "The script " + error.target.src + " didn't load correctly."
      });
    }
  }
};
</script>