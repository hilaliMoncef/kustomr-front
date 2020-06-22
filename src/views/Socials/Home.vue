<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="text-divider">
          <div class="bar mr-3"></div>Campagne
          <div class="bar ml-3"></div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="text-divider">
          <div class="bar mr-3"></div>Social
          <div class="bar ml-3"></div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12 col-md-6 col-xl-3 mb-3 mb-xl-0">
        <router-link to="/communication/mail" class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-center mb-3">
              <img src="@/assets/images/mails.svg" alt="Kustomr Mails" />
              <span class="text-dark font-weight-bold ml-3">MAILS</span>
            </div>
            <p class="text-dark small">Utilisez l’outil Kustomr Mails pour créer et programmer votre emailing à votre clientèle fidèle.</p>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-md-6 col-xl-3 mb-3 mb-xl-0">
        <router-link to="/communication/sms" class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-center mb-3">
              <img src="@/assets/images/sms.svg" alt="Kustomr SMS" />
              <span class="text-dark font-weight-bold ml-3">SMS</span>
            </div>
            <p class="text-dark small">Utilisez l’outil Kustomr SMS pour créer vos campagnes SMS à votre clientèle fidèle.</p>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-md-6 col-xl-3 mb-3 mb-lg-0">
        <router-link to="/communication/facebook" class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-center mb-3">
              <img src="@/assets/images/facebook.svg" alt="Kustomr Facebook" />
              <span class="text-dark font-weight-bold ml-3">FACEBOOK</span>
            </div>
            <p class="text-dark small">Planifiez votre contenu Facebook depuis l’outil de planification Kustomr Social. La réussite sur les réseaux est accessibles à tous ! Il suffit de s’organiser pour proposer un contenu cohérent à votre clientèle fidèle.</p>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-center mb-3">
              <img src="@/assets/images/instagram.svg" alt="Kustomr Instagram" />
              <span class="text-dark font-weight-bold ml-3">INSTAGRAM</span>
            </div>
            <p class="text-dark small">Planifiez votre contenu Instagram depuis l’outil de planification Kustomr Social. La réussite sur les réseaux est accessibles à tous ! Il suffit de s’organiser pour proposer un contenu cohérent à votre clientèle fidèle.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>