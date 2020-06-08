<template>
  <div class="form-dark">
    <div class="form-row">
      <div class="col-6">
        <div class="form-group">
          <label for="name" class="text-uppercase">Nom de la promotion</label>
          <input type="text" class="form-control" v-model="discount.name" />
        </div>

        <div class="form-group">
          <label for="min_points" class="text-uppercase">Minimum de points nécessaires</label>
          <input type="number" class="form-control" v-model="discount.min_points" />
        </div>

        <div class="form-group">
          <label for="code" class="text-uppercase">Code promo</label>
          <input type="text" class="form-control" v-model="discount.code" />
        </div>

        <div class="form-group">
          <label for="description" class="text-uppercase">Description</label>
          <textarea class="form-control" rows="4" v-model="discount.description"></textarea>
        </div>

        <div>
          <label for="media" class="text-uppercase">Média</label>
          <dropzone
            id="dropImage"
            ref="dropImage"
            @vdropzone-error="uploadError"
            @vdropzone-success="uploadComplete"
            :options="dropOptions"
          ></dropzone>
        </div>
      </div>
      <div class="col-6"></div>
    </div>
    <div class="row mt-4">
        <div class="col text-center">
            <button type="button" class="btn btn-primary btn-rounded">Programmer ma réduction</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discount: {
        name: ""
      },
      dropOptions: {
        url: "/uploads/residencies/",
        method: "post",
        maxFiles: 1,
        headers: {
          Authorization: ""
        }
      }
    };
  },
  created() {
    // Setting the defaults for dropzone
    this.dropOptions.url = this.$http.defaults.baseURL + this.dropOptions.url;
    this.dropOptions.headers[
      "Authorization"
    ] = this.$http.defaults.headers.common["Authorization"];
  },
  methods: {
    uploadComplete(file, resp) {
      this.discount.image = resp.id;
    },
    uploadError() {
      this.$toasted.global.error({
        message: "Impossible d'uploader cette image"
      });
    }
  }
};
</script>