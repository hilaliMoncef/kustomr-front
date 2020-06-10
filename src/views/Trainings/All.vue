<template>
    <div>
        <modal class="h-100" width="60%" height="auto" name="detailTraining" :adaptative="true">
            <div class="p-4 px-5">
                <h5 class="text-dark text-center text-uppercase mb-4">{{ trainingDetail.name }}</h5>
                <Training @close="$modal.hide('detailTraining')" :instance="trainingDetail" />
            </div>
        </modal>

        <div class="row mt-4">
            <div class="col-12 col-md-4 col-lg-3 d-flex flex-column align-items-center" @click.prevent="trainingDetail = training; $modal.show('detailTraining');" v-for="(training, index) in trainings" :key="index">
                <div class="card-discount">
                    <img :src="training.poster.file" alt="Discount" />
                    <div class="overlay"></div>
                </div>
                <span>{{ training.name }}</span>
            </div>
            <div class="col" v-if="trainings.length == 0">
                <p>Aucune formation disponible.</p>
            </div>
        </div>
    </div>
</template>

<script>
import Training from "@/components/trainings/Training.vue"

export default {
    components: { Training },
    data() {
        return {
            trainings: [],
            trainingDetail: {}
        }
    },
    created() {
        this.getTrainings();
    },
    methods: {
        getTrainings() {
            let loader = this.$loading.show();
            this.$http.get('/trainings').then(resp => {
                this.trainings = resp.data;
            }).catch(() => {
                this.$toasted.global.error({message: 'Impossible de récupérer la liste des formations.'});
            }).finally(() => {
                loader.hide();
            })
        }
    }
}
</script>