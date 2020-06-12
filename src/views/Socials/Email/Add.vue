<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-9">
        <div class="card-round">
          <h5 class="text-dark text-uppercase text-center">Configurer votre campagne mail</h5>
          <div class="form-dark">
            <div class="row">
              <div class="col-12 col-lg-6 mb-3 mb-lg-0">
                <div class="form-group">
                  <label for="name">Nom de la campagne mail</label>
                  <input type="text" class="form-control" v-model="email.name" />
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
                  <label>Date de programmation de la campagne</label>
                  <datetime-picker
                    v-model="email.sent_at"
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
                <button class="btn btn-primary btn-rounded text-uppercase">Suivant</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-9"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        name: "",
        subject: "",
        content: "",
        sent_at: new Date().toISOString(),
        to: [],
        discount: null,
        type_code: "points"
      },
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
    }
  }
};
</script>