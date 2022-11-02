<template>
     <ValidationObserver ref="form">
        <fieldset class="margin-bottom-lg">
            <legend class="form-legend font-bold">Contact Information</legend>

            <label class="form-label margin-bottom-xxs" for="checkEmail">Email</label>
            <ValidationProvider rules="required|email" v-slot="{ errors }">
                <input class="form-control w-full" v-model="email" type="text" placeholder="email@email.com">
                <error-message
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </fieldset>
    </ValidationObserver>
</template>

<script>
export default {
    props: {
        step: {
            type: Number,
            default: null
        },
        method: {
            type: Function,
            default: null
        }
    },
    computed: {
        email: {
            get() {
                return this.$store.state.checkout.email
            },
            set(value) {
                this.$store.commit('checkout/SET_EMAIL', value)
            }
        }
    },
    methods: {
        handleValidator() {
            this.$refs.form.validate().then((valid) => {
                if (valid) {
                    const userCheckoutData = [ { email: this.email, currentlaststep: this.step } ]
                    localStorage.setItem('userCheckoutData', JSON.stringify(userCheckoutData))
                    this.$store.commit('steps/SET_NEXT_STEPS', this.step )
                }
            })
        }
    }
}
</script>
<style>
    @import "~/assets/scss/_chip.scss";
</style>
