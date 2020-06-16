<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-9">
        <div class="card-round">
          <h5 class="text-dark text-uppercase text-center">Configurer votre campagne SMS</h5>
          <div class="form-dark" v-if="activeView == 0">
            <div class="row">
              <div class="col-12 col-lg-6 mb-3 mb-lg-0">
                <div class="form-group">
                  <label for="name">Nom de la campagne</label>
                  <input type="text" class="form-control" v-model="sms.title" />
                  <small
                    class="form-text"
                  >Choisissez un nom pour votre campagne afin de le retrouver facilement dans votre compte.</small>
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
                      @click.prevent="usedDiscount = null; isPromo = false"
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
                      v-model="type_code"
                      :reduce="type => type.id"
                      label="key"
                    ></v-select>
                  </div>
                </div>
                <div class="form-group" v-if="isPromo && type_code == 'points'">
                  <label for="name">Sélectionner la promotion</label>
                  <v-select
                    :options="point_discount"
                    :reduce="discount => discount.id"
                    label="name"
                    v-model="usedDiscount"
                  ></v-select>
                </div>
                <div class="form-group" v-else-if="isPromo && type_code == 'amounts'">
                  <label for="name">Sélectionner la promotion</label>
                  <v-select
                    :options="amount_discount"
                    :reduce="discount => discount.id"
                    label="name"
                    v-model="usedDiscount"
                  ></v-select>
                </div>
                <div class="form-group" v-else-if="isPromo && type_code == 'percents'">
                  <label for="name">Sélectionner la promotion</label>
                  <v-select
                    :options="percent_discount"
                    :reduce="discount => discount.id"
                    label="name"
                    v-model="usedDiscount"
                  ></v-select>
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="form-group">
                  <label>Date de programmation de la campagne</label>
                  <datetime-picker
                    v-model="sms.send_at"
                    format="YYYY-MM-DD HH:mm"
                    :inline="true"
                    locale="fr"
                    :label="'Sélectionner une date'"
                    color="#E60041"
                    :min-date="new Date() | moment('YYYY-MM-DD HH:mm')"
                    :no-keyboard="true"
                  />
                  <small
                    class="form-text"
                  >Choisissez la date et l'heure à laquelle vous souhaitez envoyer la campagne mail.</small>
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
          <div class="form-dark" v-else-if="activeView == 1">
            <div class="row">
              <div class="col-12 col-lg-6 mb-3 mb-lg-0">
                <div class="form-group">
                  <label for="name">Modèle de SMS prédefinis</label>
                  <v-select
                    :options="type_templates"
                    label="key"
                    v-model="usedTemplate"
                    @input="selectTemplate"
                  ></v-select>
                  <small class="form-text">Lorem ipsum.</small>
                </div>
                <div class="form-group">
                  <label for="name">Contenu de votre SMS</label>
                  <textarea
                    class="form-control"
                    rows="7"
                    v-model="sms.content"
                    placeholder="Décrivez le contenu de votre message ici ou choisisais parmis des sms déjà conçu pour vos clients.."
                  ></textarea>
                  <small
                    class="form-text"
                  >Longueur : {{ content.length }} caractères - {{ nb_sms }} SMS consommé<span v-if="nb_sms > 1">s</span></small>
                </div>
              </div>
              <div
                class="col-12 col-lg-6 pt-5 rounded"
                style="background-color: #C7C9D5; max-height: 450px; overflow-y: hidden;"
              >
                <div class="css-iphone with-glare">
                  <div class="iphone-body">
                    <div class="iphone-screen-position">
                      <div class="iphone-home-button"></div>
                      <div class="iphone-screen">
                        <div class="device-content">
                          <div
                            class="device-content-header text-uppercase"
                          >{{ $store.state.currentVendor.store_name }}</div>
                          <div class="device-main-content">
                            <div class="text-center mt-2">Aperçu de votre message</div>
                            <div class="device-sms">
                              <div class="yours messages">
                                <div class="message last">
                                  <div>{{ sms.content }}</div>
                                  <br />
                                  <span>
                                    Mon profil:
                                    <a href="#">https://j.mp/2zAeEK7</a>
                                  </span>
                                  <br />
                                  <span>STOP au 0000</span>
                                </div>
                              </div>
                            </div>
                            <div
                              class="text-center small mt-3"
                            >La mention STOP pour les sms publicitaires est obligatoire en France.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="iphone-buttons-right"></div>
                    <div class="iphone-buttons-left"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <button
                  class="btn btn-outline-primary btn-rounded text-uppercase mr-1"
                  @click.prevent="activeView = 0"
                >Retour</button>
                <button class="btn btn-primary btn-rounded text-uppercase" @click.prevent="save">Programmer mon SMS</button>
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
      sms: {
        title: "",
        content: "",
        to: [],
        send_at: null
      },
      activeView: 0,
      lists: [],
      isPromo: false,
      type_code: "",
      usedDiscount: null,
      point_discount: null,
      amount_discount: null,
      percent_discount: null,
      type_discounts: [
        { id: "points", key: "Réduction Points de fidélité" },
        { id: "amounts", key: "Réduction Montant fixe" },
        { id: "percents", key: "Réduction Pourcentage" }
      ],
      type_templates: [
        {
          id: "test",
          key: "Message de bienvenue",
          value: "Découvrez votre nouveau magasin .."
        }
      ],
      usedTemplate: null
    };
  },
  computed: {
    content() {
      return this.sms.content + ' Mon profil: https://j.mp/3d6JlnV STOP 36034'
    },
    nb_sms() {
      return Math.ceil(this.content.length / 160);
    }
  },
  created() {
    this.getCustomerLists();
    this.getDiscounts();
    this.sms.send_at = this.$options.filters.moment(
      new Date(),
      "YYYY-MM-DD HH:mm"
    );
  },
  methods: {
    nextView() {
      if (this.sms.title != "" && this.sms.to.length > 0) {
        if (this.isPromo && !this.usedDiscount) {
          this.$toasted.global.error({
            message: "Veuillez choisir une promotion à mettre en avant."
          });
        } else {
          this.activeView = 1;
        }
      } else {
        this.$toasted.global.error({ message: "Des champs sont manquants." });
      }
    },
    selectTemplate(val) {
      if (val) {
        this.sms.content = val.value;
      } else {
        this.sms.content = "";
      }
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
        this.sms.to = [].concat.apply([], arrays);
      } else {
        this.sms.to = [];
      }
    },
    save() {
        this.$http.post('sms/new', this.sms).then(resp => {
          this.$toasted.global.success(resp.data);
          this.$router.push('/communication/sms');
        }).catch(err => {
          this.$toasted.global.error(err.response.data);
        })
    }
  }
};
</script>