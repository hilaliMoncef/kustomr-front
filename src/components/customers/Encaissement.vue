<template>
  <div class="form-dark">
    <div class="form-group">
      <label for="amount" class="text-uppercase">Montant du panier</label>
      <input type="number" class="form-control" min="0" v-model="transaction.amount" />
    </div>
    <div class="d-flex align-items-center justify-content-between mt-4" v-if="usedCode">
      <label class="text-uppercase">Montant après réduction</label>
      <span class="text-primary">{{ transaction.amount_discounted }} €</span>
    </div>
    <div class="d-flex align-items-center justify-content-between mt-1">
      <label class="text-uppercase">Points cumulés</label>
      <span class="text-primary" v-if="!usedCode">
        {{ Math.round(transaction.amount) }} point<span v-if="transaction.amount > 1">s</span>
      </span>
      <span class="text-primary" v-else>
        {{ Math.round(transaction.amount_discounted) }} point<span v-if="transaction.amount_discounted > 1">s</span>
      </span>
    </div>
    <div class="mt-5">
      <label
        class="text-uppercase"
      >{{ customer.first_name }} {{ customer.last_name }} a-t-il utilisé un code promo ?</label>
      <div class="d-flex align-items-center">
        <div
          class="custom-checkbox mr-2 flex-grow-1 text-success"
          :class="[usedCode ? 'active' : '']"
          @click.prevent="showCode"
        >
          <font-awesome-icon icon="check-circle" class="mr-1" />Oui
        </div>
        <div
          class="custom-checkbox ml-2 flex-grow-1 text-danger"
          :class="[!usedCode ? 'active' : '']"
          @click.prevent="hideCode"
        >
          <font-awesome-icon icon="times-circle" class="mr-1" />Non
        </div>
      </div>
    </div>
    <div class="mt-3" v-if="usedCode">
      <div class="form-group">
        <label for="code" class="text-uppercase">Quel type de promotion ?</label>
        <v-select
          :options="type_discounts"
          v-model="type_code"
          :reduce="type => type.id"
          label="key"
        ></v-select>
      </div>
    </div>
    <div class="mt-3" v-if="usedCode && type_code == 'points'">
      <div class="form-group">
        <label for="code" class="text-uppercase">Code promo</label>
        <v-select
          :options="point_discounts"
          v-model="transaction.point_discount"
          :reduce="discount => discount.id"
          @input="usingPointDiscount"
          :selectable="discount => customer.points >= discount.min_points"
          label="code"
        >
          <template v-slot:option="option">
            {{ option.code }} -
            <span
              class="text-success"
              v-if="customer.points >= option.min_points"
            >Eligible</span>
            <span class="text-danger" v-else>Non éligible</span>
          </template>
        </v-select>
      </div>
    </div>
    <div class="mt-3" v-if="usedCode && type_code == 'amounts'">
      <div class="form-group">
        <label for="code" class="text-uppercase">Code promo</label>
        <v-select
          :options="amount_discounts"
          v-model="transaction.amount_discount"
          :reduce="discount => discount.id"
          @input="usingAmountDiscount"
          :selectable="discount => transaction.amount >= discount.min_bill"
          label="name"
        >
          <template v-slot:option="option">
            {{ option.code }} -
            <span
              class="text-success"
              v-if="transaction.amount >= option.min_bill"
            >Eligible</span>
            <span class="text-danger" v-else>Non éligible</span>
          </template>
        </v-select>
      </div>
    </div>
    <div class="mt-3" v-if="usedCode && type_code == 'percents'">
      <div class="form-group">
        <label for="code" class="text-uppercase">Code promo</label>
        <v-select
          :options="percent_discounts"
          v-model="transaction.percent_discount"
          :reduce="discount => discount.id"
          @input="usingPercentDiscount"
          label="name"
        ></v-select>
      </div>
    </div>
    <div class="text-center">
      <button type="button" class="btn btn-primary btn-rounded text-uppercase mt-4" @click.prevent="createTransaction">Encaisser</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true
    },
    vendor: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      transaction: {
        amount: 0,
        amount_discounted: 0,
        vendor: null,
        customer: null,
        discount: null,
        refunded: false,
        point_discount: null,
        amount_discount: null,
        percent_discount: null
      },
      point_discounts: [],
      amount_discounts: [],
      percent_discounts: [],
      type_discounts: [
        { id: "points", key: "Réduction Points de fidélité" },
        { id: "amounts", key: "Réduction Montant fixe" },
        { id: "percents", key: "Réduction Pourcentage" }
      ],
      type_code: "points",
      usedCode: false
    };
  },
  created() {
    this.getDiscounts();
  },
  methods: {
    getDiscounts() {
      let loader = this.$loading.show();
      this.$http
        .get("/discounts")
        .then(resp => {
          this.point_discounts = resp.data.points;
          this.amount_discounts = resp.data.amount;
          this.percent_discounts = resp.data.percent;
        })
        .catch(() => {
          this.$toasted.global.error({
            message: "Impossible de récupérer les réductions."
          });
        })
        .finally(() => {
          loader.hide();
        });
    },
    showCode() {
      if (this.transaction.amount == 0) {
        this.$toasted.global.error({
          message: "Veuillez d'abord rentrer le montant du panier."
        });
      } else {
        this.transaction.amount_discounted = this.transaction.amount;
        this.usedCode = true;
      }
    },
    hideCode() {
      this.transaction.discount = null;
      this.amountDiscount = 0;
      this.usedCode = false;
    },
    usingPointDiscount(val) {
      this.transaction.percent_discount = null;
      this.transaction.amount_discount = null;

      if (val) {
        const discount = this.point_discounts[
          this.point_discounts.map(discount => discount.id).indexOf(val)
        ];
        this.transaction.amount_discounted = this.transaction.amount;
        if (discount.type_amount == "M") {
          this.transaction.amount_discounted = this.transaction.amount_discounted - discount.amount;
        } else {
          this.transaction.amount_discounted =
            this.transaction.amount_discounted -
            (this.transaction.amount_discounted * discount.amount) / 100;
        }
        this.$toasted.global.success({
          message: "La promotion a été appliquée."
        });
      }
    },
    usingAmountDiscount(val) {
      this.transaction.point_discount = null;
      this.transaction.percent_discount = null;
      if (val) {
        const discount = this.amount_discounts[
          this.amount_discounts.map(discount => discount.id).indexOf(val)
        ];
        this.transaction.amount_discounted = this.transaction.amount;
        if (discount.type_amount == "M") {
          this.transaction.amount_discounted = this.transaction.amount_discounted - discount.amount;
        } else {
          this.transaction.amount_discounted =
            this.transaction.amount_discounted -
            (this.transaction.amount_discounted * discount.amount) / 100;
        }
        this.$toasted.global.success({
          message: "La promotion a été appliquée."
        });
      } else {
        this.transaction.amount_discounted = this.transaction.amount;
      }
    },
    usingPercentDiscount(val) {
      this.transaction.point_discount = null;
      this.transaction.amount_discount = null;

      if (val) {
        const discount = this.percent_discounts[
          this.percent_discounts.map(discount => discount.id).indexOf(val)
        ];
        this.transaction.amount_discounted = this.transaction.amount;
        this.transaction.amount_discounted =
          this.transaction.amount_discounted -
          (this.transaction.amount_discounted * discount.amount) / 100;

        this.$toasted.global.success({
          message: "La promotion a été appliquée."
        });
      } else {
        this.transaction.amount_discounted = this.transaction.amount;
      }
    },
    createTransaction() {
        if(this.transaction.amount == 0) {
            this.$toasted.global.error({message: "Veuillez d'abord rentrer le montant du panier."})
        } if(this.usedCode && (!this.transaction.point_discount && !this.transaction.amount_discount && !this.transaction.percent_discount)) {
            this.$toasted.global.error({message: "Veuillez choisir un code promo à appliquer."})
        } else {
            this.transaction.customer = this.customer.id;
            this.transaction.vendor = this.vendor;
            if(!this.usedCode) {
                this.transaction.amount_discounted = this.transaction.amount;
            }
            this.$http.post('customers/transactions', this.transaction).then(resp => {
                this.$toasted.global.success({message: 'Votre client a bien été encaissé.'})
                this.$emit('transactionSaved', resp.data);
            }).catch(() => {
                this.$toasted.global.error({message: 'Impossible d\'enregistrer l\'encaissement.'})
            })
        }
    }
  }
};
</script>