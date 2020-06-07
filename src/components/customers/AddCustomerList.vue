<template>
  <div class="form-dark">
    <div class="form-group mb-3">
      <label for="name" class="text-uppercase">Nom de la liste</label>
      <input class="form-control" v-model="list.name" type="text" />
    </div>

    <div class="row mt-3">
      <div class="col">
        <label class="text-uppercase">Clients</label>
        <table class="table">
          <thead>
            <th>
              <input
                type="checkbox"
                :checked="list.customers.length == customers.length"
                @input="selectAllCustomers"
              />
            </th>
            <th>Nom</th>
            <th>Points</th>
            <th>Date de naissance</th>
          </thead>
          <paginate name="customers" :list="customers" :per="6" tag="tbody">
            <tr v-for="(customer, index) in paginated('customers')" :key="index">
              <td>
                <input
                  type="checkbox"
                  @input="selectCustomer(customer.id)"
                  :checked="list.customers.includes(customer.id)"
                />
              </td>
              <td>{{ customer.first_name }} {{ customer.last_name }}</td>
              <td>
                {{ customer.points }} point<span v-if="customer.points > 1">s</span>
              </td>
              <td>{{ customer.birthday }}</td>
            </tr>
          </paginate>
        </table>
        <paginate-links
          for="customers"
          :classes="{
                'ul': 'pagination',
                'li': 'page-item',
                'a': 'page-link'
            }"
          :show-step-links="true"
        ></paginate-links>
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
      list: {
        name: "",
        vendor: "",
        customers: []
      },
      paginate: ["customers"]
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
        })
        .finally(() => {
          loader.hide();
        });
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
        this.list.customers = [];
      } else {
        this.list.customers = this.customers.map(customer => customer.id);
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