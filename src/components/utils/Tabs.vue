<template>
  <div>
    <div class="tabs" :class="[tabsClass]">
      <ul>
        <li v-for="(tab, index) in tabs" :key="index" :class="[tab.isActive ? 'is-active' : '', index == 0 ? 'first' : '', index == tabs.length - 1 ? 'last' : '']">
          <a :href="tab.href" @click.prevent="selectTab(tab, index)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>

    <div class="tabs-details" :class="[mainClass, activeIndex == 0 ? 'first' : '', activeIndex == tabs.length - 1 ? 'last' : '']">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mainClass: {
      type: String,
      default: "",
      required: false
    },
    tabsClass: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      tabs: [],
      activeIndex: 0
    };
  },

  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab, selectedIndex) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
      this.activeIndex = selectedIndex;
    }
  }
};
</script>