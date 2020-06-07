<template>
  <div class="form-dark">
    <div class="form-row">
      <div class="col-6">
        <div class="form-group">
          <label for="first_name" class="text-uppercase">Nom</label>
          <input class="form-control" v-model="customer.first_name" type="text" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="last_name" class="text-uppercase">Prénom</label>
          <input class="form-control" v-model="customer.last_name" type="text" />
        </div>
      </div>
    </div>
    <div class="form-group mt-3">
      <label for="birthday" class="text-uppercase">Date de naissance</label>
      <input type="date" class="form-control" v-model="customer.birthday" />
    </div>
    <div class="form-group mt-3">
      <label for="phone" class="text-uppercase">Téléphone</label>
      <input type="text" class="form-control" v-model="customer.phone" />
    </div>
    <div class="form-group mt-3">
      <label for="email" class="text-uppercase">Email</label>
      <input type="email" class="form-control" v-model="customer.email" />
    </div>
    <div class="form-row">
      <div class="col text-center">
        <button class="btn btn-primary btn-rounded text-uppercase px-3 mt-3" @click.prevent="createCustomer">Créer un compte client</button>
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
      customer: {
        first_name: "",
        last_name: "",
        phone: "",
        email: ""
      }
    };
  },
  methods: {
    createCustomer() {
      if (
        this.vendor == "" ||
        this.customer.first_name == "" ||
        this.customer.last_name == "" ||
        this.customer.email == "" ||
        this.customer.phone == ""
      ) {
        this.$toasted.global.error({
          message: "Certains champs sont manquants."
        });
      } else {
        this.customer.vendor = this.vendor;
        this.$http.post("/vendors/customers", this.customer).then(resp => {
          this.$emit("addedCustomer", resp.data);
          this.$toasted.global.success({
            message: "Le client a bien été ajouté."
          });
        }).catch(() => {
            this.$toasted.global.error({message: 'Impossible d\'ajouter le client.'})
        })
      }
    }
  }
};
</script>