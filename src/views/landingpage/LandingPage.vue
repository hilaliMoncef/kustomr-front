<template>
  <div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-5 col-12 mb-md-0 mb-5">
          <div class="h3 text-primary font-weight-bold">Bienvenue chez {{ vendor.store_name }}</div>
          <p class="lead">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, repudiandae placeat quod
            aspernatur.
          </p>
          <div class="form-row">
            <div class="col-6">
              <div class="form-group">
                <label for="first_name">Prénom</label>
                <input type="text" class="form-control" v-model="customer.first_name" />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="last_name">Nom</label>
                <input type="text" class="form-control" v-model="customer.last_name" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="birthday">Date de naissance</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-calendar-alt"></i>
                </span>
              </div>
              <input type="date" class="form-control" v-model="customer.birthday" />
            </div>
          </div>
          <hr />
          <div class="form-group">
            <label for="phone">Téléphone</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-phone"></i>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="customer.phone"
                placeholder="ex: 06 61 45 .."
              />
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="customer.email"
                placeholder="ex: jeandupont@mail.com"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                v-model="vendor.accept_agreement"
                class="custom-control-input"
                required
                id="accept_agreement"
              />
              <label class="custom-control-label" for="accept_agreement">
                J'accepte les termes des
                <a href="#" class="text-primary">conditions d'utilisation</a>.
              </label>
            </div>
          </div>
          <div class="form-group">
            <button
              type="button"
              class="btn btn-primary rounded text-uppercase font-weight-bold w-100"
              @click.prevent="createCustomer"
            >S'inscrire</button>
          </div>
        </div>
        <div class="col-md-5 offset-md-2 col-12">
          <div class="h4 text-normal font-weight-bold text-uppercase">
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </div>
          <ul class="list-unstyled checked-list text-normal mt-4">
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam molestiae.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam molestiae.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam molestiae.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam molestiae.</li>
          </ul>
          <div class="position-relative mt-5">
            <blockquote class="blockquote">
              <p class="mb-0 text-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
              </p>
            </blockquote>
          </div>
          <div class="blockquote-source d-flex flex-column align-items-end mt-4 text-normal">
            <strong>Alexander McQueen</strong>
            <span>Utilisateur du programme</span>
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
      vendor: {},
      customer: {
        accept_agreement: false
      }
    };
  },
  created() {
    this.getVendor();
  },
  methods: {
    getVendor() {
      this.$http
        .get("/customers/welcome/" + this.$route.params.id)
        .then(resp => {
          this.vendor = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer les informations sur ce magasin."
          });
        });
    },
    createCustomer() {
      // Validation first
      if (
        this.vendor.first_name == '' ||
        this.vendor.last_name == '' ||
        this.vendor.email == '' ||
        this.vendor.phone == '' ||
        this.vendor.birthday == ''
      ) {
        this.$toasted.global.error({
          message: "Un ou plusieurs champs sont manquants."
        });
      } else if (!this.vendor.accept_agreement) {
        this.$toasted.global.error({
          message:
            "Vous devez impérativement accepter les conditions d'utilisations."
        });
      } else {
        this.$http
          .post("/customers/welcome/" + this.$route.params.id, this.customer)
          .then(resp => {
            this.$router.push('/welcome/'+ resp.data.vendor +'-'+ resp.data.store_name +'/'+ resp.data.token);
            this.$toasted.global.success({
              message:
                "Votre compte a bien été créé, bienvenue chez " +
                this.vendor.store_name +
                " !"
            });
          })
          .catch(err => {
            this.$toasted.global.error(err.response.data);
          });
      }
    }
  }
};
</script>
