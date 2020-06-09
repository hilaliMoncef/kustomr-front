<template>
    <div class="form-dark">
        <div class="form-group">
            <label for="transaction">Quelle transaction voulez-vous rembourser ?</label>
            <v-select :options="transactions" v-model="toRefund" :get-option-label="getLabel">
                <template v-slot:option="option">
                    <strong>+ {{ option.amount_discounted }} €</strong> - {{ option.date | moment('DD/MM/YYYY HH:mm') }}
                </template>
            </v-select>
        </div>
        <div class="form-row">
            <div class="col text-center">
                <button type="button" class="btn btn-primary btn-rounded" @click.prevent="refund">Rembourser cette transaction</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        customer: {
            type: Object,
            required: true
        },
        vendor: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            toRefund: null,
            transactions: []
        }
    },
    created() {
        this.getTransactions();
    },
    methods: {
        getTransactions() {
            this.$http.get('/customers/'+this.customer.id+'/transactions').then(resp => {
                this.transactions = resp.data.filter(transaction => !transaction.refunded);
            }).catch(() => {
                this.$toasted.global.error({message: 'Impossible de récupérer les transactions.'})
            })
        },
        getLabel(val) {
            if(val) {
                const date = new Date(val.date)
                return '+ '+val.amount_discounted+' € - '+ date.toLocaleString()
            } else {
                return 'Sélectionner une transaction'
            }
        },
        refund() {
            if(!this.toRefund) {
                this.$toasted.global.error({message: 'Veuillez sélectionner une transaction à rembourser.'})
            } else {
                this.$http.get('customers/transactions/'+ this.toRefund.id +'/refund').then(resp => {
                    this.$toasted.global.success({message: 'Votre client a bien été remboursé.'})
                    this.$emit('transactionSaved', resp.data);
                }).catch(() => {
                    this.$toasted.global.error({message: 'Impossible d\'enregistrer le remboursement.'})
                })
            }
        }
    }
}
</script>