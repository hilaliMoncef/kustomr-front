<template>
  <div>
    <div class="row mb-3">
      <div class="col-6">
        <ul class="list-unstyled inline-buttons">
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
            <button
              :class="['btn', 'btn-secondary', activeView == 0 ? 'active' : '']"
              type="button"
              @click.prevent="activeView = 0"
            >Réductions</button>
          </li>
          <li>
            <button
              :class="['btn', 'btn-secondary', activeView == 1 ? 'active' : '']"
              type="button"
              @click.prevent="activeView = 1"
            >Actualités</button>
          </li>
        </ul>
        <router-link to="/discounts/add" class="btn btn-secondary btn-round" type="button">
          <font-awesome-icon icon="plus" />
        </router-link>
      </div>
    </div>

    <div class="row mt-4" v-if="activeView == 0">
        <div class="col-3 d-flex flex-column align-items-center" v-for="(discount, index) in point_discounts" :key="index">
            <div class="card-discount">
                <img src="@/assets/images/bg-default.jpg" alt="Discount" />
                <div class="overlay"></div>
                <div class="status" v-if="discount.status == 0">
                    <span>Activé</span> <font-awesome-icon icon="check-circle" />
                </div>
            </div>
            <h5>{{ discount.name }}</h5>
        </div>
        <div class="col-12" v-if="point_discounts.length == 0 && amount_discounts.length == 0 && percent_discounts.length == 0">
            <p>Aucune réduction pour le moment</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          point_discounts: [],
          amount_discounts: [],
          percent_discounts: [],
          activeView: 0
      }
  },
  created() {
      this.getDiscounts();
  },
  methods: {
      getDiscounts() {
          let loader = this.$loading.show();
          this.$http.get('/discounts').then(resp => {
              this.point_discounts = resp.data.points;
              this.amount_discounts = resp.data.amount;
              this.percent_discounts = resp.data.percent;
          }).catch(() => {
              this.$toasted.global.error({message: 'Impossible de récupérer les réductions.'})
          }).finally(() => {
              loader.hide();
          })
      }
  }
};
</script>