<template>
  <div>
    <modal class="h-100" height="auto" name="addCustomer" :adaptative="true">
      <div class="p-4 px-5">
        <h5 class="text-dark text-center text-uppercase mb-4">Création de compte client</h5>
        <AddCustomer @addedCustomer="addedCustomer" :vendor="$store.state.currentVendor.id" />
      </div>
    </modal>

    <modal class="h-100" height="auto" name="addCustomerList" :adaptative="true">
      <div class="p-4 px-5">
        <h5 class="text-dark text-center text-uppercase mb-4">Création de liste de client</h5>
        <AddCustomerList @addedCustomerList="addedCustomerList" :vendor="$store.state.currentVendor.id" />
      </div>
    </modal>

    <modal class="h-100" height="auto" name="detailCustomer" :adaptative="true">
      <div class="p-4 px-5">
        <DetailCustomer @updatedCustomer="reloadCustomer" :vendor="$store.state.currentVendor.id" :customer="detailCustomer" />
      </div>
    </modal>

    <div v-if="activeView == 0">
      <div class="row mb-3">
        <div class="col-6">
          <ul class="list-unstyled inline-buttons">
            <li class="dropdown">
              <export-excel
                class="btn btn-secondary"
                v-if="customers"
                :data="customers"
                :fields="export_fields"
                worksheet="Data"
                name="export_clients.xls"
              >
                <font-awesome-icon icon="arrow-up" class="mr-2" />Exporter
              </export-excel>
            </li>
            <li>
              <button class="btn btn-secondary" type="button">
                <font-awesome-icon icon="arrow-down" class="mr-2" />Importer
              </button>
            </li>
            <li>
              <button class="btn btn-secondary" type="button">
                <font-awesome-icon icon="filter" class="mr-2" />Filtrer
              </button>
            </li>
            <li>
              <dropdown>
                  <template v-slot:button>
                    <button class="btn btn-secondary" type="button">
                      <font-awesome-icon icon="sort" class="mr-2" />Trier
                    </button>
                  </template>
                  <template v-slot:links>
                    <ul class="list-unstyled">
                      <li v-for="property in properties" @click.prevent="sortByProperty(property.property)" :key="property.property" class="d-flex align-items-center justify-content-between cursor-pointer" :class="[selectedSort == property.property ? 'text-primary' : '']">
                        <span>{{ property.label }}</span>
                        <div v-if="selectedSort == property.property">
                          <font-awesome-icon icon="check" size="xs" />
                        </div>
                      </li>
                    </ul>
                  </template>
                </dropdown>
            </li>
          </ul>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <ul class="list-unstyled inline-buttons mr-2">
            <li>
              <button :class="['btn', 'btn-secondary', activeView == 0 ? 'active' : '']" type="button" @click.prevent="activeView = 0">Clients</button>
            </li>
            <li>
              <button :class="['btn', 'btn-secondary', activeView == 1 ? 'active' : '']" type="button" @click.prevent="activeView = 1">Listes</button>
            </li>
          </ul>
          <button
            class="btn btn-secondary btn-round"
            @click.prevent="$modal.show('addCustomer');"
            type="button"
          >
            <font-awesome-icon icon="plus" />
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="table" id="customer_listing">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Mail</th>
                <th>Téléphone</th>
                <th>Numéro clients</th>
                <th>Points accumulés</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(customer, index) in processedCustomers" :key="index" @click.prevent="detailCustomer = customer; $modal.show('detailCustomer');">
                <td>{{ customer.name }}</td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.phone }}</td>
                <td>#{{ customer.id }}</td>
                <td>
                  {{ customer.points }} point<span v-if="customer.points > 1">s</span>
                </td>
                <td>
                  <font-awesome-icon icon="ellipsis-v" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else-if="activeView == 1">
      <div class="row mb-3">
        <div class="col-6">
        </div>
        <div class="col-6 d-flex justify-content-end">
          <ul class="list-unstyled inline-buttons mr-2">
            <li>
              <button :class="['btn', activeView == 0 ? 'btn-primary' : 'btn-secondary']" type="button" @click.prevent="activeView = 0">Clients</button>
            </li>
            <li>
              <button :class="['btn', activeView == 1 ?  'btn-primary' : 'btn-secondary']" type="button" @click.prevent="activeView = 1">Listes</button>
            </li>
          </ul>
          <button
            class="btn btn-secondary btn-round"
            @click.prevent="$modal.show('addCustomerList');"
            type="button"
          >
            <font-awesome-icon icon="plus" />
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <table class="table" id="customer_listing">
            <thead>
              <tr>
                <th>Nom de la liste</th>
                <th>Nombre de clients</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list, index) in lists" :key="index">
                <td>{{ list.name }}</td>
                <td>
                  <span v-if="list.customers">
                  {{ list.customers.length }} client<span v-if="list.customers.length > 1">s</span>
                  </span>
                </td>
                <td>
                  <font-awesome-icon icon="ellipsis-v" />
                </td>
              </tr>
                <td v-if="lists.length == 0" colspan="3">Aucune liste de client pour le moment.</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddCustomer from "@/components/customers/AddCustomer.vue";
import AddCustomerList from "@/components/customers/AddCustomerList.vue";
import DetailCustomer from "@/components/customers/DetailCustomer.vue";

export default {
  components: { AddCustomer, AddCustomerList, DetailCustomer },
  data() {
    return {
      customers: [],
      lists: [],
      activeView: 0,
      detailCustomer: {},
      export_fields: {
        Nom: "last_name",
        Prénom: "first_name",
        Email: "email",
        Telephone: "phone",
        "Numéro client": "id",
        Points: "points"
      },
      // Filtering part
      properties: [
        {property: 'name', label: 'Nom'},
        {property: 'id', label: 'Numéro client'},
        {property: 'points', label: 'Points'},
      ],
      selectedSort: null
    };
  },
  created() {
    this.getCustomers();
    this.getCustomerLists();
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    processedCustomers() {
      const customers = this.customers.slice(0);
      if(this.selectedSort) {
        customers.sort((a,b) => { // eslint-disable-line
          return eval('b.'+this.selectedSort) - eval('a.'+this.selectedSort) // eslint-disable-line
        });
      }
      return customers
    }
  },
  methods: {
    getCustomers() {
      let loader = this.$loading.show();
      this.$http
        .get("/vendors/customers")
        .then(resp => {
          this.customers = resp.data;
        })
        .finally(() => {
          loader.hide();
        });
    },
    getCustomerLists() {
      this.$http.get("/vendors/customers/lists").then(resp => {
        this.lists = resp.data;
      }).catch(() => {
        this.$toasted.global.error({message: 'Impossible de récupérer la liste de clients.'})
      })
    },
    addedCustomer(customer) {
      this.customers.unshift(customer);
      this.$modal.hide("addCustomer");
    },
    addedCustomerList(list) {
      this.lists.unshift(list);
      this.$modal.hide("addCustomerList");
    },
    reloadCustomer(id) {
      var index = this.customers.map(customer => customer.id).indexOf(id);
      this.$http.get('/customers/'+ id).then(resp => {
        this.$set(this.customers, index, resp.data);
        this.detailCustomer = resp.data;
      }).catch(() => {
        this.$toasted.global.error({message: 'Impossible de recharger le client.'});
      })
    },
    // Sorting Part
    sortByProperty(property) {
      if(this.selectedSort == property) {
        this.selectedSort = null;
      } else {
        this.selectedSort = property;
      }
    }
  },
};
</script>