<template>
    <div>
        <div style="height: 300px; position: relative;">
            <youtube :video-id="instance.link" width="100%" height="100%" ref="youtube"></youtube>
        </div>
        <div class="mt-3 text-dark">
            <p>{{ instance.description }}</p>
        </div>
        <div class="row mb-0">
            <div class="col text-center">
                <button class="btn btn-primary btn-rounded mt-3" @click.prevent="close">J'ai compris</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        instance: {
            type: Object,
            required: true
        }
    },
    computed: {
        player() {
            return this.$refs.youtube.player
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>