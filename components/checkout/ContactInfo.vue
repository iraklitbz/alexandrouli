<template>
    <div>
        <fieldset class="mb-5 lg:mb-8">
            <legend class="form-legend font-bold mb-1.5 lg:mb-2">Contact Information</legend>

            <div class="mb-5 lg:mb-8">
            <p class="text-sm lg:text-base">Already have an account? <a href="#0">Login</a>.</p>
            </div>

            <div>
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-email">Email</label>
                <ValidationObserver ref="form">
                    <ValidationProvider rules="required|email" v-slot="{ errors }">
                    <input class="form-control w-full" v-model="email" type="text" placeholder="email@email.com">
                    <error-message
                        :errors="errors[0]"
                    />
                    </ValidationProvider>
                </ValidationObserver>
            </div>



        </fieldset>
        <div class="fixed bottom-0 left-0 w-full py-6 bg-contrast-lower bg-opacity-20">
            <div class="w-full flex gap-4 mx-auto max-w-xl">
                <a
                    @click="validateEmail()"
                    class="btn btn--primary w-full pointer"
                >
                    Continue to Delivery &rarr;
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        step: {
            type: Number,
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
    mounted() {
        if(localStorage.getItem('userCheckoutData')) {
            const userCheckoutData = JSON.parse(localStorage.getItem('userCheckoutData'));
            const userEmail = userCheckoutData.map((item) => item.email )
            this.email = userEmail.shift()
        }
    },
    methods: {
        validateEmail() {
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
