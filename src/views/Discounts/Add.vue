<template>
  <div class="row">
    <div class="col-9">
      <div class="card-tabs">
        <tabs>
          <tab name="Points de fidélité" :selected="true">
              <AddPointDiscount :vendor="$store.state.currentVendor.id" />
          </tab>
          <tab name="Pourcentage">
              <AddPercentDiscount :vendor="$store.state.currentVendor.id" />
          </tab>
          <tab name="Montant fixe">
              <AddAmountDiscount :vendor="$store.state.currentVendor.id" />
          </tab>
        </tabs>
      </div>
    </div>
    <div class="col-3">
        <div class="card bg-secondary">
            Information
        </div>
    </div>
  </div>
</template>

<script>
import AddPointDiscount from "@/components/discounts/AddPointDiscount.vue"
import AddPercentDiscount from "@/components/discounts/AddPercentDiscount.vue"
import AddAmountDiscount from "@/components/discounts/AddAmountDiscount.vue"

export default {
    components: {AddPointDiscount, AddPercentDiscount, AddAmountDiscount}
};
</script>