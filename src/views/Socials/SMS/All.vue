<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <div></div>
      <router-link
        to="/communication/sms/add"
        class="btn btn-primary btn-rounded text-uppercase"
      >Créer ma campagne SMS</router-link>
    </div>
    <div class="row mb-0">
      <div class="col">
        <table class="table" id="customer_listing">
          <thead>
            <tr>
              <th>Nom de la campagne mail</th>
              <th>Nombre de clients envoyé</th>
              <th>Date d'envoi</th>
              <th>Nombre d'SMS</th>
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
              <td>{{ campaign.send_at | moment("DD/MM/YYYY HH:mm") }}</td>
              <td>{{ campaign.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col text-center" v-if="campaigns.length == 0">
          <p>Aucune campagne pour le moment.</p>
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
      this.$http.get("sms").then(resp => {
        this.campaigns = resp.data;
      });
    },
  }
};
</script>