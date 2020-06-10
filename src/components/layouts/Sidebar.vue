<template>
  <div class="inner-wrapper position-relative">
    <div class="py-4">
      <div class="sidebar-logo">
        <img src="@/assets/images/logo.png" alt="Kustomr" />
      </div>
      <ul class="navbar-nav flex-column">
        <li class="nav-item dropdown d-lg-none">
          <a
            class="nav-link d-flex align-items-center"
            data-toggle="collapse"
            aria-expanded="false"
            data-target="#submenu-myuser"
            aria-controls="submenu-myuser"
            href="#submenu-myuser"
          >
            <img
              src="@/assets/images/users/placeholder.png"
              alt
              class="user-avatar-md rounded-circle mr-2"
            />
          </a>
          <div class="collapse submenu" id="submenu-myuser">
            <router-link class="dropdown-item" to="/reglages">
              <font-awesome-icon icon="cog" class="mr-2" />Réglages
            </router-link>
            <router-link class="dropdown-item" to="/logout">
              <font-awesome-icon icon="power-off" class="mr-2" />Déconnexion
            </router-link>
          </div>
        </li>
        <div>
          <li :class="[currentRoute == '/' ? 'active' : '', 'nav-item']">
            <div class="before"></div>
            <router-link class="nav-link" to="/" exact>
              <font-awesome-icon icon="home" /> Accueil
            </router-link>
            <div class="after"></div>
          </li>
          <li :class="[currentRoute.includes('clients') ? 'active' : '', 'nav-item']">
            <div class="before"></div>
            <router-link class="nav-link" to="/clients">
              <font-awesome-icon icon="users" /> Clients
            </router-link>
            <div class="after"></div>
          </li>

          <li :class="[currentRoute.includes('discounts') ? 'active' : '', 'nav-item']">
            <div class="before"></div>
            <router-link class="nav-link" to="/discounts">
              <font-awesome-icon icon="divide" /> Réductions
            </router-link>
            <div class="after"></div>
          </li>
          <li :class="[currentRoute.includes('communication') ? 'active' : '', 'nav-item']">
            <div class="before"></div>
            <router-link class="nav-link" to="/communication">
              <font-awesome-icon icon="bullhorn" /> Communication
            </router-link>
            <div class="after"></div>
          </li>
          <li :class="[currentRoute.includes('statistiques') ? 'active' : '', 'nav-item']">
            <div class="before"></div>
            <router-link class="nav-link" to="/statistiques">
              <font-awesome-icon icon="chart-bar" /> Statistiques
            </router-link>
            <div class="after"></div>
          </li>
          <li :class="[currentRoute.includes('trainings') ? 'active' : '', 'nav-item']">
            <div class="before"></div>
            <router-link class="nav-link" to="/trainings">
              <font-awesome-icon icon="book" /> Formations
            </router-link>
            <div class="after"></div>
          </li>
        </div>
      </ul>
    </div>
    <div class="sidebar-buttons-bottom">
      <div class="d-flex align-items-center justify-content-around w-100 mb-2">
        <div>
          <router-link
            to="/reglages"
            class="text-white  text-uppercase"
          >Réglages</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
}
</script>