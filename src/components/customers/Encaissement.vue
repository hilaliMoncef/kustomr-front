<template>
    <div class="form-dark">
        <div class="form-group">
            <label for="amount" class="text-uppercase">Montant du panier</label>
            <input type="number" class="form-control" min="0" v-model="transaction.amount" />
        </div>
        <div class="d-flex align-items-center justify-content-between mt-4">
            <label class="text-uppercase">Points cumulés</label>
            <span class="text-primary">{{ transaction.amount }} point<span v-if="transaction.amount > 1">s</span></span>
        </div>
        <div class="mt-5">
            <label class="text-uppercase">{{ customer.first_name }} {{ customer.last_name }} a-t-il utilisé un code promo ?</label>
            <div class="d-flex align-items-center">
                <div class="custom-checkbox flex-grow-1">
                    <font-awesome-icon icon="check-circle" class="text-success" /> Oui
                </div>
                <div class="custom-checkbox flex-grow-1">
                    <font-awesome-icon icon="times-circle" class="text-danger" /> Non
                </div>
            </div>
        </div>
        <div class="text-center">
            <button type="button" class="btn btn-primary btn-rounded text-uppercase mt-4">
                Encaisser
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        customer: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            transaction: {
                amount: 0
            }
        }
    },
    methods: {}
}
</script>