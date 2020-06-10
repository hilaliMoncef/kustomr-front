<template>
  <div class="dropdown position-relative" v-click-outside="hideDropdown">
    <div class="trigger" @click.prevent="toggleDropdown()">
      <slot name="button"></slot>
    </div>
    <div class="menu" @click.prevent="toggleDropdown()" :class="[dropdownActive ? '' : 'd-none']">
      <slot name="links"></slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  data() {
    return {
      dropdownActive: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownActive = !this.dropdownActive;
    },
    hideDropdown() {
        this.dropdownActive = false;
    }
  },
  directives: {
    ClickOutside
  }
};
</script>