<template>
  <div id="secondary">
      <nav class="navbar navbar-expand-lg py-5 bg-primary">
        <div class="d-flex align-items-center justify-content-between w-100">
            <ul class="list-unstyled align-items-center m-0 d-none d-md-flex">
                <li>
                    <a v-if="vendor.facebook" :href="vendor.facebook" class="social-button mr-1"><i class="fab fa-facebook-f"></i></a>
                </li>
                <li>
                    <a v-if="vendor.instagram" :href="vendor.instagram" class="social-button mx-2"><i class="fab fa-instagram"></i></a>
                </li>
                <li>
                    <a v-if="vendor.tripadvisor" :href="vendor.tripadvisor" class="social-button ml-1"><i class="fab fa-tripadvisor"></i></a>
                </li>
            </ul>
            <div class="store-logo mx-auto">
                <img v-if="vendor.reward_card_layout.logo" :src="vendor.reward_card_layout.logo.file" :alt="vendor.store_name" />
            </div>
            <a v-if="vendor.website" :href="vendor.website" target="_blank" class=" d-none d-md-flex">Voir le site web ></a>
        </div>
    </nav>

    <div class="w-100">
        <img src="@/assets/images/bg-default.jpg" class="object-fit" style="width: 100%; height: 300px;"
            :alt="vendor.store_name" />
    </div>

    <div class="container-fluid">
      <div class="row row-flowing">
        <div class="col-md-5 col-12 mb-3">
          <div class="card h-100 mr-3 text-normal">
            <div class="card-header">
              <div class="title w-100 text-center text-uppercase text-primary">Mon profil</div>
            </div>
            <div class="card-body">
              <ul class="profil-infos list-unstyled">
                <li>
                  <span>Nom et prénom</span>
                  <span class="font-weight-bold text-dark">{{ customer.first_name }} {{ customer.last_name }}</span>
                </li>
                <li>
                  <span>Numéro de téléphone</span>
                  <span class="font-weight-bold text-dark">{{ customer.phone }}</span>
                </li>
                <li>
                  <span>Date de naissance</span>
                  <span class="font-weight-bold text-dark">{{ customer.birthday }}</span>
                </li>
                <li>
                  <span>Email</span>
                  <span class="font-weight-bold text-dark">{{ customer.email }}</span>
                </li>
              </ul>
              <div class="card card-outline-primary py-2 mt-5">
                <span class="h3 text-primary font-weight-bold mb-1">{{ customer.points }}</span>
                point<span v-if="customer.points > 1">s</span>
                <span>
                  Prochaine récompense dans
                  <span class="text-primary">
                    {{ customer.next_gift }}
                    points
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7 col-12 mb-3">
          <div class="card h-100 ml-3">
            <div class="card-header">
              <div class="title text-primary w-100 text-center text-uppercase">Ma carte de fidélité</div>
            </div>
            <div class="card-body d-flex align-items-center justify-content-between">
              <div class="row w-100 mx-auto">
                <div class="col-xl-6 col-12 mb-3">
                  <div
                    class="reward-card mx-auto mr-2"
                    v-if="vendor.reward_card_layout"
                    :style="{backgroundColor: vendor.reward_card_layout.bg_color, color: vendor.reward_card_layout.text_color}"
                  >
                    <div class="reward-card-logo-center">
                      <div class="reward-card-logo-wrapper">
                        <img
                            v-if="vendor.reward_card_layout.logo"
                          :src="vendor.reward_card_layout.logo.file"
                          :alt="'Logo '+vendor.store_name"
                        />
                      </div>
                    </div>

                    <div class="reward-card-name">
                      <span class="text-uppercase h5 font-weight-bold pb-2">Carte de fidélité</span>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-12">
                  <div
                    class="reward-card mx-auto"
                    v-if="vendor.reward_card_layout"
                    :style="{ backgroundColor: vendor.reward_card_layout.bg_color, color: vendor.reward_card_layout.text_color }"
                  >
                    <div class="reward-card-logo">
                      <img
                      v-if="vendor.reward_card_layout.logo"
                        :src="vendor.reward_card_layout.logo.url"
                        :alt="'Logo '+vendor.store_name"
                      />
                    </div>
                    <div class="reward-card-header d-flex flex-column">
                      <span class="reward-card-title">Nom et prénom :</span>
                      <span class="reward-card-subtitle mb-2">{{ customer.first_name }} {{ customer.last_name }}</span>
                      <span class="reward-card-title">Numéro client :</span>
                      <span class="reward-card-subtitle">{{ customer.id }}</span>
                    </div>

                    <div class="reward-card-barcode">
                      <span class="barcode">{{ customer.id }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--
      <div class="row">
        <div class="col-md-8 col-12">
          <div class="card mb-3">
            <div class="card-header">
              <div
                class="title text-uppercase text-center w-100 text-primary"
              >Mes réductions et promotions</div>
            </div>
            <div class="card-body">
              <div class="row text-normal">
                {% for discount in discounts %}
                <div class="col-md-6 col-12 mb-3 overflow-hidden" style="max-height: 200px;">
                  <div class="card h-100">
                    <div
                      class="card-img-top h-100 overflow-hidden position-relative"
                      style="border-radius: 7px; border-bottom-left-radius: 7px; border-bottom-right-radius: 7px;"
                    >
                      <img src="{% static 'assets/img/bg01.jpg' %}" class="object-fit" alt />
                      <div class="overlay"></div>
                      <div class="discount-info px-2 py-1 d-flex flex-column align-items-start">
                        <div class="d-flex align-items-center w-100 justify-content-between">
                          <span class="h6 m-0 text-white font-weight-bold">{{ discount.name }}</span>
                          {% if discount.status_text == 'Actif' %}
                          <span
                            class="badge badge-success"
                          >{{ discount.status_text }}</span>
                          {% elif discount.status_text == 'Expiré'%}
                          <span
                            class="badge badge-danger"
                          >{{ discount.status_text }}</span>
                          {% else %}
                          <span
                            class="badge badge-warning"
                          >{{ discount.status_text }}</span>
                          {% endif %}
                        </div>
                        <div class="text-white text-left">{{ discount.description }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {% empty %}
                <div class="col text-center">
                  <p>Aucune réduction disponible pour le moment.</p>
                </div>
                {% endfor %}
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <div
                class="title text-uppercase text-primary text-center"
              >L'actualité de votre boutique</div>
            </div>
            <div class="card-body">
              <div class="row">
                {% for article in articles %}
                <div class="col-md-6 col-12 position-relative">
                  <a href="#" class="card card-news text-white position-relative">
                    <img src="{{ article.image.file.url }}" alt />
                    <div class="bottom-overlay"></div>
                    <div class="card-body flex-column mt-5 pt-5">
                      <div class="h5 m-0">{{ article.title }}</div>
                      <p class="mb-0">{{ article.description }}</p>
                    </div>
                  </a>
                </div>
                {% endfor %}
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12">
          <div class="card mb-3">
            <div class="card-header">
              <div
                class="title text-uppercase w-100 text-primary text-center"
              >Information de la boutique {{ vendor.store_name }}</div>
            </div>
            <div class="card-body text-normal">
              <div class="text-center mt-2 font-weight-bold">{{ vendor.store_adress }}</div>
              <div class="text-center mb-2 font-weight-bold">{{ vendor.store_phone }}</div>
              <div class="h6 font-weight-bold mt-4 text-center">Horaires d'ouverture</div>
              <table class="table table-bordered table-hours">
                <tbody>
                  <tr>
                    <td>Lundi</td>
                    <td>{{ vendor.opening_hours.monday }}</td>
                  </tr>
                  <tr>
                    <td>Mardi</td>
                    <td>{{ vendor.opening_hours.tuesday }}</td>
                  </tr>
                  <tr>
                    <td>Mercredi</td>
                    <td>{{ vendor.opening_hours.wednesday }}</td>
                  </tr>
                  <tr>
                    <td>Jeudi</td>
                    <td>{{ vendor.opening_hours.thursday }}</td>
                  </tr>
                  <tr>
                    <td>Vendredi</td>
                    <td>{{ vendor.opening_hours.friday }}</td>
                  </tr>
                  <tr>
                    <td>Samedi</td>
                    <td>{{ vendor.opening_hours.saturday }}</td>
                  </tr>
                  <tr>
                    <td>Dimanche</td>
                    <td>{{ vendor.opening_hours.sunday }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            {% if vendor.facebook %}
            <a
              href="{{ vendor.facebook }}"
              target="_blank"
              class="card card-facebook mb-3"
            >
              <div class="card-body d-flex justify-content-between align-items-center py-2">
                <div class="flex-column">
                  <div class="text-white-50">Suivez-nous</div>
                  <div class="font-weight-bold h5">Facebook</div>
                </div>
                <i class="fab fa-2x fa-facebook-f"></i>
              </div>
            </a>
            {% endif %}
            {% if vendor.instagram %}
            <a
              href="{{ vendor.instagram }}"
              target="_blank"
              class="card card-instagram mb-3"
            >
              <div class="card-body d-flex justify-content-between align-items-center py-2">
                <div class="flex-column">
                  <div class="text-white-50">Suivez-nous</div>
                  <div class="font-weight-bold h5">Instagram</div>
                </div>
                <i class="fab fa-2x fa-instagram"></i>
              </div>
            </a>
            {% endif %}
            {% if vendor.twitter %}
            <a
              href="{{ vendor.twitter }}"
              target="_blank"
              class="card card-twitter mb-3"
            >
              <div class="card-body d-flex justify-content-between align-items-center py-2">
                <div class="flex-column">
                  <div class="text-white-50">Suivez-nous</div>
                  <div class="font-weight-bold h5">Twitter</div>
                </div>
                <i class="fab fa-2x fa-twitter"></i>
              </div>
            </a>
            {% endif %}
            {% if vendor.youtube %}
            <a
              href="{{ vendor.youtube }}"
              target="_blank"
              class="card card-youtube mb-3"
            >
              <div class="card-body d-flex justify-content-between align-items-center py-2">
                <div class="flex-column">
                  <div class="text-white-50">Suivez-nous</div>
                  <div class="font-weight-bold h5">Youtube</div>
                </div>
                <i class="fab fa-2x fa-youtube"></i>
              </div>
            </a>
            {% endif %}
            {% if vendor.linkedin %}
            <a
              href="{{ vendor.linkedin }}"
              target="_blank"
              class="card card-linkedin mb-3"
            >
              <div class="card-body d-flex justify-content-between align-items-center py-2">
                <div class="flex-column">
                  <div class="text-white-50">Suivez-nous</div>
                  <div class="font-weight-bold h5">LinkedIn</div>
                </div>
                <i class="fab fa-2x fa-linkedin"></i>
              </div>
            </a>
            {% endif %}
            {% if vendor.pinterest %}
            <a
              href="{{ vendor.pinterest }}"
              target="_blank"
              class="card card-pinterest mb-3"
            >
              <div class="card-body d-flex justify-content-between align-items-center py-2">
                <div class="flex-column">
                  <div class="text-white-50">Suivez-nous</div>
                  <div class="font-weight-bold h5">Pinterest</div>
                </div>
                <i class="fab fa-2x fa-pinterest"></i>
              </div>
            </a>
            {% endif %}
            {% if vendor.snapchat %}
            <a
              href="{{ vendor.snapchat }}"
              target="_blank"
              class="card card-snapchat mb-3"
            >
              <div class="card-body d-flex justify-content-between align-items-center py-2">
                <div class="flex-column">
                  <div class="text-black-50">Suivez-nous</div>
                  <div class="font-weight-bold h5">Snapchat</div>
                </div>
                <i class="fab fa-2x fa-snapchat"></i>
              </div>
            </a>
            {% endif %}
            {% if vendor.tripadvisor %}
            <a
              href="{{ vendor.tripadvisor }}"
              target="_blank"
              class="card card-tripadvisor mb-3"
            >
              <div class="card-body d-flex justify-content-between align-items-center py-2">
                <div class="flex-column">
                  <div class="text-white-50">Suivez-nous</div>
                  <div class="font-weight-bold h5">Tripadvisor</div>
                </div>
                <i class="fab fa-2x fa-tripadvisor"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            customer: {},
            vendor: {},
            articles: {}
        }
    },
    created() {
        this.getCustomer();
    },
    methods: {
        getCustomer() {
            this.$http.get('/customers/dashboard/'+this.$route.params.token).then(resp => {
                this.customer = resp.data.customer;
                this.vendor = resp.data.vendor;
                this.articles = resp.data.articles;
            })
        }
    }
}
</script>