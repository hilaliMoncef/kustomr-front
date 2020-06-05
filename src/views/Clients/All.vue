<template>
  <div>
    <h1>Clients</h1>
    <div class="row mb-3">
      <div class="col-6">
        <ul class="list-unstyled inline-buttons">
          <li class="dropdown">
            <button
              class="btn btn-secondary"
              type="button"
            >
              <font-awesome-icon icon="arrow-up" /> Exporter
            </button>

            <div
              class="dropdown-menu dropdown-menu-right"
              id="exportLinksDropdown"
              aria-labelledby="exportLinks"
            ></div>
          </li>
          <li>
            <button class="btn btn-secondary" type="button">
              <font-awesome-icon icon="arrow-down" /> Importer
            </button>
          </li>
          <li>
            <button class="btn btn-secondary" type="button">
              <font-awesome-icon icon="filter" /> Filtrer
            </button>
          </li>
          <li>
            <button class="btn btn-secondary" type="button">
              <font-awesome-icon icon="sort" /> Trier
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
        <button class="btn btn-secondary btn-round" type="button">
          <font-awesome-icon icon="plus" />
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        {{ customers }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customers: {}
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
      this.$http.get('/vendors/customers').then(resp => {
        this.customers = resp.data;
      }).finally(() => {
        loader.hide();
      })
    }
  }
};
</script>