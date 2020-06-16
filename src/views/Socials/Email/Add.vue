<template>
  <div>
    <div class="row" v-if="activeView == 0">
      <div class="col-12 col-md-9">
        <div class="card-round">
          <h5 class="text-dark text-uppercase text-center">Configurer votre campagne mail</h5>
          <div class="form-dark">
            <div class="row">
              <div class="col-12 col-lg-6 mb-3 mb-lg-0">
                <div class="form-group">
                  <label for="name">Nom de la campagne mail</label>
                  <input type="text" class="form-control" v-model="email.title" />
                  <small
                    class="form-text"
                  >Choisissez un nom pour votre campagne afin de le retrouver facilement dans votre compte.</small>
                </div>
                <div class="form-group">
                  <label for="name">Objet du mail</label>
                  <input type="text" class="form-control" v-model="email.subject" />
                  <small
                    class="form-text"
                  >Choisissez un objet qui décrit clairement le contenu de votre email. Il s'agit du premier contenu que vos clients verront.</small>
                </div>
                <div class="form-group">
                  <label for="name">Sélectionner vos listes de contacts</label>
                  <v-select :options="lists" :multiple="true" label="name" @input="selectList">
                    <template v-slot:option="option">
                      {{ option.name }} -
                      <span
                        class="text-primary"
                        v-if="option.customers"
                      >{{ option.customers.length }} clients</span>
                    </template>
                  </v-select>
                  <small class="form-text">
                    Choisissez votre/vos liste(s) de contacts a qui vous voulez diffuser cette campagne. Si vous n'en avez aucune,
                    <router-link to="/clients">créer une liste de contact</router-link>.
                  </small>
                </div>
                <div class="form-group">
                  <label for="template">Sélectionner un modèle de mail</label>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="mail-template mr-1" @click.prevent="chosen_template = 1">
                      <span class="selected" v-if="chosen_template == 1">
                        <font-awesome-icon icon="check-circle" />
                      </span>
                      Mail 1
                    </div>
                    <div class="mail-template mx-1" @click.prevent="chosen_template = 2">
                      <span class="selected" v-if="chosen_template == 2">
                        <font-awesome-icon icon="check-circle" />
                      </span>
                      Mail 2
                    </div>
                    <div class="mail-template mx-1" @click.prevent="chosen_template = 3">
                      <span class="selected" v-if="chosen_template == 3">
                        <font-awesome-icon icon="check-circle" />
                      </span>
                      Mail 3
                    </div>
                    <div class="mail-template ml-1" @click.prevent="chosen_template = 4">
                      <span class="selected" v-if="chosen_template == 4">
                        <font-awesome-icon icon="check-circle" />
                      </span>
                      Mail 4
                    </div>
                  </div>
                  <small
                    class="form-text"
                  >Choisissez un modèle de mail qui s'adaptera a vos couleurs et logo de votre marque, vous pourrez ensuite éditer le contenu dans la page suivante.</small>
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="form-group">
                  <label for="name">Envoyer plus tard ?</label>
                  <div class="d-flex align-items-center">
                    <div
                      class="custom-checkbox mr-2 flex-grow-1 text-success"
                      :class="[email.isScheduled ? 'active' : '']"
                      @click.prevent="email.send_at = new Date().toISOString(); email.isScheduled = true"
                    >
                      <font-awesome-icon icon="check-circle" class="mr-1" />Oui
                    </div>
                    <div
                      class="custom-checkbox ml-2 flex-grow-1 text-danger"
                      :class="[!email.isScheduled ? 'active' : '']"
                      @click.prevent="email.isScheduled = false"
                    >
                      <font-awesome-icon icon="times-circle" class="mr-1" />Non
                    </div>
                  </div>
                  <small
                    class="form-text"
                  >Kustomr choisit pour vous la meilleure horaire d'envoi d'emails programmés pour un résultat optimal.</small>
                </div>
                <div class="form-group" v-if="email.isScheduled">
                  <label>Date de programmation de la campagne</label>
                  <datetime-picker
                    v-model="email.send_at"
                    format="YYYY-MM-DD"
                    :inline="true"
                    locale="fr"
                    :label="'Sélectionner une date'"
                    color="#E60041"
                    :only-date="true"
                    :min-date="new Date() | moment('YYYY-MM-DD')"
                    :no-keyboard="true"
                  />
                  <small
                    class="form-text"
                  >Choisissez la date et l'heure à laquelle vous souhaitez envoyer la campagne mail.</small>
                </div>
                <div class="form-group">
                  <label for="name">Promouvoir une promotion ?</label>
                  <div class="d-flex align-items-center">
                    <div
                      class="custom-checkbox mr-2 flex-grow-1 text-success"
                      :class="[isPromo ? 'active' : '']"
                      @click.prevent="isPromo = true"
                    >
                      <font-awesome-icon icon="check-circle" class="mr-1" />Oui
                    </div>
                    <div
                      class="custom-checkbox ml-2 flex-grow-1 text-danger"
                      :class="[!isPromo ? 'active' : '']"
                      @click.prevent="email.discount = null; isPromo = false"
                    >
                      <font-awesome-icon icon="times-circle" class="mr-1" />Non
                    </div>
                  </div>
                  <small
                    class="form-text"
                  >ntégrez directement les promotions que vous avez créées précédemment pour les adapter aux e-mails que vous souhaitez envoyer.</small>
                </div>
                <div class="mt-3" v-if="isPromo">
                  <div class="form-group">
                    <label for="code" class="text-uppercase">Quel type de promotion ?</label>
                    <v-select
                      :options="type_discounts"
                      v-model="email.type_code"
                      :reduce="type => type.id"
                      label="key"
                    ></v-select>
                  </div>
                </div>
                <div class="form-group" v-if="isPromo && email.type_code == 'points'">
                  <label for="name">Sélectionner la promotion</label>
                  <v-select
                    :options="point_discount"
                    :reduce="discount => discount.id"
                    label="name"
                    v-model="email.discount"
                  ></v-select>
                </div>
                <div class="form-group" v-else-if="isPromo && email.type_code == 'amounts'">
                  <label for="name">Sélectionner la promotion</label>
                  <v-select
                    :options="amount_discount"
                    :reduce="discount => discount.id"
                    label="name"
                    v-model="email.discount"
                  ></v-select>
                </div>
                <div class="form-group" v-else-if="isPromo && email.type_code == 'percents'">
                  <label for="name">Sélectionner la promotion</label>
                  <v-select
                    :options="percent_discount"
                    :reduce="discount => discount.id"
                    label="name"
                    v-model="email.discount"
                  ></v-select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <button
                  class="btn btn-primary btn-rounded text-uppercase"
                  @click.prevent="nextView"
                >Suivant</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9"></div>
    </div>
    <div class="row" v-else-if="activeView == 1">
      <div class="col-12 col-md-9">
        <div class="card-round">
          <h5 class="text-dark text-uppercase text-center">Configurer votre campagne mail</h5>
          <div class="form-dark">
            <div class="row">
              <InfoEmail @input="inputContent" @mediaAdded="addMedia" :vendor="$store.state.currentVendor" />
            </div>
          </div>

          <div class="row">
            <div class="col text-center">
              <button
                class="btn btn-outline-primary btn-rounded text-uppercase mr-1"
                @click.prevent="activeView = 0"
              >Retour</button>
              <button class="btn btn-primary btn-rounded text-uppercase ml-1" @click.prevent="save">Programmer ma campagne</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoEmail from "@/components/emails/Info.vue"

export default {
  components: { InfoEmail },
  data() {
    return {
      email: {
        vendor: null,
        title: "",
        subject: "",
        content: "",
        media: null,
        isScheduled: false,
        send_at: null,
        to: [],
        discount: null,
        type_code: "points"
      },
      activeView: 0,
      lists: [],
      date_range: null,
      isPromo: false,
      point_discount: null,
      amount_discount: null,
      percent_discount: null,
      type_discounts: [
        { id: "points", key: "Réduction Points de fidélité" },
        { id: "amounts", key: "Réduction Montant fixe" },
        { id: "percents", key: "Réduction Pourcentage" }
      ],
      chosen_template: 1
    };
  },
  created() {
    this.getCustomerLists();
    this.getDiscounts();
  },
  methods: {
    nextView() {
      if(this.email.title != '' && this.email.subject != '' && this.email.to.length > 0) {
        if(this.isPromo && !this.email.discount) {
          this.$toasted.global.error({message: 'Veuillez choisir une promotion à mettre en avant.'});
        } else {
          this.activeView = 1;
        }
      } else {
        this.$toasted.global.error({message: 'Des champs sont manquants.'});
      }
    },
    addMedia(media) {
      this.email.media = media.id;
    },
    inputContent(val) {
      this.email.content = val;
    },
    getCustomerLists() {
      let loader = this.$loading.show();
      this.$http
        .get("vendors/customers/lists")
        .then(resp => {
          this.lists = resp.data;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer la liste des clients."
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    getDiscounts() {
      this.$http
        .get("/discounts")
        .then(resp => {
          this.point_discount = resp.data.points;
          this.amount_discount = resp.data.amount;
          this.percent_discount = resp.data.percent;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer les réductions."
          });
        });
    },
    selectList(val) {
      if (val) {
        var arrays = val.map(obj => obj.customers);
        this.email.to = [].concat.apply([], arrays);
      } else {
        this.email.to = [];
      }
    },
    save() {
      if(this.email.content != "") {
        this.email.vendor = this.$store.state.currentVendor.id;
        if(!this.email.isScheduled) {
          this.email.send_at = this.$options.filters.moment(new Date(), "YYYY-MM-DD");
        } else {
          this.email.send_at = this.$options.filters.moment(this.email.send_at, "YYYY-MM-DD");
        }

        this.$http.post('emails/new', this.email).then(resp => {
          this.$toasted.global.success(resp.data);
          this.$router.push('/communication/mail');
        }).catch(err => {
          this.$toasted.global.error(err.response.data);
        })
      }
    }
  }
};
</script>