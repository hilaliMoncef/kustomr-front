<template>
  <div class="d-flex" id="wrapper">
    <div id="sidebar-wrapper">
      <Sidebar />
    </div>
    <div id="page-content-wrapper">
      <div
        class="container-fluid animsition position-relative content py-md-4 px-md-3 py-3 px-2 mb-4"
      >
        <Header />
        <transition :name="transitionName" mode="out-in" @beforeLeave="beforeLeave" @enter="enter">
          <slot />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/layouts/Sidebar.vue";
import Header from "@/components/layouts/Header.vue";

export default {
  components: { Sidebar, Header },
  data() {
    return {
      transitionName: 'slide-right'
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";

      next();
    });
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    }
  }
};
</script>