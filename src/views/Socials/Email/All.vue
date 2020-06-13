<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <div></div>
      <router-link
        to="/communication/mail/add"
        class="btn btn-primary btn-rounded text-uppercase"
      >Créer ma campagne Mail</router-link>
    </div>
    <div class="row">
      <div class="col">
        <table class="table" id="customer_listing">
          <thead>
            <tr>
              <th>Nom de la campagne mail</th>
              <th>Nombre de clients envoyé</th>
              <th>Date d'envoi</th>
              <th>Délivré</th>
              <th>Ouverture</th>
              <th>Clics</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(campaign, index) in campaigns"
              :key="index"
            >
              <td>{{ campaign.title }}</td>
              <td>{{ campaign.to.length }} client<span v-if="campaign.to.length > 1">s</span></td>
              <td>{{ campaign.send_at | moment("DD/MM/YYYY") }}</td>
              <td colspan="3" v-if="!campaign.stats"><span class="text-primary" @click.prevent="getStats(index)">Récupérer les statistiques</span></td>
              <td v-if="campaign.stats">{{ campaign.stats.delivered * 100 }}%</td>
              <td v-if="campaign.stats">{{ campaign.stats.opened * 100 }}%</td>
              <td v-if="campaign.stats">{{ campaign.stats.clicked * 100 }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      campaigns: []
    };
  },
  created() {
    this.getCampaigns();
  },
  methods: {
    getCampaigns() {
      this.$http.get("emails").then(resp => {
        this.campaigns = resp.data;
      });
    },
    getStats(index) {
      this.$http.get("emails/"+ this.campaigns[index].id +"/statistics").then(resp => {
        const campaign = resp.data.campaign;
        campaign.stats = resp.data.stats;
        this.$set(this.campaigns, index, campaign);
      })
    }
  }
};
</script>