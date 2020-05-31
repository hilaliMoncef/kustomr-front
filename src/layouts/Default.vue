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

        <Slot />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/layouts/Sidebar.vue";
import Header from "@/components/layouts/Header.vue";

export default {
  components: { Sidebar, Header }
};
</script>