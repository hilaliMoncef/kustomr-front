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

<style lang="scss" scoped>
.trigger {
  cursor: pointer;
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;
  left: auto;
  z-index: 1000;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  margin-top: 20px;
  font-size: 1rem;
  color: #fff;
  text-align: left;
  list-style: none;
  background-color: #3d405c;
  background-clip: padding-box;
  border-radius: 7px;

  &:after {
    content: " ";
    position: absolute;
    right: 15px;
    top: -5px;
    border-top: none;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 5px solid #3d405c;
  }

  ul {
    list-style: none;
    padding: 8px 20px;
    margin: 0;

    li {
      margin-bottom: 5px;
      width: 100%;
      white-space: nowrap;

      a {
        color: #fff;
        transition: 0.2s all ease-in-out;

        &:hover {
          color: #ED6C3E;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}


@media (max-width: 767px) { 
    .menu {
        position: relative;
        padding: 0;
        width: 100%;
        margin-bottom: 10px;
        background-color: lighten(#3d405c, 10%);
    }
}
</style>