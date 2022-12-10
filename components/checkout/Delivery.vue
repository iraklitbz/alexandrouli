<template>
<div>
    <fieldset class="mb-4">
        <legend class="form-legend font-bold">Dirección de entrega</legend>

        <div class="grid grid-cols-12 gap-3 lg:gap-5">
            <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-name">Nombre</label>
                    <input class="form-control w-full" @change="handleSendAddressData" v-model="fullName" type="text" placeholder="Jon Snow">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>

         <div class="col-span-12 md:col-span-6">
            <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-company">Empresa (opcional)</label>
            <input class="form-control w-full" @change="handleSendAddressData" v-model="company" type="text" placeholder="The Night's Watch">
        </div>

        <div class="col-span-12">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-address">Dirección</label>
                <input class="form-control w-full" @change="handleSendAddressData" v-model="address" type="text" placeholder="calle Winterfell 38, 3b">
                <error-message
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

        <div class="col-span-12 md:col-span-6">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-city">Ciudad</label>
                <input class="form-control w-full" @change="handleSendAddressData" v-model="city" type="text" placeholder="Winterfell">
                <error-message
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

        <div class="col-span-12 md:col-span-6">
            <ValidationProvider rules="required" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-state">Provincia</label>
                <input class="form-control w-full" @change="handleSendAddressData" v-model="state" type="text" placeholder="North land">
                <error-message
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

        <div class="col-span-12 md:col-span-6">
            <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-country">Pais</label>

            <div class="select">
            <select class="select__input btn btn--subtle appearance-none" name="checkout-delivery-country" id="checkout-delivery-country" disabled>
                <option value="0">España</option>
            </select>

            <svg class="icon select__icon" aria-hidden="true" viewBox="0 0 16 16">
                <polyline points="1 5 8 12 15 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            </div>
        </div>

        <div class="col-span-12 md:col-span-6">
            <ValidationProvider rules="required|postcode" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-postcode">Código postal</label>
                <input class="form-control w-full" @change="handleSendAddressData" v-model="postcode" type="text" placeholder="19240">
                <error-message
                    :errors="errors[0]"
                />
            </ValidationProvider>
        </div>

       <div class="col-span-12">
            <ValidationProvider rules="phone" v-slot="{ errors }">
                <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-tel">Teléfono (opcional)</label>
                <input class="form-control w-full" @change="handleSendAddressData" v-model="phone" type="tel" placeholder="000 000 000">
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
        addressData: {
            type: Object,
            default: () => {}
        },
        loggedInUser: {
            type: Object,
            default: () => {}
        }
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
        select();
        if(this.addressData && this.loggedInUser.username){
            this.fullName = this.loggedInUser.username
            this.company = this.addressData.company
            this.address = this.addressData.direccion
            this.city = this.addressData.ciudad
            this.state = this.addressData.provincia
            this.postcode = this.addressData.postal
        }
    },
    methods: {
        handleSendAddressData() {
            const sendData = {
                fullName: this.fullName,
                company: this.company,
                address: this.address,
                city: this.city,
                state: this.state,
                postcode: this.postcode,
                phone: this.phone
            }
            this.$emit('update-send-data', sendData)
        }
    }
}
</script>
<style lang="scss">
    @import "~/assets/scss/forms.scss";
    @import "~/assets/scss/choice.scss";
</style>

