<template>
  <div>
     <modal class="h-100" width="70%" height="auto" name="editPoints" :adaptative="true">
      <div class="p-2 px-5">
        <h5 class="text-dark text-center text-uppercase mb-4">Type de réduction : <span class="text-primary">Point de fidélité</span></h5>
        <EditPointDiscount @updatedDiscount="updateDiscountPoint" :instance="editedDiscount" :vendor="$store.state.currentVendor.id" />
      </div>
    </modal>

    <modal class="h-100" width="70%" height="auto" name="editAmounts" :adaptative="true">
      <div class="p-2 px-5">
        <h5 class="text-dark text-center text-uppercase mb-4">Type de réduction : <span class="text-primary">Montant fixe</span></h5>
        <EditAmountDiscount @updatedDiscount="updateDiscountAmount" :instance="editedDiscount" :vendor="$store.state.currentVendor.id" />
      </div>
    </modal>

    <modal class="h-100" width="70%" height="auto" name="editPercents" :adaptative="true">
      <div class="p-2 px-5">
        <h5 class="text-dark text-center text-uppercase mb-4">Type de réduction : <span class="text-primary">Pourcentage</span></h5>
        <EditPercentDiscount @updatedDiscount="updateDiscountPercent" :instance="editedDiscount" :vendor="$store.state.currentVendor.id" />
      </div>
    </modal>

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
        <div class="col-12 col-md-4 col-lg-3 d-flex flex-column align-items-center" v-for="(discount, index) in point_discounts" :key="'points-'+index">
            <div class="card-discount" @click.prevent="editedDiscount = discount.id; $modal.show('editPoints')">
                <img :src="discount.image.file" alt="Discount" />
                <div class="overlay"></div>
                <div class="status" v-if="discount.status == 0">
                    <span>Activé</span> <font-awesome-icon icon="check-circle" />
                </div>
            </div>
            <span>{{ discount.name }}</span>
        </div>
        <div class="col-12 col-md-4 col-lg-3 d-flex flex-column align-items-center" v-for="(discount, index) in percent_discounts" :key="'percent-'+index">
            <div class="card-discount" @click.prevent="editedDiscount = discount.id; $modal.show('editPercents');">
                <img :src="discount.image.file" alt="Discount" />
                <div class="overlay"></div>
                <div class="status" v-if="discount.status == 0">
                    <span>Activé</span> <font-awesome-icon icon="check-circle" />
                </div>
            </div>
            <span>{{ discount.name }}</span>
        </div>
        <div class="col-12 col-md-4 col-lg-3 d-flex flex-column align-items-center" v-for="(discount, index) in amount_discounts" :key="'amount-'+index">
            <div class="card-discount" @click.prevent="editedDiscount = discount.id; $modal.show('editAmounts');">
                <img :src="discount.image.file" alt="Discount" />
                <div class="overlay"></div>
                <div class="status" v-if="discount.status == 0">
                    <span>Activé</span> <font-awesome-icon icon="check-circle" />
                </div>
            </div>
            <span>{{ discount.name }}</span>
        </div>
        <div class="col-12" v-if="point_discounts.length == 0 && amount_discounts.length == 0 && percent_discounts.length == 0">
            <p>Aucune réduction pour le moment</p>
        </div>
    </div>
  </div>
</template>

<script>
import EditPointDiscount from "@/components/discounts/EditPointDiscount.vue"
import EditAmountDiscount from "@/components/discounts/EditAmountDiscount.vue"
import EditPercentDiscount from "@/components/discounts/EditPercentDiscount.vue"

export default {
  components: { EditPointDiscount, EditAmountDiscount, EditPercentDiscount },
  data() {
      return {
          point_discounts: [],
          amount_discounts: [],
          percent_discounts: [],
          editedDiscount: {},
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
      },
      updateDiscountPoint(data) {
        this.$set(this.point_discounts, this.point_discounts.map(discount => discount.id).indexOf(data.id), data);
        this.$modal.hide('editPoints');
      },
      updateDiscountAmount(data) {
        this.$set(this.amount_discounts, this.amount_discounts.map(discount => discount.id).indexOf(data.id), data);
        this.$modal.hide('editAmounts');
      },
      updateDiscountPercent(data) {
        this.$set(this.percent_discounts, this.percent_discounts.map(discount => discount.id).indexOf(data.id), data);
        this.$modal.hide('editPercents');
      }
  }
};
</script>