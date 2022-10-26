<template>
  <div>
    <Header />
    <section class="checkout-v2 relative z-1 py-12 lg:py-20">
        <div class="w-[calc(100%_-_2.5rem)] lg:w-[calc(100%_-_4rem)] mx-auto max-w-xl">
            <div class="mb-8 lg:mb-12">
            <h1 class="text-center">Checkout</h1>
            </div>

            <div class="mb-8 lg:mb-12">
                <Steps />
            </div>

            <form>
                <div v-for="(item, index) in steps" :key="index">
                    <component
                        v-if="item.current"
                        :is="item.component"
                        :steps="steps"
                        :step="item.step"
                        :current="item.current"
                        :completed="item.completed"
                    >
                    </component>
                </div>
            </form>
        </div>
        </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'CheckoutPage',
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
                'loggedInUser': state => state.auth.loggedInUser,
                steps: state => state.steps.steps
        })
    },
    mounted() {
        if(localStorage.getItem('userCheckoutData')) {
            const userCheckoutData = JSON.parse(localStorage.getItem('userCheckoutData'));
            const currentlaststep = userCheckoutData.map((item) => item.currentlaststep )
            const userEmail = userCheckoutData.map((item) => item.email )
            const name = userCheckoutData.map((item) => item.name )
            const company = userCheckoutData.map((item) => item.company)
            const address = userCheckoutData.map((item) => item.address)
            const city = userCheckoutData.map((item) => item.city)
            const state = userCheckoutData.map((item) => item.state)
            const postcode = userCheckoutData.map((item) => item.postcode)
            const phone = userCheckoutData.map((item) => item.phone)
            const delivery = userCheckoutData.map((item) => item.delivery)
            const currentStep = Number(currentlaststep.shift())
            if(currentStep === 0){
                this.$store.commit('checkout/SET_EMAIL', userEmail.shift())
                this.$store.commit('checkout/SET_NAME', name.shift())
                this.$store.commit('checkout/SET_COMPANY', company.shift())
                this.$store.commit('checkout/SET_ADDRESS', address.shift())
                this.$store.commit('checkout/SET_CITY', city.shift())
                this.$store.commit('checkout/SET_STATE', state.shift())
                this.$store.commit('checkout/SET_POSTCODE', postcode.shift())
                this.$store.commit('checkout/SET_PHONE', phone.shift())
                this.$store.commit('checkout/SET_DELIVERY', delivery.shift())
                this.$store.commit('steps/SET_NEXT_STEPS', currentStep)
            }
            if(currentStep === 1){
                this.$store.commit('checkout/SET_NAME', name.shift())
                this.$store.commit('checkout/SET_COMPANY', company.shift())
                this.$store.commit('checkout/SET_ADDRESS', address.shift())
                this.$store.commit('checkout/SET_CITY', city.shift())
                this.$store.commit('checkout/SET_STATE', state.shift())
                this.$store.commit('checkout/SET_POSTCODE', postcode.shift())
                this.$store.commit('checkout/SET_PHONE', phone.shift())
                this.$store.commit('checkout/SET_DELIVERY', delivery.shift())
                this.$store.commit('steps/SET_NEXT_STEPS', currentStep)
            }
        }
    },
}
</script>

<style scoped>
    .checkout-v2__billing-checkbox {
    display: none;
    }

    .checkout-v2__billing-checkbox {
    display: block;
    }
</style>
