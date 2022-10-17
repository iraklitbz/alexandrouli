<template>
    <div class="checkout-v2__billing-info mt-5 lg:mt-8 js-billing-info">
        <div class="grid grid-cols-12 gap-3 lg:gap-5">

                <div class="col-span-12 md:col-span-6">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-name">Full Name</label>
                        <input class="form-control w-full" v-model="fullNamer" type="text" placeholder="Jon Snow">
                        <error-message
                            :errors="errors[0]"
                        />
                    </ValidationProvider>
                </div>


            <div class="col-span-12 md:col-span-6">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-company">Company (optional)</label>
                <input class="form-control w-full" v-model="company" type="text" placeholder="The Night's Watch">
            </div>

            <div class="col-span-12">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-address">Address</label>
                    <input class="form-control w-full" v-model="address" type="text" placeholder="calle Winterfell 38, 3b">
                    <error-message
                            :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>

            <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-city">City</label>
                    <input class="form-control w-full" v-model="city" type="text" placeholder="Winterfell">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>

            <div class="col-span-12 md:col-span-6">
            <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-state">State (optional)</label>
            <input class="form-control w-full" v-model="city" type="text" placeholder="North land">
            </div>

            <div class="col-span-12 md:col-span-6">
            <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-country">Country</label>

            <div class="select">
                <select class="select__input btn btn--subtle appearance-none" name="checkout-billing-country" id="checkout-billing-country" disabled>
                    <option value="0">Spain</option>
                </select>

                <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 16 16">
                <polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                </svg>
            </div>
            </div>

            <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required|postcode" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-billing-postcode">Postcode</label>
                    <input class="form-control w-full" v-model="postcode" type="text" placeholder="19240">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>
        </div>
    </div>
</template>
<script>
export default {
   computed: {
        fullNamer: {
            get() {
                return this.$store.state.checkout.billingname
            },
            set(value) {
                this.$store.commit('checkout/SET_BILLING_NAME', value)
            }
        },
        company: {
            get() {
                return this.$store.state.checkout.billingcompany
            },
            set(value) {
                this.$store.commit('checkout/SET_BILLING_COMPANY', value)
            }
        },
        address: {
            get() {
                return this.$store.state.checkout.billingaddress
            },
            set(value) {
                this.$store.commit('checkout/SET_BILLING_ADDRESS', value)
            }
        },
        city: {
            get() {
                return this.$store.state.checkout.billingcity
            },
            set(value) {
                this.$store.commit('checkout/SET_BILLING_CITY', value)
            }
        },
        state: {
            get() {
                return this.$store.state.checkout.billingstate
            },
            set(value) {
                this.$store.commit('checkout/SET_BILLING_STATE', value)
            }
        },
        postcode: {
            get() {
                return this.$store.state.checkout.billingpostcode
            },
            set(value) {
                this.$store.commit('checkout/SET_BILLING_POSTCODE', value)
            }
        },
    }
}
</script>
