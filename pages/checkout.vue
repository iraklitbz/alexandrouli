<template>
    <section class="checkout mx-auto max-w-7xl">
        <div class="container max-width-adaptive-lg">
            <div class="text-component margin-bottom-lg">
            <h1>Checkout</h1>
            <p v-if="!isAuthenticated" class="text-base">Already have an account? <nuxt-link to="/usuario/login">Login</nuxt-link></p>
            </div>
                <form>
                    <div class="grid grid-cols-12 gap-5 lg:gap-8">
                        <div class="col-span-12 xl:col-span-7">
                        <!-- contact info -->
                        <contact-info
                            v-if="!isAuthenticated"
                            :method="handleValidator"
                        />

                        <!-- delivery address -->
                        <delivery 
                            v-if="Object.keys(addressData).length === 0 || isEditiong"
                            :addressData="addressData"
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
                                    :checked="billAddressSame"
                                    @change="$store.commit('checkout/SET_BILLING_ADDRESS_SAME')"
                                >
                                <label for="autofill-billing-info">Same as delivery address</label>
                            </div>
                        </div>
                        <!-- billing address -->
                        <bill-address
                            v-if="!billAddressSame"
                            class="mt-10"
                        />
                

                        <button class="btn btn--primary btn--md width-100% display@lg">Place Order</button>
                        </div>

                    <div class="col-span-12 xl:col-span-5">
                        <!-- order summary -->
                            <order-summary />
                        </div>
                    </div>

                    <button @click="handleValidator" class="mt-10 btn btn--primary btn--lg width-100% hide@lg margin-top-md ">Place Order</button>
                </form>
        </div>
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
        }
    },
    computed: {
        ...mapState({
                steps: state => state.steps.steps
        }),
        ...mapGetters(["isAuthenticated", "loggedInUser"]),
        billAddressSame: {
            get() {
                return this.$store.state.checkout.billAddressSame
            }
        }
    },
    async mounted () {
        this.handleGetAdress()
        var billingCheckBox = document.getElementsByClassName('js-billing-checkbox');
        if(billingCheckBox.length > 0) {
            var billingInfo = document.getElementsByClassName('js-billing-info');
            if(billingInfo.length == 0) return;
            resetBillingInfo(billingCheckBox[0], billingInfo[0]);

            billingCheckBox[0].addEventListener('change', function(){
            resetBillingInfo(billingCheckBox[0], billingInfo[0]);
            });
        }

        function resetBillingInfo(input, content) {
            Util.toggleClass(content, 'hidden', input.checked);
        };
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
