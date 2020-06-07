<template>
  <div class="position-fixed header d-flex align-items-center mb-5">
    <nav class="flex-grow-1 navbar navbar-expand-lg p-0 d-none d-lg-flex">
      <div id="topNav" class="collapse navbar-collapse">
        <ul class="navbar-nav w-100 row d-flex">
          <div class="col-6">
            <li class="nav-item flex-grow-1">
              <div class="input-group search-bar">
                <div class="input-group-append">
                  <div class="input-group-text">
                    <font-awesome-icon icon="search" />
                  </div>
                </div>
                <input class="form-control" type="text" id="search-bar" placeholder="Rechercher.." />
                <div class="search-result" style="display: none;" id="search-result"></div>
              </div>
            </li>
          </div>

          <div class="col-6" v-if="$store.getters.isLoggedIn">
            <div class="d-flex align-items-start justify-content-end">
              <li class="nav-item nav-item-rounded dropdown mr-2">
                <a
                  class="nav-link"
                  href="#"
                  id="notifDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <font-awesome-icon icon="bell" />
                </a>
              </li>
              <li class="nav-item nav-item-rounded dropdown">
                <dropdown class="nav-link">
                  <template v-slot:button>
                    <font-awesome-icon icon="user" />
                  </template>
                  <template v-slot:links>
                    <ul class="list-unstyled">
                      <li>
                        {{ currentUser.first_name }} {{ currentUser.last_name }}
                      </li>
                      <li>
                        <router-link class="dropdown-item" to="/reglages">
                          <font-awesome-icon icon="cog" class="mr-2" />Réglages
                        </router-link>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" @click.prevent="logout">
                          <font-awesome-icon icon="power-off" class="mr-2" />Déconnexion
                        </a>
                      </li>
                    </ul>
                  </template>
                </dropdown>
              </li>
            </div>
          </div>
          <li class="nav-item" v-else>
            <router-link class="nav-link d-flex align-items-center" to="/login">Connexion</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$toasted.global.success({message: 'Vous êtes désormais déconnecté.'})
      });
    }
  }
};
</script>