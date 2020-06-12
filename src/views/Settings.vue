<template>
  <div>
    <div class="text-divider">
      Réglages
      <div class="bar ml-3"></div>
    </div>
    <div class="row card-tabs-vertical mt-4">
      <div class="col-12 col-md-3 mb-3 mb-md-0 pr-0">
        <ul class="tabs">
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            @click.prevent="activeIndex = index"
            :class="[activeIndex == index ? 'is-active' : '', index == 0 ? 'first' : '']"
          >{{ tab }}</li>
        </ul>
      </div>
      <div class="col-12 col-md-9 pl-0">
        <div class="tabs-details" :class="[activeIndex == 0 ? 'first' : '']">
          <div v-if="activeIndex == 0">
            <AccountSettings @updated="updateUserInfo" :user="this.user" :vendor="this.vendor" />
          </div>
          <div v-else-if="activeIndex == 1">
            <StoreSettings @updated="updateUserInfo" :vendor="this.vendor" />
          </div>
          <div v-else-if="activeIndex == 2">
            <RewardCardSettings @updated="updateUserInfo" :layout="this.reward_card_layout" />
          </div>
          <div v-else-if="activeIndex == 3">
          </div>
          <div v-else-if="activeIndex == 4">
            <PasswordSettings @updated="updateUserInfo" :vendor="this.vendor" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountSettings from "@/components/settings/AccountSettings.vue";
import StoreSettings from "@/components/settings/StoreSettings.vue";
import RewardCardSettings from "@/components/settings/RewardCardSettings.vue";
import PasswordSettings from "@/components/settings/PasswordSettings.vue";

export default {
  components: { AccountSettings, StoreSettings, RewardCardSettings, PasswordSettings },
  data() {
    return {
      tabs: [
        "Mon compte",
        "Ma boutique",
        "Ma carte de fidélité",
        "Facturation et paiement",
        "Sécurité du compte"
      ],
      activeIndex: 0,
      user: {},
      vendor: {},
    };
  },
  created() {
    this.user = this.$store.state.currentUser;
    this.vendor = this.$store.state.currentVendor;
    this.reward_card_layout = this.$store.state.currentVendor.reward_card_layout;
  },
  methods: {
      updateUserInfo() {
          this.$store.dispatch('refreshUserInfo');
      }
  }
};
</script>