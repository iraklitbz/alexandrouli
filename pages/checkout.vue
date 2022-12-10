<template>
    <section class="checkout mx-auto max-w-7xl">
        <div class="text-component margin-bottom-lg">
            <h1>Checkout</h1>
            <client-only>
                <p v-if="!isAuthenticated" class="text-base">Already have an account? <nuxt-link to="/usuario/login">Login</nuxt-link></p>
            </client-only>
        </div>
        <form>
            <div class="grid grid-cols-12 gap-5 lg:gap-8">
                <div class="col-span-12 xl:col-span-7">
                    <!-- contact info -->
                    <client-only>
                        <contact-info
                            v-if="!isAuthenticated"
                            :method="handleValidator"
                        />
                    </client-only>

                    <!-- delivery address -->
                    <delivery 
                        v-if="Object.keys(addressData).length === 0 || Object.keys(addressData).length !== 0 && isEditiong"
                        :addressData="addressData"
                        :loggedInUser="loggedInUser"
                        @update-send-data="handleUpdateSendData"
                    />
                    <div v-if="Object.keys(addressData).length !== 0 && !isEditiong" class="address-module mb-5">
                        <div class="bg-floor rounded-md p-6 border-l-[3px] border-solid border-primary shadow-[0_0_0_1px_hsla(var(--color-contrast-higher)/0.05),0_0_0_1px_hsla(var(--color-contrast-higher)/0.02),0_1px_3px_-1px_hsla(var(--color-contrast-higher)/0.2)]">
                            <div class="flex items-center justify-between mb-3">                                   
                                <h5 class="font-semibold text-contrast-higher">Dirección de entrega</h5>
                                <button @click="handleEditar" class="btn  text-sm bg-warning bg-opacity-75 hover:bg-opacity-100">Editar</button>
                            </div>
                            <div class="text-[0.9375rem] leading-snug text-contrast-medium">
                                <ul>
                                    <li>{{loggedInUser.username}}</li>
                                    <li>{{addressData.direccion}}</li>
                                    <li>{{addressData.ciudad}}</li>
                                    <li>{{addressData.provincia}}</li>
                                    <li>{{addressData.postal}}</li>
                                    <li>{{addressData.pais}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- delivery options -->
                    <div class="checkout__billing-checkbox mb-10">
                        <div>
                            <input
                                class="checkbox js-billing-checkbox"
                                type="checkbox"
                                id="autofill-billing-info"
                                :checked="billingAddressIsSame"
                                @change="handleBillingAddress"
                            >
                            <label for="autofill-billing-info">Factura en la misma direccion</label>
                        </div>
                    </div>
                    <!-- billing address -->
                    <bill-address
                        v-if="!billingAddressIsSame"
                        class="mt-10"
                    />
                </div>

                <div class="col-span-12 xl:col-span-5">
                    <!-- order summary -->
                        <order-summary />
                        <button @click="handleBuy" class="mt-5 btn btn--primary btn--md width-100% display@lg">Comprar</button>
                </div>
            </div>
            
        </form>
    </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import BillAddress from '../components/checkout/BillAddress.vue';
import OrderSummary from '../components/checkout/OrderSummary.vue';
export default {
    components: { OrderSummary, BillAddress },
    name: 'CheckoutPage',
    data() {
        return {
            addressData: {},
            addressID: null,
            isEditiong: false,
            billingAddressIsSame: true
        }
    },
    computed: {
        ...mapState({
                steps: state => state.steps.steps
        }),
        ...mapGetters(["isAuthenticated", "loggedInUser"])
    },
    mounted () {
        this.handleGetAdress()
    },
    methods: {
        handleBillingAddress() {
            this.billingAddressIsSame = !this.billingAddressIsSame
        },
        handleValidator() {
            this.$refs.form.validate().then((valid) => {
                if (valid) {
                    const userCheckoutData = [ { email: this.email, currentlaststep: this.step } ]
                    localStorage.setItem('userCheckoutData', JSON.stringify(userCheckoutData))
                    this.$store.commit('steps/SET_NEXT_STEPS', this.step )
                }
            })
        },
        async handleGetAdress() {
            await this.$axios.get("/api/addresses?filters[userID][$eq]=" + String(this.loggedInUser.id)).then((response) => {
             if(response) {
               if(response.data.data && response.data.data[0].attributes) {
                this.addressID = response.data.data[0].id
                this.addressData = response.data.data[0].attributes
               }
              }
            }).catch((error) => {
              console.log(error)
            })
        },
        handleEditar() {
            this.isEditiong = true
        },
        handleUpdateSendData(data) {
            this.addressData = data
        },
        handleBuy(e) {
            e.preventDefault();
            console.log(this.addressData)
        }
    }
}
</script>

<style scoped>
   .checkout {
  position: relative;
  z-index: 1;
}

.checkout__billing-checkbox {
  display: none;
}

@media (min-width: 80rem) {
  .checkout .order-summary {
    position: -webkit-sticky;
    position: sticky;
    @apply top-3 lg:top-5;
    max-height: calc(100vh - 1.125rem);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.checkout__billing-checkbox {
  display: block;
}
</style>
