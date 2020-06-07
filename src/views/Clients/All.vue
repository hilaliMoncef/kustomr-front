<template>
  <div>
    <modal class="h-100" height="auto" name="addCustomer" :adaptative="true">
      <div class="p-4 px-5">
        <h5 class="text-dark text-center text-uppercase mb-4">Création de compte client</h5>
        <AddCustomer @addedCustomer="addedCustomer" :vendor="$store.state.currentVendor.id" />
      </div>
    </modal>

    <h1>Clients</h1>
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
            <button class="btn btn-secondary" type="button">
              <font-awesome-icon icon="sort" class="mr-2" />Trier
            </button>
          </li>
        </ul>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <ul class="list-unstyled inline-buttons mr-2">
          <li>
            <button class="btn btn-secondary active" type="button">Clients</button>
          </li>
          <li>
            <button class="btn btn-secondary" type="button">Listes</button>
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
            <tr v-for="(customer, index) in customers" :key="index">
              <td>{{ customer.first_name }} {{ customer.last_name }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td>#{{ customer.id }}</td>
              <td>
                {{ customer.points }} point
                <span v-if="customer.points > 1">s</span>
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
</template>

<script>
import AddCustomer from "@/components/customers/AddCustomer.vue";

export default {
  components: { AddCustomer },
  data() {
    return {
      customers: {},
      export_fields: {
        "Nom": "last_name",
        "Prénom": "first_name",
        "Email": "email",
        "Telephone": "phone",
        "Numéro client": "id",
        "Points": "points"
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ]
    };
  },
  created() {
    this.getCustomers();
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
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
    addedCustomer(customer) {
      this.customers.unshift(customer);
      this.$modal.hide("addCustomer");
    }
  }
};
</script>