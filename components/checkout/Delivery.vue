<template>
<div>
    <ValidationObserver ref="form">
        <fieldset class="mb-4">
            <legend class="form-legend font-bold">Dirección de entrega</legend>
            <div class="grid grid-cols-12 gap-3 lg:gap-5">
                <div class="col-span-12 md:col-span-12">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                        <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-name">Nombre</label>
                        <input class="form-control w-full" @change="handleSendAddressData" v-model="username" type="text" placeholder="Jon Snow">
                        <error-message
                            :errors="errors[0]"
                        />
                    </ValidationProvider>
                </div>

            <div class="col-span-12">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-address">Dirección</label>
                    <input class="form-control w-full" @change="handleSendAddressData" v-model="direccion" type="text" placeholder="calle Winterfell 38, 3b">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>

            <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-city">Ciudad</label>
                    <input class="form-control w-full" @change="handleSendAddressData" v-model="ciudad" type="text" placeholder="Winterfell">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>

            <div class="col-span-12 md:col-span-6">
                <ValidationProvider rules="required" v-slot="{ errors }">
                    <label class="form-label mb-1.5 lg:mb-2" for="checkout-delivery-state">Provincia</label>
                    <input class="form-control w-full" @change="handleSendAddressData" v-model="provincia" type="text" placeholder="North land">
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
                    <input class="form-control w-full" @change="handleSendAddressData" v-model="postal" type="text" placeholder="19240">
                    <error-message
                        :errors="errors[0]"
                    />
                </ValidationProvider>
            </div>
            </div>
        </fieldset>
     </ValidationObserver>
</div>
</template>
<script>
import select from "~/plugins/select.js";
import { mapGetters } from 'vuex'
export default {
  props: {
        addressData: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            username: '',
            direccion: '',
            ciudad: '',
            provincia: '',
            postal: ''
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.user
        }
    },
    mounted() {
        select();
        if(Object.keys(this.addressData).length && this.currentUser !== null){
            this.username = this.$fire.auth.currentUser.displayName
            this.direccion = this.addressData.direccion
            this.ciudad = this.addressData.ciudad
            this.provincia = this.addressData.provincia
            this.postal = this.addressData.postal
        }
    },
    methods: {
        validateForm() {
            this.$refs.form.validate()
        },
        handleSendAddressData() {
            const sendData = {
                username: this.username,
                direccion: this.direccion,
                ciudad: this.ciudad,
                provincia: this.provincia,
                postal: this.postal,
                pais: 'ES'
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

