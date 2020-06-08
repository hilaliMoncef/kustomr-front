<template>
  <div class="row">
    <div class="col-9">
      <div class="card-tabs">
        <tabs>
          <tab name="Points de fidélité" :selected="true">
              <AddPointDiscount :vendor="$store.state.currentVendor.id" />
          </tab>
          <tab name="Pourcentage">Second</tab>
          <tab name="Montant fixe">third</tab>
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

export default {
    components: {AddPointDiscount}
};
</script>