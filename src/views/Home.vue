<template>
  <div class="home">
    <h1>For test purpose only</h1>
    <a href="#" class="btn btn-primary mr-2" @click.prevent="gotoLanding">Landing Page</a>
    <a href="#" class="btn btn-primary" @click.prevent="gotoDash">Dashboard Page</a>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    gotoLanding() {
      this.$store.dispatch("logout").then(() => {
        this.$toasted.global.success({message: 'Vous êtes désormais déconnecté.'});
        this.$router.push('/welcome/1-hm');
      });
    },
    gotoDash() {
      this.$store.dispatch("logout").then(() => {
        this.$toasted.global.success({message: 'Vous êtes désormais déconnecté.'});
        this.$router.push('/welcome/1-hm/YU2iu33PGIVBEd8Mt9g2BHOPuUc');
      });
    }
  }
}
</script>
