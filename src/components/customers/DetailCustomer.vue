<template>
  <div>
    <modal class="h-100" width="30%" height="auto" name="encaissement" :adaptative="true">
      <div class="p-4 px-5">
        <h5 class="text-dark text-center text-uppercase mb-4">Encaisser {{ customer.first_name }} {{ customer.last_name }}</h5>
        <Encaissement :customer="customer" />
      </div>
    </modal>

    <h4
      class="text-dark text-center text-uppercase mb-0"
    >{{ customer.first_name }} {{ customer.last_name }}</h4>
    <p class="text-muted text-center">{{ customer.email }} - {{ customer.phone }}</p>
    <div class="text-center">
      <button type="button" @click.prevent="$modal.show('encaissement')" class="btn btn-primary btn-rounded mr-3 text-uppercase">
        <font-awesome-icon icon="hand-holding-usd" class="mr-2" />Encaisser
      </button>
      <button type="button" class="btn btn-outline-primary btn-rounded text-uppercase">Rembourser</button>
    </div>
    <div class="row mt-4">
      <div class="col-6">
        <ul class="metrics">
          <li>
            Points cumulés
            <span class="text-primary font-weight-bold">{{ customer.points }}</span>
          </li>
          <li>
            Dépenses réalisés
            <span class="text-primary font-weight-bold">{{ customer.points }}</span>
          </li>
          <li>
            Panier moyen
            <span class="text-primary font-weight-bold">{{ customer.points }}</span>
          </li>
          <li>
            Fréquences des visites
            <span class="text-primary font-weight-bold">{{ customer.points }}</span>
          </li>
          <li>
            Taux d'engagement
            <span class="text-primary font-weight-bold">{{ customer.points }}</span>
          </li>
          <li>
            Dernière visite
            <span class="text-primary font-weight-bold">{{ customer.points }}</span>
          </li>
        </ul>
      </div>
      <div class="col-6 d-flex flex-column">
        <div class="h6 text-uppercase text-dark">Dernières activités</div>
        <div class="bg-background rounded h-100">
            <div class="timeline-wrapper">
                <div class="timeline">
                    <ul>
                        <li v-for="(transaction, index) in transactions" :key="index">
                            <span class="dot"></span>
                            <span>{{ transaction.date }}</span>
                            <span class="text-primary" v-if="transaction.category == 'A'">{{ transaction.amount }} points</span>
                            <span class="text-primary" v-if="transaction.category == 'R'">-{{ transaction.amount }} points</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Encaissement from "@/components/customers/Encaissement.vue";

export default {
  components: { Encaissement },
  props: {
    customer: {
      type: Object,
      required: true
    }
  },
  data() {
      return {
          transactions: []
      }
  },
  created() {
      this.getTransactions();
  },
  methods: {
      getTransactions() {
          this.$http.get('/customers/'+ this.customer.id +'/transactions').then(resp => {
              this.transactions = resp.data;
          }).catch(() => {
              this.$toasted.global.error({message: 'Impossible de récupérer la liste des transactions.'})
          })
      }
  }
};
</script>