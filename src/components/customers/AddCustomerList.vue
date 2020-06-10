<template>
  <div class="form-dark">
    <div class="form-group mb-3">
      <label for="name" class="text-uppercase">Nom de la liste</label>
      <input class="form-control" v-model="list.name" type="text" />
    </div>

    <div class="form-group">
      <label for="method" class="text-uppercase">Ajouter des contact de manière</label>
      <div class="d-flex align-items-center">
        <div
          class="custom-checkbox mr-2 flex-grow-1"
          :class="[automatic ? 'active' : '']"
          @click.prevent="showAutomatic"
        >
          Automatique
        </div>
        <div
          class="custom-checkbox ml-2 flex-grow-1"
          :class="[!automatic ? 'active' : '']"
          @click.prevent="showManual"
        >
          Manuel
        </div>
      </div>
    </div>

    <div class="mt-5" v-if="automatic">
      <div class="row mb-0">
        <div class="col">
          <label for="method" class="text-uppercase">En fonction de</label>
          <div class="row">
          <div class="pr-2 col-6">
            <div
              class="custom-checkbox flex-grow-1"
              :class="[filter == 'points' ? 'active' : '']"
              @click.prevent="forceUnselectAllCustomers(); filterValue = null; filter = 'points';"
            >
              Points de fidélité
            </div>
          </div>
          <div class="pl-2 col-6">
            <div
              class="custom-checkbox flex-grow-1"
              :class="[filter == 'visites' ? 'active' : '']"
              @click.prevent="forceUnselectAllCustomers(); filterValue = null; filter = 'visites';"
            >
              Fréquences de visites
            </div>
          </div>
        </div>
        <div class="row">
          <div class="pr-2 col-6">
            <div
              class="custom-checkbox flex-grow-1"
              :class="[filter == 'last' ? 'active' : '']"
              @click.prevent="forceUnselectAllCustomers(); filterValue = null; filter = 'last';"
            >
              Dernières visites
            </div>
          </div>
          <div class="pl-2 col-6">
            <div
              class="custom-checkbox flex-grow-1"
              :class="[filter == 'all' ? 'active' : '']"
              @click.prevent="forceSelectAllCustomers(); filter = 'all';"
            >
              Tous les clients
            </div>
          </div>
        </div>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-between mt-0">
        <label class="text-uppercase">Clients</label>
        <span class="text-uppercase text-primary">{{ list.customers.length }} sélectionné<span v-if="list.customers.length > 1">s</span></span>
      </div>

      <div class="form-group">
        <div class="row mx-1" v-if="automatic && (filter == 'points' || filter == 'visites')">
          <div class="col-6 bg-background border-right">
            <v-select :options="sens" @input="filterCustomers" :reduce="option => option.key" label="value" v-model="superior">
            </v-select>
          </div>
          <div class="col-6 bg-background">
            <input class="form-control" type="text" @input="filterCustomers" v-model="filterValue" />
          </div>
        </div>
        <div class="row mx-1" v-else-if="automatic && filter == 'last'">
            <div class="col-6 bg-background border-right">
              <v-select :options="sens" @input="filterCustomers" :reduce="option => option.key" label="value" v-model="superior">
              </v-select>
            </div>
            <div class="col-6 bg-background">
              <input class="form-control" type="date" @input="filterCustomers" v-model="filterValue" />
            </div>
          </div>
        </div>
    </div>

    <div class="row mt-5" v-else>
      <div class="col">
        <div class="d-flex align-items-center justify-content-between">
          <label class="text-uppercase">Clients</label>
          <span class="text-uppercase text-primary">{{ list.customers.length }} sélectionné<span v-if="list.customers.length > 1">s</span></span>
        </div>
        <div style="height: 250px; overflow-y: scroll;">
          <table class="table">
            <thead>
              <th>
                <input
                  type="checkbox"
                  :checked="list.customers.length == customers.length"
                  @input="selectAllCustomers"
                />
              </th>
              <th colspan="2" class="py-0">
                <div class="input-group">
                  <input type="text" class="form-control px-0 mx-0" v-model="searchQuery" @input="searchCustomer" placeholder="Recherche.." />
                  <div class="input-group-append">
                    <div class="input-group-text blended" ><font-awesome-icon icon="search" /></div>
                  </div>
                </div>
              </th>
            </thead>
            <tbody>
              <tr v-for="(customer, index) in filteredCustomers" :key="index">
                <td>
                  <input
                    type="checkbox"
                    @input="selectCustomer(customer.id)"
                    :checked="list.customers.includes(customer.id)"
                  />
                </td>
                <td class="text-dark">{{ customer.first_name }} {{ customer.last_name }}</td>
                <td>
                  {{ customer.points }} point<span v-if="customer.points > 1">s</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="form-row">
      <div class="col text-center">
        <button
          class="btn btn-primary btn-rounded text-uppercase px-3 mt-0"
          @click.prevent="createCustomerList"
        >Créer une liste de clients</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vendor: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      customers: [],
      filteredCustomers: [],
      list: {
        name: "",
        vendor: "",
        customers: []
      },
      sens: [{value: 'Supérieur à', key: true}, {value: 'Inférieur à', key: false}],
      superior: true,
      filter: 'all',
      filterValue: 0,
      searchQuery: '',
      automatic: false
    };
  },
  created() {
    this.getCustomers();
  },
  methods: {
    getCustomers() {
      let loader = this.$loading.show();
      this.$http
        .get("/vendors/customers")
        .then(resp => {
          this.customers = resp.data;
          this.filteredCustomers = resp.data;
        })
        .finally(() => {
          loader.hide();
        });
    },
    showAutomatic() {
      this.automatic = true;
      this.list.customers = this.customers.map(customer => customer.id);
    },
    showManual() {
      this.automatic = false;
      this.list.customers = [];
    },
    searchCustomer() {
      if(this.searchQuery == '') {
        this.filteredCustomers = this.customers;
      } else {
        this.filteredCustomers = this.customers.filter(customer => customer.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) || customer.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    selectCustomer(id) {
      if (this.list.customers.includes(id)) {
        this.$delete(this.list.customers, this.list.customers.indexOf(id));
      } else {
        this.list.customers.push(id);
      }
    },
    selectAllCustomers() {
      if (this.list.customers.length == this.customers.length) {
        this.forceUnselectAllCustomers();
      } else {
        this.forceSelectAllCustomers();
      }
    },
    forceSelectAllCustomers() {
      this.list.customers = this.customers.map(customer => customer.id);
    },
    forceUnselectAllCustomers() {
      this.list.customers = [];
    },
    filterCustomers() {
      if(this.filter == 'points') {
        if(this.superior) {
          this.list.customers = this.customers.filter(customer => customer.points >= this.filterValue).map(customer => customer.id);
        } else {
          this.list.customers = this.customers.filter(customer => customer.points <= this.filterValue).map(customer => customer.id);
        }
      } else if(this.filter == 'visites') {
        if(this.superior) {
          this.list.customers = this.customers.filter(customer => customer.visit_freq >= this.filterValue).map(customer => customer.id);
        } else {
          this.list.customers = this.customers.filter(customer => customer.visit_freq <= this.filterValue).map(customer => customer.id);
        }
      } else if(this.filter == 'last') {
        if(this.superior) {
          this.list.customers = this.customers.filter(customer => customer.last_visit && new Date(customer.last_visit) >= new Date(this.filterValue)).map(customer => customer.id);
        } else {
          this.list.customers = this.customers.filter(customer =>  customer.last_visit && new Date(customer.last_visit) <= new Date(this.filterValue)).map(customer => customer.id);
        }
      }
    },
    createCustomerList() {
      if (this.list.name == "") {
        this.$toasted.global.error({
          message: "Il faut obligatoirement choisir un nom à cette liste."
        });
      } else if (this.list.customers.length == 0) {
        this.$toasted.global.error({
          message: "Une liste doit contenir au moins 1 client."
        });
      } else {
        this.list.vendor = this.vendor;
        this.$http
          .post("/vendors/customers/lists", this.list)
          .then(resp => {
            this.$emit("addedCustomerList", resp.data);
            this.$toasted.global.success({
              message: "La liste a bien été ajoutée."
            });
          }).catch(() => {
            this.$toasted.global.error({
              message: "Impossible d'ajouter la liste."
            });
          });
      }
    }
  }
};
</script>