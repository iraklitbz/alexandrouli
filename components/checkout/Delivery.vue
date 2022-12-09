<template>
<div>
    <fieldset class="mb-4">
        <legend class="form-legend font-bold">Delivery Address</legend>

        <div class="grid grid-cols-12 gap-3 lg:gap-5">
            <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-name">Full Name</label>
                    <input class="form-control w-full" v-model="fullName" type="text" placeholder="Jon Snow">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>

         <div class="col-span-12 md:col-span-6">
            <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-company">Company (optional)</label>
            <input class="form-control w-full" v-model="company" type="text" placeholder="The Night's Watch">
        </div>

        <div class="col-span-12">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-address">Address</label>
                <input class="form-control w-full" v-model="address" type="text" placeholder="calle Winterfell 38, 3b">
                <error-message
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

        <div class="col-span-12 md:col-span-6">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-city">City</label>
                <input class="form-control w-full" v-model="city" type="text" placeholder="Winterfell">
                <error-message
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

        <div class="col-span-12 md:col-span-6">
            <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-state">State (optional)</label>
            <input class="form-control w-full" v-model="state" type="text" placeholder="North land">
        </div>

        <div class="col-span-12 md:col-span-6">
            <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-country">Country</label>

            <div class="select">
            <select class="select__input btn btn--subtle appearance-none" name="checkout-delivery-country" id="checkout-delivery-country" disabled>
                <option value="0">Spain</option>
            </select>

            <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 16 16">
                <polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            </div>
        </div>

        <div class="col-span-12 md:col-span-6">
            <ValidationProvider rules="required|postcode" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-postcode">Postcode</label>
                <input class="form-control w-full" v-model="postcode" type="text" placeholder="19240">
                <error-message
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

       <div class="col-span-12">
            <ValidationProvider rules="phone" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-tel">Phone number (optional)</label>
                <input class="form-control w-full" v-model="phone" type="tel" placeholder="000 000 000">
                <error-message
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>
        </div>
    </fieldset>
</div>
</template>
<script>
import select from "~/plugins/select.js";
export default {
  props: {
    props: {
        addressData: {
            type: Object,
            default: () => {}
        }
    },
    },
    data () {
        return {
            fullName: '',
            company: '',
            address: '',
            city: '',
            state: '',
            postcode: '',
            phone: ''
        }
    },
    mounted() {
        console.log(this.addressData)
        select();
        if(this.addressData){
            this.fullName = this.addressData.fullName
            this.company = this.addressData.company
            this.address = this.addressData.address
            this.city = this.addressData.city
            this.state = this.addressData.state
            this.postcode = this.addressData.postcode
        }
    },
    methods: {
        handleChangeDelivery(value) {
            this.isSelectedDevlivery = []
            this.isSelectedDevlivery.push(value)
            this.slectDilivery = !this.slectDilivery
            this.$store.commit('checkout/SET_DELIVERY', value)
        }
    }
}
</script>
<style lang="scss">
    @import "~/assets/scss/forms.scss";
    @import "~/assets/scss/choice.scss";
</style>

