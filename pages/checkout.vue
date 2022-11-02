<template>
  <div class="pt-28">
    <Header />
    <section class="checkout mx-auto max-w-7xl">
        <div class="container max-width-adaptive-lg">
            <div class="text-component margin-bottom-lg">
            <h1>Checkout</h1>
            <p class="text-base">Already have an account? <a href="#0">Login</a></p>
            </div>

                <form>
                    <div class="grid grid-cols-12 gap-5 lg:gap-8">
                        <div class="col-span-12 xl:col-span-7">
                        <!-- contact info -->
                        <contact-info
                            :method="handleValidator"
                        />

                        <!-- delivery address -->
                        <delivery />

                        <!-- delivery options -->


                        <div class="checkout__billing-checkbox">
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
                        <!-- payment method -->
                        <payment class="mt-10" />

                        <button class="btn btn--primary btn--md width-100% display@lg">Place Order</button>
                        </div>

                       <div class="col-span-12 xl:col-span-5">
                        <!-- order summary -->
                            <order-summary />
                        </div>
                    </div>

                    <button @click="handleValidator" class="btn btn--primary btn--lg width-100% hide@lg margin-top-md ">Place Order</button>
                </form>
        </div>
        </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import BillAddress from '../components/checkout/BillAddress.vue';
import OrderSummary from '../components/checkout/OrderSummary.vue';
export default {
  components: { OrderSummary, BillAddress },
    name: 'CheckoutPage',
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
                'loggedInUser': state => state.auth.loggedInUser,
                steps: state => state.steps.steps
        }),
        billAddressSame: {
            get() {
                return this.$store.state.checkout.billAddressSame
            }
        }
    },
    mounted () {
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
