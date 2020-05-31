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

            <!--
                    {% if user.is_vendor %}
                    <div class="d-flex flex-column">
                        <strong class="">{{ user }}</strong>
                        <small>{{ user.vendor.store_name }}</small>
                    </div>
                    {% elif user.is_staff %}
                    <div class="d-flex flex-column">
                        <strong class="">{{ user }}</strong>
                        <small>Administrateur</small>
                    </div>
                    {% elif user.is_customer %}
                    <div class="d-flex flex-column">
                        <strong class="">{{ user }}</strong>
                        <small>Client</small>
                    </div>
                    {% endif %}
            -->
          </a>
          <div class="collapse submenu" id="submenu-myuser" v-if="currentUser.is_vendor">
            <router-link class="dropdown-item" to="/reglages">
              <i class="fas fa-cog mr-2"></i>Réglages
            </router-link>
            <router-link class="dropdown-item" to="/logout">
              <i class="fas fa-power-off mr-2"></i>Déconnexion
            </router-link>
          </div>
          <div class="collapse submenu" id="submenu-myuser" v-else-if="currentUser.is_staff">
            <router-link class="dropdown-item" to="/django-admin">
              <i class="fas fa-user mr-2"></i>Administration
              Django
            </router-link>
            <router-link class="dropdown-item" to="/logout">
              <i class="fas fa-power-off mr-2"></i>Déconnexion
            </router-link>
          </div>
        </li>
        <div v-if="currentUser.is_vendor">
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/">
              <i class="fas fa-home"></i> Accueil
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/clients">
              <i class="fas fa-users"></i> Clients
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/reductions">
              <i class="fas fa-divide"></i> Réductions
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/communication">
              <i class="fas fa-bullhorn"></i> Communication
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/statistiques">
              <i class="fas fa-chart-bar"></i> Statistiques
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/formations">
              <i class="fas fa-book"></i> Formations
            </router-link>
          </li>
        </div>

        <!-- ADMINISTRATION LINKS-->
        <div v-if="currentUser.is_staff">
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/">
              <i class="fas fa-home"></i> Accueil
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/vendors">
              <i class="fas fa-briefcase"></i> Commerçants
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/">
              <i class="fas fa-share-alt"></i> Réseaux sociaux
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/">
              <i class="fas fa-broadcast-tower"></i> Marketing
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link animsition-link" to="/">
              <i class="fas fa-book"></i> Formations
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link animsition-link d-flex align-items-center justify-content-between"
              to="/"
            >
              <span>
                <i class="fas fa-envelope"></i> Messages
              </span>
              <span class="badge badge-light mr-1">0</span>
            </router-link>
          </li>
        </div>
      </ul>
    </div>
    <div class="sidebar-buttons-bottom">
      <div class="d-flex align-items-center justify-content-around w-100">
        <div v-if="currentUser && currentUser.is_vendor">
          <router-link
            to="/reglages"
            class="text-white animsition-link py-2 text-uppercase"
          >Réglages</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentUser: {
                is_vendor: true,
                is_staff: false
            }
        }
  }
}
</script>